import {
  describe,
  expect,
  it,
} from "vitest";

import {
  normalizeCmsBlockData,
} from "../lib/cms/core/block-data-normalizer";

describe(
  "CMS block data normalizer",
  () => {
    it(
      "splits legacy stat strings into value and label",
      () => {
        const result =
          normalizeCmsBlockData(
            "stats",
            {
              title:
                "Highlights",

              items: [
                "13+ — PDF Tools",
                "OCR — Text Extraction",
              ],
            },
          );

        expect(
          result.items,
        ).toEqual([
          {
            id:
              "stat-1",

            value:
              "13+",

            label:
              "PDF Tools",

            description:
              "",
          },

          {
            id:
              "stat-2",

            value:
              "OCR",

            label:
              "Text Extraction",

            description:
              "",
          },
        ]);
      },
    );

    it(
      "splits legacy FAQ strings into question and answer",
      () => {
        const result =
          normalizeCmsBlockData(
            "faq",
            {
              title:
                "FAQ",

              items: [
                "Can I scan documents? — Yes, directly from the app.",
              ],
            },
          );

        expect(
          result.items,
        ).toEqual([
          {
            id:
              "faq-1",

            question:
              "Can I scan documents?",

            answer:
              "Yes, directly from the app.",
          },
        ]);
      },
    );

    it(
      "converts legacy card strings without losing undelimited titles",
      () => {
        const result =
          normalizeCmsBlockData(
            "cardGrid",
            {
              title:
                "Tools",

              description:
                "",

              cards: [
                "Merge PDF",
                "Scan anything — Capture paper documents cleanly",
              ],
            },
          );

        expect(
          result.cards,
        ).toEqual([
          expect.objectContaining({
            id:
              "card-1",

            title:
              "Merge PDF",

            description:
              "",
          }),

          expect.objectContaining({
            id:
              "card-2",

            title:
              "Scan anything",

            description:
              "Capture paper documents cleanly",
          }),
        ]);
      },
    );

    it(
      "is idempotent for already structured data",
      () => {
        const first =
          normalizeCmsBlockData(
            "faq",
            {
              title:
                "FAQ",

              items: [
                "Question — Answer",
              ],
            },
          );

        const second =
          normalizeCmsBlockData(
            "faq",
            first,
          );

        expect(
          second,
        ).toEqual(
          first,
        );
      },
    );
  },
);