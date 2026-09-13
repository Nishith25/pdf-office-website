import {
  describe,
  expect,
  it,
} from "vitest";

import {
  sortByOrder,
} from "../lib/repositories/site-content";

describe(
  "sortByOrder",
  () => {
    it(
      "sorts records by ascending order without mutating the original array",
      () => {
        const source = [
          {
            name: "Second",
            order: 2,
          },
          {
            name: "First",
            order: 1,
          },
          {
            name: "Third",
            order: 3,
          },
        ];

        const result =
          sortByOrder(source);

        expect(
          result.map(
            (item) =>
              item.name,
          ),
        ).toEqual([
          "First",
          "Second",
          "Third",
        ]);

        expect(
          source.map(
            (item) =>
              item.name,
          ),
        ).toEqual([
          "Second",
          "First",
          "Third",
        ]);
      },
    );
  },
);