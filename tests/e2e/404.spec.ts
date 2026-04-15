import { test, expect } from "@playwright/test";

test("404 page shows brand copy 'dit vat is leeg'", async ({ page }) => {
  const resp = await page.goto("/bestaat-helemaal-niet-1234");
  expect(resp?.status()).toBe(404);
  await expect(page.getByText(/oeps, dit vat is leeg/i)).toBeVisible();
  const main = page.locator("main");
  await expect(main.getByRole("link", { name: /terug naar de homepage/i })).toBeVisible();
  await expect(main.getByRole("link", { name: /start de brouwketel/i })).toBeVisible();
});
