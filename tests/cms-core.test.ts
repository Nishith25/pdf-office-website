import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  cmsBlockSchema,
  cmsPageSchema,
} from "../lib/cms/core/schemas";

import {
  isReservedCmsSlug,
  normalizeCmsSlug,
} from "../lib/cms/core/slug";

import {
  canDeleteCmsPage,
} from "../lib/repositories/cms-pages";

describe(
  "generic CMS core",
  () => {
    it(
      "normalizes page slugs",
      () => {
        expect(
          normalizeCmsSlug(
            "  About Our App!  ",
          ),
        ).toBe(
          "about-our-app",
        );
      },
    );

    it(
      "rejects reserved route slugs",
      () => {
        expect(
          isReservedCmsSlug(
            "admin",
          ),
        ).toBe(true);

        expect(
          isReservedCmsSlug(
            "api",
          ),
        ).toBe(true);

        expect(
          isReservedCmsSlug(
            "about",
          ),
        ).toBe(false);
      },
    );

    it(
      "parses a generic draft page",
      () => {
        const page =
          cmsPageSchema.parse({
            title:
              "About Us",

            slug:
              "about-us",

            status:
              "draft",

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
              new Date(),

            updatedAt:
              new Date(),

            publishedAt:
              null,
          });

        expect(
          page.status,
        ).toBe(
          "draft",
        );
      },
    );

    it(
      "rejects a reserved slug at schema level",
      () => {
        const result =
          cmsPageSchema.safeParse({
            title:
              "Admin",

            slug:
              "admin",

            status:
              "draft",

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
                true,
            },

            createdAt:
              new Date(),

            updatedAt:
              new Date(),

            publishedAt:
              null,
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "accepts only registered generic block identifiers",
      () => {
        expect(
          cmsBlockSchema.safeParse({
            pageId:
              "507f1f77bcf86cd799439011",

            type:
              "hero",

            order:
              1,

            visible:
              true,

            data:
              {},

            createdAt:
              new Date(),

            updatedAt:
              new Date(),
          }).success,
        ).toBe(true);

        expect(
          cmsBlockSchema.safeParse({
            pageId:
              "507f1f77bcf86cd799439011",

            type:
              "pdfScanner",

            order:
              1,

            visible:
              true,

            data:
              {},

            createdAt:
              new Date(),

            updatedAt:
              new Date(),
          }).success,
        ).toBe(false);
      },
    );

    it(
      "uses the new generic collection names",
      () => {
        expect(
          CMS_COLLECTIONS,
        ).toEqual({
          pages:
            "cms_pages",

          blocks:
            "cms_blocks",

          menus:
            "cms_menus",

          settings:
            "cms_settings",

          activity:
            "cms_activity_log",
        });
      },
    );

    it(
      "prevents deleting the homepage",
      () => {
        expect(
          canDeleteCmsPage({
            isHomepage:
              true,
          }),
        ).toBe(false);

        expect(
          canDeleteCmsPage({
            isHomepage:
              false,
          }),
        ).toBe(true);
      },
    );
  },
);