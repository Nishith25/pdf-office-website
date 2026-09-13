import {
  describe,
  expect,
  it,
} from "vitest";

import {
  faqSchema,
  siteSectionSchema,
  toolSchema,
} from "../lib/cms/schemas";

describe(
  "CMS schemas",
  () => {
    it(
      "rejects a section without a key",
      () => {
        expect(() =>
          siteSectionSchema.parse({
            title: "OCR",
            visible: true,
            order: 1,
          }),
        ).toThrow();
      },
    );

    it(
      "rejects a negative tool order",
      () => {
        expect(() =>
          toolSchema.parse({
            name: "Merge PDF",
            type: "merge",
            description:
              "Combine PDF files.",
            visible: true,
            featured: false,
            order: -1,
          }),
        ).toThrow();
      },
    );

    it(
      "accepts a valid FAQ",
      () => {
        expect(
          faqSchema.parse({
            question:
              "Does PDF Office support OCR?",
            answer: "Yes.",
            visible: true,
            order: 1,
          }),
        ).toMatchObject({
          visible: true,
          order: 1,
        });
      },
    );
  },
);