import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsMenuItem,
} from "../lib/cms/core/types";

import {
  moveCmsMenuItem,
  normalizeCmsMenuItems,
  removeCmsMenuItem,
  setCmsMenuItemParent,
  updateCmsMenuItem,
} from "../lib/cms/core/menu-operations";

function items(): CmsMenuItem[] {
  return [
    {
      id:
        "a",

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
        "b",

      label:
        "About",

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
        "c",

      label:
        "Contact",

      type:
        "custom",

      pageId:
        null,

      customUrl:
        "/contact",

      target:
        "same-tab",

      parentId:
        null,

      order:
        3,

      enabled:
        true,
    },
  ];
}

describe(
  "CMS menu operations",
  () => {
    it(
      "normalizes item order without mutating input",
      () => {
        const source =
          items().map(
            (
              item,
              index,
            ) => ({
              ...item,

              order:
                index ===
                0
                  ? 10
                  : index,
            }),
          );

        const result =
          normalizeCmsMenuItems(
            source,
          );

        expect(
          result.map(
            (
              item,
            ) =>
              item.order,
          ),
        ).toEqual([
          1,
          2,
          3,
        ]);

        expect(
          source[0]?.order,
        ).toBe(10);
      },
    );

    it(
      "moves an item upward",
      () => {
        const result =
          moveCmsMenuItem(
            items(),
            "b",
            "up",
          );

        expect(
          result.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "b",
          "a",
          "c",
        ]);

        expect(
          result.map(
            (
              item,
            ) =>
              item.order,
          ),
        ).toEqual([
          1,
          2,
          3,
        ]);
      },
    );

    it(
      "updates an item without mutating the source",
      () => {
        const source =
          items();

        const result =
          updateCmsMenuItem(
            source,
            "b",
            {
              label:
                "Our Company",

              target:
                "new-tab",
            },
          );

        expect(
          result.find(
            (
              item,
            ) =>
              item.id ===
              "b",
          ),
        ).toMatchObject({
          label:
            "Our Company",

          target:
            "new-tab",
        });

        expect(
          source[1]?.label,
        ).toBe(
          "About",
        );
      },
    );

    it(
      "supports one-level nesting",
      () => {
        const result =
          setCmsMenuItemParent(
            items(),
            "c",
            "b",
          );

        expect(
          result.find(
            (
              item,
            ) =>
              item.id ===
              "c",
          )?.parentId,
        ).toBe(
          "b",
        );
      },
    );

    it(
      "does not allow an item to parent itself",
      () => {
        const result =
          setCmsMenuItemParent(
            items(),
            "b",
            "b",
          );

        expect(
          result.find(
            (
              item,
            ) =>
              item.id ===
              "b",
          )?.parentId,
        ).toBeNull();
      },
    );

    it(
      "does not allow nesting below an existing child",
      () => {
        const nested =
          setCmsMenuItemParent(
            items(),
            "c",
            "b",
          );

        const result =
          setCmsMenuItemParent(
            nested,
            "a",
            "c",
          );

        expect(
          result.find(
            (
              item,
            ) =>
              item.id ===
              "a",
          )?.parentId,
        ).toBeNull();
      },
    );

    it(
      "promotes children to root when their parent is removed",
      () => {
        const nested =
          setCmsMenuItemParent(
            items(),
            "c",
            "b",
          );

        const result =
          removeCmsMenuItem(
            nested,
            "b",
          );

        expect(
          result.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "a",
          "c",
        ]);

        expect(
          result.find(
            (
              item,
            ) =>
              item.id ===
              "c",
          )?.parentId,
        ).toBeNull();
      },
    );
  },
);