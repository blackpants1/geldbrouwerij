import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/bedankt", "/api/"],
      },
    ],
    sitemap: "https://geldbrouwerij.nl/sitemap.xml",
    host: "https://geldbrouwerij.nl",
  };
}
