import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

async function resetData() {
  const dir = path.join(process.cwd(), ".data");
  for (const f of [
    "users.json",
    "posts.json",
    "comments.json",
    "brouwketel-records.json",
    "cursus-progress.json",
  ]) {
    await fs.rm(path.join(dir, f), { force: true });
  }
}

test.describe.configure({ mode: "serial" });

test.describe("Platform / account flow", () => {
  test.beforeAll(async () => {
    await resetData();
  });

  test("aanmelden → dashboard → tapkamer post → logout", async ({ page }) => {
    await page.goto("/aanmelden");
    await page.getByLabel(/Voornaam/i).fill("Sanne");
    await page.locator("#auth-email").fill(`sanne+pl${Date.now()}@example.com`);
    await page.getByRole("button", { name: /Maak mijn Brouwmaatje-account/i }).click();

    // dev-modus toont directe link
    const dev = page.getByRole("link", { name: /direct openen/i });
    await expect(dev).toBeVisible({ timeout: 10_000 });
    await dev.click();

    // Dashboard
    await expect(page).toHaveURL(/\/platform$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Proost, Sanne/ }),
    ).toBeVisible();

    // Nav naar Tapkamer
    await page.getByRole("link", { name: /De Tapkamer/i }).first().click();
    await expect(page).toHaveURL(/\/platform\/tapkamer/);

    // Post plaatsen
    await page.getByPlaceholder(/Titel — kort/i).fill("Mijn eerste Proost-moment");
    await page.getByPlaceholder(/Schrijf je verhaal/i).fill(
      "Vandaag mijn eerste automatische overboeking ingesteld. €50 per maand naar Brouwen. Klein begin, groot gevoel.",
    );
    await page.getByRole("button", { name: /Plaats/i }).click();
    // Revalidate kan even duren in dev — reload forceert fresh read
    await page.waitForTimeout(500);
    await page.reload();
    await expect(page.getByRole("link", { name: /Mijn eerste Proost-moment/i })).toBeVisible({
      timeout: 10_000,
    });

    // Logout
    await page.getByRole("button", { name: /Uitloggen/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/");

    // /platform is nu beschermd
    await page.goto("/platform");
    await expect(page).toHaveURL(/\/inloggen/);
  });

  test("brouwketel submit (ingelogd) komt terug in dashboard-historie", async ({ page, request }) => {
    await page.goto("/aanmelden");
    await page.getByLabel(/Voornaam/i).fill("Mark");
    await page.locator("#auth-email").fill("mark+pltest@example.nl");
    await page.getByRole("button", { name: /Maak mijn Brouwmaatje-account/i }).click();
    await page.getByRole("link", { name: /direct openen/i }).click();
    await expect(page).toHaveURL(/\/platform$/);

    // Vul Brouwketel in
    await page.goto("/brouwketel");
    await page.getByLabel(/Netto huishoudinkomen per maand/i).fill("5200");
    await page.getByRole("button", { name: /volgende/i }).click();
    await page.getByLabel(/Totaal vaste lasten per maand/i).fill("2100");
    await page.getByRole("button", { name: /volgende/i }).click();
    await page.getByLabel(/Leefkosten per maand/i).fill("1600");
    await page.getByRole("button", { name: /volgende/i }).click();
    await page.getByLabel(/Huidig spaargeld/i).fill("8000");
    await page.getByLabel(/Automatisch sparen per maand/i).fill("300");
    await page.getByLabel(/Schulden/i).fill("0");
    await page.getByRole("button", { name: /volgende/i }).click();
    await page.getByLabel(/Voornaam/i).fill("Mark");
    await page
      .getByLabel(/E-mail/i, { exact: false })
      .first()
      .fill("mark+pltest@example.nl");
    await page.getByRole("button", { name: /toon mijn brouw-score/i }).click();

    await expect(page.getByRole("heading", { level: 1, name: /proost/i })).toBeVisible({
      timeout: 15_000,
    });

    // Back to dashboard — historie moet er staan
    await page.goto("/platform");
    await expect(page.getByText(/Je historie/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/\/ 100/).first()).toBeVisible();
  });

  test("/platform redirects to /inloggen wanneer niet ingelogd", async ({ page }) => {
    await page.goto("/platform");
    await expect(page).toHaveURL(/\/inloggen/);
  });
});
