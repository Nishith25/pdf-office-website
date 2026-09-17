import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createCmsStructuredBlockDefault,
} from "../lib/cms/core/structured-block-defaults";

import {
  isCmsStructuredBlockData,
} from "../lib/cms/core/block-data-schemas";

import type {
  CmsBlockType,
} from "../lib/cms/core/types";

const BLOCK_TYPES:
  CmsBlockType[] = [
    "hero",
    "richText",
    "imageText",
    "featureGrid",
    "cardGrid",
    "stats",
    "gallery",
    "logoGrid",
    "faq",
    "cta",
    "buttonGroup",
    "download",
    "divider",
    "spacer",
  ];

describe(
  "structured CMS block defaults",
  () => {
    it(
      "creates valid V2 data for every CMS block type",
      () => {
        for (
          const type of
          BLOCK_TYPES
        ) {
          const data =
            createCmsStructuredBlockDefault(
              type,
            );

          expect(
            data.schemaVersion,
          ).toBe(
            2,
          );

          expect(
            isCmsStructuredBlockData(
              type,
              data,
            ),
          ).toBe(
            true,
          );
        }
      },
    );

    it(
      "returns an independent value on every call",
      () => {
        const first =
          createCmsStructuredBlockDefault(
            "hero",
          );

        const second =
          createCmsStructuredBlockDefault(
            "hero",
          );

        expect(
          second,
        ).toEqual(
          first,
        );

        expect(
          second,
        ).not.toBe(
          first,
        );
      },
    );

    it(
      "creates empty structured repeaters instead of legacy string arrays",
      () => {
        const faq =
          createCmsStructuredBlockDefault(
            "faq",
          );

        const features =
          createCmsStructuredBlockDefault(
            "featureGrid",
          );

        expect(
          faq.items,
        ).toEqual(
          [],
        );

        expect(
          features.items,
        ).toEqual(
          [],
        );
      },
    );

    it(
      "includes valid presentation defaults",
      () => {
        const hero =
          createCmsStructuredBlockDefault(
            "hero",
          );

        expect(
          hero.presentation,
        ).toMatchObject({
          background:
            "default",

          width:
            "wide",

          spacing:
            "spacious",

          alignment:
            "left",

          variant:
            "editorial",
        });
      },
    );
  },
);