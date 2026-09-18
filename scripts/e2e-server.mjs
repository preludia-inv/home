import { spawnSync, spawn } from "node:child_process";
const [mode, port] = process.argv.slice(2);
const output = `.e2e-dist-${mode}`;
const server = `.e2e-ssr-${mode}`;
// Synthetic fixture only, isolated from the production dist. Tests intercept WhatsApp.
const env = {
  ...process.env,
  VITE_BASE_PATH: mode === "pages" ? "/home/" : "/",
  VITE_WHATSAPP_NUMBER: mode === "pages" ? "573001234567" : "",
  VITE_PREMIUM_PORTAL_URL: "",
};
function run(args) {
  const result = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run(["node_modules/vite/bin/vite.js", "build", "--outDir", output]);
run([
  "node_modules/vite/bin/vite.js",
  "build",
  "--ssr",
  "src/prerender.tsx",
  "--outDir",
  server,
]);
run(["scripts/prerender.mjs", output, server]);
const child = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    port,
    "--strictPort",
    "--outDir",
    output,
  ],
  { env, stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    child.kill();
    process.exit();
  });
