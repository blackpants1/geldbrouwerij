import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

test.describe("De Brouwketel wizard", () => {
  test("fills 5 steps and shows result with score", async ({ page }) => {
    await page.goto("/brouwketel");

    // Stap 1 — inkomen
    await expect(page.getByText(/Stap 1 van 5/i)).toBeVisible();
    const inkomen = page.getByLabel(/Netto huishoudinkomen per maand/i);
    await inkomen.fill("4500");
    await page.getByRole("button", { name: /volgende/i }).click();

    // Stap 2
    await expect(page.getByText(/Stap 2 van 5/i)).toBeVisible();
    await page.getByLabel(/Totaal vaste lasten per maand/i).fill("2200");
    await page.getByRole("button", { name: /volgende/i }).click();

    // Stap 3
    await page.getByLabel(/Leefkosten per maand/i).fill("1500");
    await page.getByRole("button", { name: /volgende/i }).click();

    // Stap 4
    await page.getByLabel(/Huidig spaargeld \(totaal\)/i).fill("3000");
    await page.getByLabel(/Automatisch sparen per maand/i).fill("150");
    await page.getByLabel(/Schulden \(excl\. hypotheek\)/i).fill("0");
    await page.getByRole("button", { name: /volgende/i }).click();

    // Stap 5 — email
    await expect(page.getByText(/Stap 5 van 5/i)).toBeVisible();
    await page.getByLabel(/Voornaam/i).fill("Sanne");
    await page
      .getByLabel(/E-mail/i, { exact: false })
      .first()
      .fill("sanne+test@example.com");

    const submit = page.getByRole("button", { name: /toon mijn brouw-score/i });
    await expect(submit).toBeVisible();
    await submit.click();

    // Resultaat pagina
    await expect(
      page.getByRole("heading", { level: 1, name: /proost/i }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByRole("heading", { name: /drie dingen die ik je meegeef/i }),
    ).toBeVisible();

    // Lead geschreven naar app/.data/leads.json (Next dev cwd)
    const leadsPath = path.join(process.cwd(), ".data", "leads.json");
    const raw = await fs.readFile(leadsPath, "utf8");
    const leads = JSON.parse(raw);
    const ours = leads.find(
      (l: { email: string }) => l.email === "sanne+test@example.com",
    );
    expect(ours).toBeTruthy();
    expect(ours.source).toBe("brouwketel");
  });
});
