const fs = require("fs");
const path = require("path");

const root = __dirname;

const files = {
  "/": "index.html",
  "/index.html": "index.html",
  "/styles.css": "styles.css",
  "/client.js": "client.js",
  "/favicon.svg": "favicon.svg",
  "/favicon.ico": "favicon.svg",
  "/favicon.png": "favicon.svg"
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

module.exports = function handler(req, res) {
  const cleanUrl = (req.url || "/").split("?")[0];
  const fileName = files[cleanUrl] || "index.html";
  const filePath = path.join(root, fileName);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    res.setHeader("Content-Type", types[path.extname(fileName)] || "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", fileName === "index.html" ? "no-cache" : "public, max-age=86400");
    res.statusCode = 200;
    res.end(data);
  });
};
