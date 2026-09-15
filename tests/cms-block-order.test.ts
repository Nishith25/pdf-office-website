import {
  describe,
  expect,
  it,
} from "vitest";

import {
  normalizeCmsBlockOrder,
} from "../lib/cms/core/blocks";

describe(
  "CMS block ordering",
  () => {
    it(
      "normalizes orders without mutating input",
      () => {
        const original = [
          {
            name:
              "Second",

            order:
              9,
          },

          {
            name:
              "First",

            order:
              2,
          },
        ];

        const result =
          normalizeCmsBlockOrder(
            original,
          );

        expect(
          result,
        ).toEqual([
          {
            name:
              "First",

            order:
              1,
          },

          {
            name:
              "Second",

            order:
              2,
          },
        ]);

        expect(
          original[0]
            ?.order,
        ).toBe(9);
      },
    );
  },
);