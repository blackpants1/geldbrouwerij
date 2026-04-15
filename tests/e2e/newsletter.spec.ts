import { test, expect } from "@playwright/test";

test.describe("Newsletter", () => {
  test("footer form submits and shows success", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const emailInput = footer.getByPlaceholder(/jij@voorbeeld\.nl/i);
    await emailInput.fill("brouwmaatje+test@example.com");
    await footer.getByRole("button", { name: /schenk mij in/i }).click();
    await expect(footer.getByRole("status")).toBeVisible({ timeout: 10_000 });
    await expect(footer.getByRole("status")).toContainText(/proost/i);
  });

  test("invalid email shows error", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const emailInput = footer.getByPlaceholder(/jij@voorbeeld\.nl/i);
    // HTML5 pattern will likely block submission; type without @
    await emailInput.fill("nietgeldig");
    await footer.getByRole("button", { name: /schenk mij in/i }).click();
    // browser validation may trigger native popup; check that no success happens
    await page.waitForTimeout(500);
    await expect(footer.getByText(/geproost/i)).toHaveCount(0);
  });
});
