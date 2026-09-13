import {
  describe,
  expect,
  it,
} from "vitest";

import {
  moveArrayItem,
} from "../lib/admin/list-editor";

import {
  normalizeToolOrders,
  toolEditorSchema,
} from "../lib/admin/tools-editor";

import {
  faqEditorSchema,
  normalizeFaqOrders,
} from "../lib/admin/faq-editor";

describe(
  "admin list editors",
  () => {
    it(
      "moves an item without mutating the original array",
      () => {
        const source = [
          "one",
          "two",
          "three",
        ];

        const result =
          moveArrayItem(
            source,
            2,
            0,
          );

        expect(
          result,
        ).toEqual([
          "three",
          "one",
          "two",
        ]);

        expect(
          source,
        ).toEqual([
          "one",
          "two",
          "three",
        ]);
      },
    );

    it(
      "normalizes tool order from the current list position",
      () => {
        const result =
          normalizeToolOrders([
            {
              name:
                "Split PDF",
              type:
                "split",
              description:
                "Split documents.",
              visible: true,
              featured: false,
              order: 20,
            },

            {
              name:
                "Merge PDF",
              type:
                "merge",
              description:
                "Merge documents.",
              visible: true,
              featured: true,
              order: 2,
            },
          ]);

        expect(
          result.map(
            (tool) =>
              tool.order,
          ),
        ).toEqual([
          1,
          2,
        ]);
      },
    );

    it(
      "rejects duplicate tool types",
      () => {
        const result =
          toolEditorSchema.safeParse([
            {
              name:
                "Merge PDF",
              type:
                "merge",
              description: "",
              visible: true,
              featured: false,
              order: 1,
            },

            {
              name:
                "Another Merge",
              type:
                "merge",
              description: "",
              visible: true,
              featured: false,
              order: 2,
            },
          ]);

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "normalizes FAQ order",
      () => {
        const result =
          normalizeFaqOrders([
            {
              id:
                "faq-a",
              question:
                "Question A?",
              answer:
                "Answer A",
              visible: true,
              order: 40,
            },

            {
              id:
                "faq-b",
              question:
                "Question B?",
              answer:
                "Answer B",
              visible: false,
              order: 5,
            },
          ]);

        expect(
          result.map(
            (faq) =>
              faq.order,
          ),
        ).toEqual([
          1,
          2,
        ]);
      },
    );

    it(
      "rejects duplicate FAQ ids",
      () => {
        const result =
          faqEditorSchema.safeParse([
            {
              id:
                "same-id",
              question:
                "First?",
              answer:
                "First answer",
              visible: true,
              order: 1,
            },

            {
              id:
                "same-id",
              question:
                "Second?",
              answer:
                "Second answer",
              visible: true,
              order: 2,
            },
          ]);

        expect(
          result.success,
        ).toBe(false);
      },
    );
  },
);