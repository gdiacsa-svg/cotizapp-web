import type { MetadataRoute } from "next";

const SITE_URL = "https://cotizapp.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/planes", "/tutorial"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
