import {
  describe,
  expect,
  it,
} from "vitest";

import {
  duplicateCmsBlockInList,
  moveCmsBlock,
  removeCmsBlock,
  toggleCmsBlockVisibility,
} from "../lib/cms/core/block-operations";

const CREATED =
  new Date(
    "2026-09-14T09:00:00.000Z",
  );

const NOW =
  new Date(
    "2026-09-15T09:00:00.000Z",
  );

function blocks() {
  return [
    {
      id:
        "a",

      pageId:
        "page-1",

      type:
        "hero" as const,

      order:
        1,

      visible:
        true,

      data: {
        title:
          "Hero",
      },

      createdAt:
        CREATED,

      updatedAt:
        CREATED,
    },

    {
      id:
        "b",

      pageId:
        "page-1",

      type:
        "richText" as const,

      order:
        2,

      visible:
        true,

      data: {
        body:
          "Text",
      },

      createdAt:
        CREATED,

      updatedAt:
        CREATED,
    },

    {
      id:
        "c",

      pageId:
        "page-1",

      type:
        "cta" as const,

      order:
        3,

      visible:
        true,

      data: {
        title:
          "CTA",
      },

      createdAt:
        CREATED,

      updatedAt:
        CREATED,
    },
  ];
}

describe(
  "CMS block operations",
  () => {
    it(
      "moves a block upward and renumbers the result",
      () => {
        const source =
          blocks();

        const result =
          moveCmsBlock(
            source,
            "b",
            "up",
          );

        expect(
          result.map(
            (
              block,
            ) =>
              block.id,
          ),
        ).toEqual([
          "b",
          "a",
          "c",
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
          3,
        ]);

        expect(
          source.map(
            (
              block,
            ) =>
              block.id,
          ),
        ).toEqual([
          "a",
          "b",
          "c",
        ]);
      },
    );

    it(
      "does not move the first block further upward",
      () => {
        const result =
          moveCmsBlock(
            blocks(),
            "a",
            "up",
          );

        expect(
          result.map(
            (
              block,
            ) =>
              block.id,
          ),
        ).toEqual([
          "a",
          "b",
          "c",
        ]);
      },
    );

    it(
      "toggles only the selected block visibility",
      () => {
        const result =
          toggleCmsBlockVisibility(
            blocks(),
            "b",
          );

        expect(
          result.find(
            (
              block,
            ) =>
              block.id ===
              "b",
          )?.visible,
        ).toBe(false);

        expect(
          result.find(
            (
              block,
            ) =>
              block.id ===
              "a",
          )?.visible,
        ).toBe(true);
      },
    );

    it(
      "removes a block and normalizes order",
      () => {
        const result =
          removeCmsBlock(
            blocks(),
            "b",
          );

        expect(
          result.map(
            (
              block,
            ) => ({
              id:
                block.id,

              order:
                block.order,
            }),
          ),
        ).toEqual([
          {
            id:
              "a",

            order:
              1,
          },

          {
            id:
              "c",

            order:
              2,
          },
        ]);
      },
    );

    it(
      "duplicates a block immediately after its source",
      () => {
        const result =
          duplicateCmsBlockInList(
            blocks(),
            "b",
            "b-copy",
            NOW,
          );

        expect(
          result.map(
            (
              block,
            ) =>
              block.id,
          ),
        ).toEqual([
          "a",
          "b",
          "b-copy",
          "c",
        ]);

        const duplicate =
          result.find(
            (
              block,
            ) =>
              block.id ===
              "b-copy",
          );

        expect(
          duplicate?.data,
        ).toEqual({
          body:
            "Text",
        });

        expect(
          duplicate?.createdAt,
        ).toEqual(
          NOW,
        );

        expect(
          duplicate?.updatedAt,
        ).toEqual(
          NOW,
        );

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
          3,
          4,
        ]);
      },
    );
  },
);