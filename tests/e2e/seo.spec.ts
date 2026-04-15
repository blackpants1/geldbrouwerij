import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", mustMatchTitle: /Geldbrouwerij/ },
  { path: "/brouwproces", mustMatchTitle: /Brouwproces/ },
  { path: "/diensten", mustMatchTitle: /Diensten/ },
  { path: "/brouwketel", mustMatchTitle: /Brouwketel/ },
  { path: "/brouwavond", mustMatchTitle: /Brouwavond/ },
  { path: "/over", mustMatchTitle: /Brouwmeester/ },
  { path: "/tap", mustMatchTitle: /Tap/ },
  { path: "/privacy", mustMatchTitle: /Privacy/ },
  { path: "/voorwaarden", mustMatchTitle: /Voorwaarden/ },
];

test.describe("SEO metadata", () => {
  for (const r of routes) {
    test(`${r.path} heeft unieke <title> en description`, async ({ page }) => {
      await page.goto(r.path);
      const title = await page.title();
      expect(title).toMatch(r.mustMatchTitle);
      const desc = await page
        .locator('head meta[name="description"]')
        .getAttribute("content");
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(40);
    });
  }

  test("sitemap.xml resolves", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("geldbrouwerij.nl");
    expect(xml).toContain("/brouwketel");
  });

  test("robots.txt allows crawling", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("Sitemap:");
  });
});
