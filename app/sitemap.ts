import type {
  MetadataRoute,
} from "next";

import {
  listCmsPages,
} from "../lib/repositories/cms-pages";

import {
  getSiteConfig,
} from "../lib/site/config";

export const dynamic =
  "force-dynamic";

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const site =
    getSiteConfig();

  const baseUrl =
    site.siteUrl.replace(
      /\/+$/,
      "",
    );

  const pages =
    await listCmsPages();

  return pages
    .filter(
      (
        page,
      ) =>
        page.status ===
          "published" &&
        !page.seo.noIndex,
    )
    .map(
      (
        page,
      ) => ({
        url:
          page.isHomepage
            ? baseUrl
            : `${baseUrl}/${page.slug}`,

        lastModified:
          page.updatedAt,

        changeFrequency:
          "weekly" as const,

        priority:
          page.isHomepage
            ? 1
            : 0.7,
      }),
    );
}
