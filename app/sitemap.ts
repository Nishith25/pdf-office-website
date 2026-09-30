import type {
  MetadataRoute,
} from "next";

import {
  listPublishedCmsBlogPosts,
} from "../lib/repositories/cms-blog";

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

  const [
    pages,
    posts,
  ] =
    await Promise.all([
      listCmsPages(),

      listPublishedCmsBlogPosts(),
    ]);

  const pageEntries =
    pages
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

  const blogEntries:
    MetadataRoute.Sitemap =
      posts
        .filter(
          (
            post,
          ) =>
            !post.seo
              .noIndex,
        )
        .map(
          (
            post,
          ) => ({
            url:
              `${baseUrl}/blog/${post.slug}`,

            lastModified:
              post.updatedAt,

            changeFrequency:
              "monthly" as const,

            priority:
              0.65,
          }),
        );

  return [
    ...pageEntries,

    {
      url:
        `${baseUrl}/blog`,

      lastModified:
        new Date(),

      changeFrequency:
        "weekly",

      priority:
        0.75,
    },

    ...blogEntries,
  ];
}
