import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsPage,
} from "../lib/cms/core/types";

import {
  createCmsPageDraft,
  duplicateCmsPageDraft,
  publishCmsPage,
  unpublishCmsPage,
} from "../lib/cms/core/page-lifecycle";

const NOW =
  new Date(
    "2026-09-15T09:00:00.000Z",
  );

const EARLIER =
  new Date(
    "2026-09-14T09:00:00.000Z",
  );

function seo() {
  return {
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
  };
}

describe(
  "CMS page lifecycle",
  () => {
    it(
      "creates a new page as a normalized draft",
      () => {
        const page =
          createCmsPageDraft(
            {
              title:
                "About Our Team",

              slug:
                " About Our Team! ",
            },

            NOW,
          );

        expect(
          page.title,
        ).toBe(
          "About Our Team",
        );

        expect(
          page.slug,
        ).toBe(
          "about-our-team",
        );

        expect(
          page.status,
        ).toBe(
          "draft",
        );

        expect(
          page.isHomepage,
        ).toBe(false);

        expect(
          page.publishedAt,
        ).toBeNull();

        expect(
          page.createdAt,
        ).toEqual(
          NOW,
        );

        expect(
          page.updatedAt,
        ).toEqual(
          NOW,
        );
      },
    );

    it(
      "generates the slug from title when slug is empty",
      () => {
        const page =
          createCmsPageDraft(
            {
              title:
                "Contact & Support",

              slug:
                "",
            },

            NOW,
          );

        expect(
          page.slug,
        ).toBe(
          "contact-support",
        );
      },
    );

    it(
      "publishes a draft page",
      () => {
        const draft =
          createCmsPageDraft(
            {
              title:
                "Features",

              slug:
                "features",
            },

            EARLIER,
          );

        const published =
          publishCmsPage(
            draft,
            NOW,
          );

        expect(
          published.status,
        ).toBe(
          "published",
        );

        expect(
          published.publishedAt,
        ).toEqual(
          NOW,
        );

        expect(
          published.updatedAt,
        ).toEqual(
          NOW,
        );

        expect(
          draft.status,
        ).toBe(
          "draft",
        );
      },
    );

    it(
      "unpublishes a page without mutating the source",
      () => {
        const source: CmsPage = {
          title:
            "Features",

          slug:
            "features",

          status:
            "published",

          isHomepage:
            false,

          seo:
            seo(),

          createdAt:
            EARLIER,

          updatedAt:
            EARLIER,

          publishedAt:
            EARLIER,
        };

        const draft =
          unpublishCmsPage(
            source,
            NOW,
          );

        expect(
          draft.status,
        ).toBe(
          "draft",
        );

        expect(
          draft.publishedAt,
        ).toBeNull();

        expect(
          draft.updatedAt,
        ).toEqual(
          NOW,
        );

        expect(
          source.status,
        ).toBe(
          "published",
        );
      },
    );

    it(
      "duplicates a published homepage as a normal draft",
      () => {
        const source: CmsPage = {
          title:
            "Home",

          slug:
            "home",

          status:
            "published",

          isHomepage:
            true,

          seo: {
            ...seo(),

            title:
              "Home SEO",
          },

          createdAt:
            EARLIER,

          updatedAt:
            EARLIER,

          publishedAt:
            EARLIER,
        };

        const copy =
          duplicateCmsPageDraft(
            source,
            "home-copy",
            NOW,
          );

        expect(
          copy.title,
        ).toBe(
          "Home (Copy)",
        );

        expect(
          copy.slug,
        ).toBe(
          "home-copy",
        );

        expect(
          copy.status,
        ).toBe(
          "draft",
        );

        expect(
          copy.isHomepage,
        ).toBe(false);

        expect(
          copy.publishedAt,
        ).toBeNull();

        expect(
          copy.createdAt,
        ).toEqual(
          NOW,
        );

        expect(
          copy.updatedAt,
        ).toEqual(
          NOW,
        );

        expect(
          copy.seo.title,
        ).toBe(
          "Home SEO",
        );
      },
    );
  },
);