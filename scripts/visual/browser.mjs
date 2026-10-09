// Shared Playwright helpers: open a design artboard or a built route at a width.
import { chromium } from "playwright";
import { BASE_URL, designUrl } from "./pages.mjs";

export async function launch() {
  return chromium.launch();
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => img.addEventListener("load", r, { once: true }))
      )
    );
  });
  await page.waitForTimeout(250);
}

export async function openDesign(browser, file, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(designUrl(file), { waitUntil: "networkidle" });
  await settle(page);
  return page;
}

export async function openBuild(browser, route, width, { openMenu = false } = {}) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  // Load every lazy image before a full-page capture.
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await settle(page);
  if (openMenu) {
    await page.getByRole("button", { name: /menu/i }).first().click();
    await page.waitForTimeout(400);
  }
  return page;
}
