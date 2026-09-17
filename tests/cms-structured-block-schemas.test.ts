import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CMS_STRUCTURED_BLOCK_DATA_VERSION,
  isCmsStructuredBlockData,
  parseCmsStructuredBlockData,
} from "../lib/cms/core/block-data-schemas";

describe(
  "structured CMS block data schemas",
  () => {
    it(
      "accepts structured feature items",
      () => {
        const data =
          parseCmsStructuredBlockData(
            "featureGrid",
            {
              schemaVersion:
                CMS_STRUCTURED_BLOCK_DATA_VERSION,

              title:
                "Features",

              description:
                "What the product can do.",

              columns:
                3,

              items: [
                {
                  id:
                    "feature-1",

                  eyebrow:
                    "",

                  title:
                    "Fast",

                  description:
                    "Quick setup.",

                  icon:
                    "zap",

                  image:
                    "",

                  badge:
                    "",

                  linkLabel:
                    "Learn more",

                  linkUrl:
                    "/features",
                },
              ],

              presentation: {
                background:
                  "default",

                width:
                  "standard",

                spacing:
                  "normal",

                alignment:
                  "left",

                variant:
                  "icon-grid",
              },
            },
          );

        expect(
          data.items[0],
        ).toMatchObject({
          id:
            "feature-1",

          title:
            "Fast",

          description:
            "Quick setup.",
        });
      },
    );

    it(
      "accepts separate FAQ questions and answers",
      () => {
        expect(
          isCmsStructuredBlockData(
            "faq",
            {
              schemaVersion:
                2,

              title:
                "FAQ",

              description:
                "",

              items: [
                {
                  id:
                    "faq-1",

                  question:
                    "Can I edit this?",

                  answer:
                    "Yes.",
                },
              ],

              presentation: {
                background:
                  "default",

                width:
                  "standard",

                spacing:
                  "normal",

                alignment:
                  "left",

                variant:
                  "stacked",
              },
            },
          ),
        ).toBe(
          true,
        );
      },
    );

    it(
      "rejects delimiter string arrays as V2 feature data",
      () => {
        expect(
          isCmsStructuredBlockData(
            "featureGrid",
            {
              title:
                "Features",

              items: [
                "Fast — Quick setup",
              ],
            },
          ),
        ).toBe(
          false,
        );
      },
    );

    it(
      "does not contain project-specific CMS concepts",
      () => {
        const sample =
          JSON.stringify({
            featureGrid:
              parseCmsStructuredBlockData(
                "featureGrid",
                {
                  schemaVersion:
                    2,

                  title:
                    "Features",

                  description:
                    "",

                  columns:
                    3,

                  items:
                    [],

                  presentation: {
                    background:
                      "default",

                    width:
                      "standard",

                    spacing:
                      "normal",

                    alignment:
                      "left",

                    variant:
                      "minimal",
                  },
                },
              ),

            faq:
              parseCmsStructuredBlockData(
                "faq",
                {
                  schemaVersion:
                    2,

                  title:
                    "FAQ",

                  description:
                    "",

                  items:
                    [],

                  presentation: {
                    background:
                      "default",

                    width:
                      "standard",

                    spacing:
                      "normal",

                    alignment:
                      "left",

                    variant:
                      "stacked",
                  },
                },
              ),
          });

        expect(
          sample,
        ).not.toMatch(
          /PDF Office|GPS Maps|Scanner|OCR|eSign/i,
        );
      },
    );
  },
);