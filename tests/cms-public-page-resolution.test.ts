import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsBlock,
  CmsPage,
} from "../lib/cms/core/types";

import {
  getVisibleCmsBlocks,
  isCmsPagePublic,
} from "../lib/cms/public/page-resolution";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
  );

function page(
  status:
    "draft" |
    "published",

  isHomepage =
    false,
): CmsPage {
  return {
    title:
      "About",

    slug:
      "about",

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

function block(
  type:
    CmsBlock["type"],

  order:
    number,

  visible:
    boolean,
): CmsBlock {
  return {
    pageId:
      "page-1",

    type,

    order,

    visible,

    data:
      {},

    createdAt:
      NOW,

    updatedAt:
      NOW,
  };
}

describe(
  "CMS public page resolution",
  () => {
    it(
      "allows published pages publicly",
      () => {
        expect(
          isCmsPagePublic(
            page(
              "published",
            ),
          ),
        ).toBe(true);
      },
    );

    it(
      "rejects draft pages publicly",
      () => {
        expect(
          isCmsPagePublic(
            page(
              "draft",
            ),
          ),
        ).toBe(false);
      },
    );

    it(
      "does not expose a draft just because it is marked homepage",
      () => {
        expect(
          isCmsPagePublic(
            page(
              "draft",
              true,
            ),
          ),
        ).toBe(false);
      },
    );

    it(
      "returns only visible blocks in render order without mutating input",
      () => {
        const source = [
          block(
            "cta",
            3,
            true,
          ),

          block(
            "hero",
            1,
            true,
          ),

          block(
            "richText",
            2,
            false,
          ),
        ];

        const result =
          getVisibleCmsBlocks(
            source,
          );

        expect(
          result.map(
            (
              item,
            ) =>
              item.type,
          ),
        ).toEqual([
          "hero",
          "cta",
        ]);

        expect(
          source.map(
            (
              item,
            ) =>
              item.type,
          ),
        ).toEqual([
          "cta",
          "hero",
          "richText",
        ]);
      },
    );
  },
);