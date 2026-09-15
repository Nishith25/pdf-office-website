import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsPage,
} from "../lib/cms/core/types";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

import {
  buildCmsPublicMetadata,
} from "../lib/cms/public/metadata";

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
        "",

      description:
        "",

      keywords:
        [],

      canonicalUrl:
        "",

      ogTitle:
        "",

      ogDescription:
        "",

      ogImage:
        "",

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
  "CMS public metadata",
  () => {
    it(
      "falls back to global SEO when page SEO is blank",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.globalSeo.title =
          "Global Title";

        settings.globalSeo.description =
          "Global description";

        settings.globalSeo.keywords = [
          "global",
          "website",
        ];

        const result =
          buildCmsPublicMetadata(
            page(),
            settings,
          );

        expect(
          result.title,
        ).toBe(
          "Global Title",
        );

        expect(
          result.description,
        ).toBe(
          "Global description",
        );

        expect(
          result.keywords,
        ).toEqual([
          "global",
          "website",
        ]);
      },
    );

    it(
      "uses page SEO values when supplied",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.globalSeo.title =
          "Global Title";

        const currentPage =
          page();

        currentPage.seo.title =
          "About SEO";

        currentPage.seo.description =
          "About description";

        currentPage.seo.keywords = [
          "about",
        ];

        const result =
          buildCmsPublicMetadata(
            currentPage,
            settings,
          );

        expect(
          result.title,
        ).toBe(
          "About SEO",
        );

        expect(
          result.description,
        ).toBe(
          "About description",
        );

        expect(
          result.keywords,
        ).toEqual([
          "about",
        ]);
      },
    );

    it(
      "combines no-index protection safely",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.globalSeo.noIndex =
          true;

        expect(
          buildCmsPublicMetadata(
            page(),
            settings,
          ).noIndex,
        ).toBe(true);

        settings.globalSeo.noIndex =
          false;

        const currentPage =
          page();

        currentPage.seo.noIndex =
          true;

        expect(
          buildCmsPublicMetadata(
            currentPage,
            settings,
          ).noIndex,
        ).toBe(true);
      },
    );

    it(
      "falls back independently for canonical and Open Graph fields",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.globalSeo.canonicalUrl =
          "https://example.com";

        settings.globalSeo.ogTitle =
          "Global OG";

        settings.globalSeo.ogImage =
          "https://example.com/og.jpg";

        const currentPage =
          page();

        currentPage.seo.ogTitle =
          "About OG";

        const result =
          buildCmsPublicMetadata(
            currentPage,
            settings,
          );

        expect(
          result.canonicalUrl,
        ).toBe(
          "https://example.com",
        );

        expect(
          result.ogTitle,
        ).toBe(
          "About OG",
        );

        expect(
          result.ogImage,
        ).toBe(
          "https://example.com/og.jpg",
        );
      },
    );
  },
);