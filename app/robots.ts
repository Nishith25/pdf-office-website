import type {
  MetadataRoute,
} from "next";

import {
  getSiteConfig,
} from "../lib/site/config";

export default function robots():
  MetadataRoute.Robots {
  const site =
    getSiteConfig();

  const baseUrl =
    site.siteUrl.replace(
      /\/+$/,
      "",
    );

  return {
    rules: [
      {
        userAgent:
          "*",

        allow:
          "/",

        disallow: [
          "/admin/",
          "/api/",
        ],
      },
    ],

    sitemap:
      `${baseUrl}/sitemap.xml`,
  };
}
