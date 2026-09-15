import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsMenu,
  CmsPage,
} from "../lib/cms/core/types";

import {
  resolveCmsMenuHref,
  resolveCmsMenuItems,
} from "../lib/cms/public/navigation";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
  );

type PublicPage =
  CmsPage & {
    id:
      string;
  };

function page(
  id:
    string,

  title:
    string,

  slug:
    string,

  isHomepage =
    false,

  status:
    "draft" |
    "published" =
    "published",
): PublicPage {
  return {
    id,

    title,

    slug,

    status,

    isHomepage,

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
      status ===
      "published"
        ? NOW
        : null,
  };
}

const pages: PublicPage[] = [
  page(
    "page-home",
    "Home",
    "home",
    true,
  ),

  page(
    "page-about",
    "About",
    "about",
  ),

  page(
    "page-draft",
    "Draft",
    "draft",
    false,
    "draft",
  ),
];

function menu(): CmsMenu {
  return {
    name:
      "Main Navigation",

    key:
      "main-navigation",

    location:
      "header",

    items: [
      {
        id:
          "home",

        label:
          "Home",

        type:
          "page",

        pageId:
          "page-home",

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
          "about",

        label:
          "About Us",

        type:
          "page",

        pageId:
          "page-about",

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          2,

        enabled:
          true,
      },

      {
        id:
          "community",

        label:
          "Community",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "https://example.com",

        target:
          "new-tab",

        parentId:
          "about",

        order:
          3,

        enabled:
          true,
      },

      {
        id:
          "missing",

        label:
          "Missing",

        type:
          "page",

        pageId:
          "page-missing",

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          4,

        enabled:
          true,
      },

      {
        id:
          "draft",

        label:
          "Draft",

        type:
          "page",

        pageId:
          "page-draft",

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          5,

        enabled:
          true,
      },

      {
        id:
          "disabled",

        label:
          "Disabled",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/disabled",

        target:
          "same-tab",

        parentId:
          null,

        order:
          6,

        enabled:
          false,
      },
    ],

    createdAt:
      NOW,

    updatedAt:
      NOW,
  };
}

describe(
  "CMS public navigation",
  () => {
    it(
      "resolves homepage page links to slash",
      () => {
        const item =
          menu().items[0];

        expect(
          item,
        ).toBeDefined();

        expect(
          resolveCmsMenuHref(
            item!,
            pages,
          ),
        ).toBe("/");
      },
    );

    it(
      "resolves normal page links from the current page slug",
      () => {
        const item =
          menu().items[1];

        expect(
          resolveCmsMenuHref(
            item!,
            pages,
          ),
        ).toBe(
          "/about",
        );
      },
    );

    it(
      "passes through custom URLs",
      () => {
        const item =
          menu().items[2];

        expect(
          resolveCmsMenuHref(
            item!,
            pages,
          ),
        ).toBe(
          "https://example.com",
        );
      },
    );

    it(
      "returns null for missing or draft page references",
      () => {
        expect(
          resolveCmsMenuHref(
            menu().items[3]!,
            pages,
          ),
        ).toBeNull();

        expect(
          resolveCmsMenuHref(
            menu().items[4]!,
            pages,
          ),
        ).toBeNull();
      },
    );

    it(
      "creates a public nested navigation model",
      () => {
        const result =
          resolveCmsMenuItems(
            menu(),
            pages,
          );

        expect(
          result,
        ).toEqual([
          {
            id:
              "home",

            label:
              "Home",

            href:
              "/",

            target:
              "same-tab",

            children:
              [],
          },

          {
            id:
              "about",

            label:
              "About Us",

            href:
              "/about",

            target:
              "same-tab",

            children: [
              {
                id:
                  "community",

                label:
                  "Community",

                href:
                  "https://example.com",

                target:
                  "new-tab",

                children:
                  [],
              },
            ],
          },
        ]);
      },
    );
  },
);