import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title and hero CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Geldbrouwerij/);
    await expect(
      page.getByRole("heading", { level: 1, name: /brouw aan je financiële vrijheid/i }),
    ).toBeVisible();
  });

  test("primary hero CTA leads to /brouwketel", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /gooi je cijfers in de brouwketel/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/brouwketel/);
  });

  test("all nav links resolve 200", async ({ page }) => {
    await page.goto("/");
    const links = ["/brouwproces", "/diensten", "/brouwketel", "/tap", "/over"];
    for (const link of links) {
      const res = await page.request.get(link);
      expect(res.status(), `${link} returned ${res.status()}`).toBeLessThan(400);
    }
  });

  test("stats strip is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("1 op 5", { exact: true })).toBeVisible();
    await expect(page.getByText(/pensioengat/i)).toBeVisible();
  });

  test("no horizontal scroll on 360px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    const horizontal = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(horizontal, "horizontal overflow in px").toBeLessThanOrEqual(1);
  });
});
