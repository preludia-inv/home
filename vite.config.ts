import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_PATH || "/";
  if (!/^\/(?:[\w.-]+\/)*$/.test(base))
    throw new Error("VITE_BASE_PATH must be / or a path such as /home/.");
  const site = new URL(
    env.VITE_SITE_URL || "https://preludia-inv.github.io/home/",
  );
  if (site.protocol !== "https:" || site.search || site.hash)
    throw new Error(
      "VITE_SITE_URL must be a public HTTPS URL without query or hash.",
    );
  if (!site.pathname.endsWith("/")) site.pathname += "/";
  return {
    base,
    plugins: [
      react(),
      {
        name: "preludia-metadata",
        transformIndexHtml(html) {
          return html.replaceAll("__SITE_URL__", site.href);
        },
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: `User-agent: *\nAllow: /\nSitemap: ${site.href}sitemap.xml\n`,
          });
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.href}</loc></url></urlset>`,
          });
        },
      },
    ],
    build: { target: "es2022", sourcemap: false },
  };
});
