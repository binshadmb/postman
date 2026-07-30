const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const files = ["index.html", "styles.css", "client.js", "favicon.svg"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

fs.writeFileSync(
  path.join(dist, "favicon.ico"),
  fs.readFileSync(path.join(root, "favicon.svg"))
);

console.log(`Static site built in ${dist}`);
