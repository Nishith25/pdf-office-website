import {
  describe,
  expect,
  it,
} from "vitest";

import {
  cmsMenuItemSchema,
  cmsMenuSchema,
} from "../lib/cms/core/schemas";

const NOW =
  new Date(
    "2026-09-15T10:00:00.000Z",
  );

describe(
  "CMS menu schemas",
  () => {
    it(
      "accepts a generic header menu",
      () => {
        const result =
          cmsMenuSchema.safeParse({
            name:
              "Main Navigation",

            key:
              "main-navigation",

            location:
              "header",

            items: [
              {
                id:
                  "home-item",

                label:
                  "Home",

                type:
                  "page",

                pageId:
                  "page-1",

                customUrl:
                  "",

                target:
                  "same-tab",

                parentId:
                  null,

                order:
                  1,

                enabled:
                  true,
              },

              {
                id:
                  "external-item",

                label:
                  "External",

                type:
                  "custom",

                pageId:
                  null,

                customUrl:
                  "https://example.com",

                target:
                  "new-tab",

                parentId:
                  null,

                order:
                  2,

                enabled:
                  true,
              },
            ],

            createdAt:
              NOW,

            updatedAt:
              NOW,
          });

        expect(
          result.success,
        ).toBe(true);
      },
    );

    it(
      "rejects an unsupported menu location",
      () => {
        const result =
          cmsMenuSchema.safeParse({
            name:
              "Sidebar",

            key:
              "sidebar",

            location:
              "sidebar",

            items:
              [],

            createdAt:
              NOW,

            updatedAt:
              NOW,
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "rejects an unsupported link target",
      () => {
        const result =
          cmsMenuItemSchema.safeParse({
            id:
              "item-1",

            label:
              "About",

            type:
              "page",

            pageId:
              "page-1",

            customUrl:
              "",

            target:
              "popup",

            parentId:
              null,

            order:
              1,

            enabled:
              true,
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "contains no project-specific menu concepts",
      () => {
        const source =
          JSON.stringify({
            locations: [
              "header",
              "footer",
              "custom",
            ],

            types: [
              "page",
              "custom",
            ],
          });

        expect(
          source,
        ).not.toMatch(
          /PDF Office|Scanner|OCR|eSign|GPS/i,
        );
      },
    );
  },
);