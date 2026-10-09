// Static server for the `out/` export. Mimics Firebase Hosting with
// trailingSlash: true (redirects /docs -> /docs/, serves 404.html).
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, sep } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT) || 4173;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

function send(res, status, file) {
  res.writeHead(status, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}

if (!existsSync(root)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    const path = normalize(decodeURIComponent(url.pathname));
    const file = join(root, path);
    if (!file.startsWith(root)) return res.writeHead(400).end();

    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        return res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
      }
      const index = join(file, "index.html");
      if (existsSync(index)) return send(res, 200, index);
    } else if (existsSync(file)) {
      return send(res, 200, file);
    } else if (!path.endsWith(sep) && existsSync(`${file}.html`)) {
      return send(res, 200, `${file}.html`);
    }
    const notFound = join(root, "404.html");
    return existsSync(notFound) ? send(res, 404, notFound) : res.writeHead(404).end("Not found");
  })
  .listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
