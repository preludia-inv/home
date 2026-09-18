import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

test("without JavaScript the brief cannot leak through native form submission", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByLabel("Nombres protagonistas")).toBeDisabled();
  await expect(
    page.getByRole("button", {
      name: "Preparar solicitud por WhatsApp",
      exact: true,
    }),
  ).toBeDisabled();
  await expect(page.locator(".no-script-note")).toBeVisible();
  await context.close();
});

async function fillBrief(page: Page) {
  await page.getByLabel("Tipo de evento").selectOption("Bodas");
  await page.getByLabel("Nombres protagonistas").fill("Laura & Andrés");
  await page.getByLabel("Fecha del evento", { exact: true }).fill("2099-10-18");
  await page.getByLabel("¿Cómo te contactamos?").fill("laura@example.com");
  await page
    .getByLabel("Cuéntanos cómo imaginas tu invitación")
    .fill("Una celebración campestre, oliva y beige, con muchas fotos.");
}

test("static HTML, metadata and assets work at the configured base path", async ({
  page,
  request,
  baseURL,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await request.get(baseURL!);
  const html = await response.text();
  expect(html).toContain("Todo gran momento");
  expect(html).toContain("<main");
  const prefix = info.project.name === "root" ? "/" : "/home/";
  expect(html).toContain(`src="${prefix}assets/`);
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Todo gran momento",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "es-CO");
  await page.evaluate(() => document.fonts.ready);
  const assets = await page
    .locator("img")
    .evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).src),
    );
  for (const asset of new Set(assets))
    expect((await request.get(asset)).status()).toBe(200);
  for (const file of [
    "favicon.svg",
    "social-card.png",
    "robots.txt",
    "sitemap.xml",
  ])
    expect(
      (
        await request.get(
          new URL(file, baseURL + (baseURL!.endsWith("/") ? "" : "/")).href,
        )
      ).status(),
    ).toBe(200);
  expect(errors).toEqual([]);
});

test("no horizontal overflow, readable form and responsive navigation", async ({
  page,
}, info) => {
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  if ((page.viewportSize()?.width ?? 1440) <= 650) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "Planes", exact: true })
      .click();
    await expect(
      page.getByRole("navigation", { name: "Navegación móvil" }),
    ).toHaveCount(0);
    await expect(page).toHaveURL(/#planes$/);
  }
  await page.getByRole("link", { name: "Elegir Premium", exact: true }).click();
  await expect(page.getByLabel("Tu plan")).toHaveValue("Premium");
  await expect(page).toHaveURL(/#solicitud$/);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.goto("./");
  if (["pages-390", "pages-1440"].includes(info.project.name))
    await page.screenshot({
      path: `test-results/${info.project.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
});

test("complete portfolio demos, accessible dialog focus and grouped plan details", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "15 años", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /^Ver concepto de/ }),
  ).toHaveCount(1);
  const trigger = page.getByRole("button", {
    name: "Ver concepto de 15 años",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("184");
  await expect(page.getByRole("dialog")).toContainText("Itinerario");
  await expect(page.getByRole("dialog")).toContainText("CÓDIGO DE VESTUARIO");
  await expect(page.getByRole("dialog")).toContainText("¿Nos acompañas?");
  await expect(page.getByRole("dialog")).toContainText("No envía respuestas");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page
    .getByText("Ver todo lo que incluye", { exact: true })
    .first()
    .click();
  await expect(
    page.getByText(/RSVP con “Asistiré” y “No podré asistir”/),
  ).toBeVisible();
  await page
    .getByText("¿Qué es una ronda de ajustes?", { exact: true })
    .click();
  await expect(
    page.getByText(/no son solo 2 o 3 cambios individuales/),
  ).toBeVisible();
});

test("validates brief and prepares WhatsApp without claiming delivery", async ({
  page,
}, info) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      (window as unknown as { openedUrl: string }).openedUrl = String(url);
      return null;
    };
  });
  await page.goto("./");
  await page
    .getByRole("button", {
      name: "Preparar solicitud por WhatsApp",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await fillBrief(page);
  await page.getByLabel("Fecha del evento", { exact: true }).fill("2020-01-01");
  await page
    .getByRole("button", {
      name: "Preparar solicitud por WhatsApp",
      exact: true,
    })
    .click();
  await expect(page.getByRole("alert")).toContainText("fecha futura");
  await page.getByLabel("Fecha del evento", { exact: true }).fill("2099-10-18");
  await page.getByLabel("Tu plan").selectOption("Premium");
  await page
    .getByRole("button", {
      name: "Preparar solicitud por WhatsApp",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Tu solicitud", exact: true }),
  ).toHaveValue(/Nombres: Laura & Andrés/);
  const url = new URL(
    await page.evaluate(
      () => (window as unknown as { openedUrl: string }).openedUrl,
    ),
  );
  expect(url.host).toBe("wa.me");
  expect(url.pathname).toBe(
    info.project.name === "root" ? "/573136071110" : "/573001234567",
  );
  expect(url.searchParams.get("text")).toContain("Plan: Premium");
  expect(url.searchParams.get("text")).toContain("Fecha: 18/10/2099");
  expect(url.searchParams.get("text")).toContain("oliva y beige");
  await expect(
    page.getByRole("link", { name: "Abrir WhatsApp" }),
  ).toHaveAttribute("href", url.href);
  await expect(page.getByRole("dialog")).toContainText("pulsa enviar allí");
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("Nombres protagonistas")).toHaveValue(
    "Laura & Andrés",
  );
});

test("future portal and privacy are honest and keyboard accessible", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Acceso anfitriones" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "disponible próximamente",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Privacidad", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "no almacena tu solicitud",
  );
  await page.getByRole("button", { name: "Cerrar ventana" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Privacidad", exact: true }),
  ).toBeFocused();
});
