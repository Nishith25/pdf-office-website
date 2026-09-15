import {
  describe,
  expect,
  it,
} from "vitest";

import {
  cloneCmsBlocksForPage,
} from "../lib/cms/core/block-copy";

describe(
  "CMS block copy",
  () => {
    it(
      "copies blocks to a new page with fresh timestamps and order",
      () => {
        const oldDate =
          new Date(
            "2026-09-14T09:00:00.000Z",
          );

        const now =
          new Date(
            "2026-09-15T09:00:00.000Z",
          );

        const source = [
          {
            id:
              "block-a",

            pageId:
              "old-page",

            type:
              "hero" as const,

            order:
              1,

            visible:
              true,

            data: {
              title:
                "Original",
            },

            createdAt:
              oldDate,

            updatedAt:
              oldDate,
          },

          {
            id:
              "block-b",

            pageId:
              "old-page",

            type:
              "richText" as const,

            order:
              2,

            visible:
              false,

            data: {
              body:
                "Body",
            },

            createdAt:
              oldDate,

            updatedAt:
              oldDate,
          },
        ];

        const result =
          cloneCmsBlocksForPage(
            source,
            "new-page",
            now,
          );

        expect(
          result,
        ).toHaveLength(
          2,
        );

        expect(
          result.map(
            (
              block,
            ) =>
              block.pageId,
          ),
        ).toEqual([
          "new-page",
          "new-page",
        ]);

        expect(
          result.map(
            (
              block,
            ) =>
              block.order,
          ),
        ).toEqual([
          1,
          2,
        ]);

        expect(
          result[0]?.createdAt,
        ).toEqual(
          now,
        );

        expect(
          result[0]?.updatedAt,
        ).toEqual(
          now,
        );

        expect(
          "id" in
            (result[0] ??
              {}),
        ).toBe(false);
      },
    );

    it(
      "deep copies block data",
      () => {
        const now =
          new Date(
            "2026-09-15T09:00:00.000Z",
          );

        const source = [
          {
            id:
              "block-a",

            pageId:
              "old-page",

            type:
              "featureGrid" as const,

            order:
              1,

            visible:
              true,

            data: {
              items: [
                "One",
                "Two",
              ],
            },

            createdAt:
              now,

            updatedAt:
              now,
          },
        ];

        const result =
          cloneCmsBlocksForPage(
            source,
            "new-page",
            now,
          );

        const copiedItems =
          result[0]?.data
            .items as string[];

        copiedItems.push(
          "Three",
        );

        expect(
          source[0]?.data
            .items,
        ).toEqual([
          "One",
          "Two",
        ]);
      },
    );
  },
);