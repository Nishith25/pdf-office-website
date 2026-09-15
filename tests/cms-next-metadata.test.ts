import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

import type {
  CmsPage,
} from "../lib/cms/core/types";

import {
  buildNextCmsMetadata,
} from "../lib/cms/public/next-metadata";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
  );

function page(): CmsPage {
  return {
    title:
      "About Us",

    slug:
      "about-us",

    status:
      "published",

    isHomepage:
      false,

    seo: {
      title:
        "About Example",

      description:
        "Learn about Example.",

      keywords: [
        "about",
        "example",
      ],

      canonicalUrl:
        "https://example.com/about-us",

      ogTitle:
        "About Example OG",

      ogDescription:
        "Example social description.",

      ogImage:
        "https://example.com/og.jpg",

      noIndex:
        false,
    },

    createdAt:
      NOW,

    updatedAt:
      NOW,

    publishedAt:
      NOW,
  };
}

describe(
  "Next CMS metadata",
  () => {
    it(
      "maps CMS SEO into Next metadata without a legacy title template",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.identity.siteName =
          "Example Website";

        settings.identity.shortName =
          "Example";

        settings.identity.faviconUrl =
          "https://example.com/favicon.png";

        const metadata =
          buildNextCmsMetadata(
            page(),
            settings,
          );

        expect(
          metadata.title,
        ).toEqual({
          absolute:
            "About Example",
        });

        expect(
          metadata.description,
        ).toBe(
          "Learn about Example.",
        );

        expect(
          metadata.keywords,
        ).toEqual([
          "about",
          "example",
        ]);

        expect(
          metadata.alternates,
        ).toEqual({
          canonical:
            "https://example.com/about-us",
        });

        expect(
          metadata.icons,
        ).toEqual({
          icon:
            "https://example.com/favicon.png",
        });
      },
    );

    it(
      "maps Open Graph and Twitter metadata",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.identity.siteName =
          "Example Website";

        settings.identity.shortName =
          "Example";

        const metadata =
          buildNextCmsMetadata(
            page(),
            settings,
          );

        expect(
          metadata.openGraph,
        ).toMatchObject({
          type:
            "website",

          title:
            "About Example OG",

          description:
            "Example social description.",

          siteName:
            "Example",
        });

        expect(
          metadata.twitter,
        ).toMatchObject({
          card:
            "summary_large_image",

          title:
            "About Example OG",

          description:
            "Example social description.",
        });
      },
    );

    it(
      "maps no-index protection",
      () => {
        const settings =
          createDefaultCmsSettings();

        const currentPage =
          page();

        currentPage.seo.noIndex =
          true;

        const metadata =
          buildNextCmsMetadata(
            currentPage,
            settings,
          );

        expect(
          metadata.robots,
        ).toEqual({
          index:
            false,

          follow:
            true,
        });
      },
    );

    it(
      "omits empty optional metadata fields safely",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.identity.faviconUrl =
          "";

        const currentPage =
          page();

        currentPage.seo.canonicalUrl =
          "";

        currentPage.seo.ogImage =
          "";

        settings.globalSeo.canonicalUrl =
          "";

        settings.globalSeo.ogImage =
          "";

        const metadata =
          buildNextCmsMetadata(
            currentPage,
            settings,
          );

        expect(
          metadata.alternates,
        ).toBeUndefined();

        expect(
          metadata.icons,
        ).toBeUndefined();

        expect(
          metadata.openGraph,
        ).not.toHaveProperty(
          "images",
        );
      },
    );
  },
);