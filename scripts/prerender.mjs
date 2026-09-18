import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const [output = "dist", server = ".prerender"] = process.argv.slice(2);
const { render } = await import(
  pathToFileURL(resolve(server, "prerender.js")).href
);
const file = resolve(output, "index.html");
const html = await readFile(file, "utf8");
if (!html.includes("<!--prerender-->"))
  throw new Error("Missing prerender placeholder");
await writeFile(file, html.replace("<!--prerender-->", render()));
console.log(`Prerendered Spanish landing in ${output}/index.html.`);
