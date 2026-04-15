import type { MetadataRoute } from "next";
import { posts } from "./tap/page";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://geldbrouwerij.nl";
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number; change: "weekly" | "monthly" }> = [
    { path: "/", priority: 1.0, change: "weekly" },
    { path: "/brouwproces", priority: 0.9, change: "monthly" },
    { path: "/diensten", priority: 0.9, change: "monthly" },
    { path: "/brouwketel", priority: 1.0, change: "weekly" },
    { path: "/brouwavond", priority: 0.8, change: "monthly" },
    { path: "/over", priority: 0.6, change: "monthly" },
    { path: "/tap", priority: 0.7, change: "weekly" },
    { path: "/privacy", priority: 0.3, change: "monthly" },
    { path: "/voorwaarden", priority: 0.3, change: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.change,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      url: `${base}/tap/${p.slug}`,
      lastModified: new Date(p.datum),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
