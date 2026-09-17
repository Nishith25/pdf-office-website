import {
  parseCmsStructuredBlockData,
} from "./block-data-schemas";

import type {
  CmsStructuredBlockDataByType,
} from "./block-data-schemas";

import type {
  CmsBlockType,
} from "./types";

const DEFAULT_PRESENTATION = {
  background:
    "default" as const,

  width:
    "standard" as const,

  spacing:
    "normal" as const,

  alignment:
    "left" as const,
};

export function createCmsStructuredBlockDefault<
  T extends CmsBlockType,
>(
  type:
    T,
): CmsStructuredBlockDataByType[T];

export function createCmsStructuredBlockDefault(
  type:
    CmsBlockType,
): CmsStructuredBlockDataByType[CmsBlockType] {
  switch (
    type
  ) {
    case "hero":
      return parseCmsStructuredBlockData(
        "hero",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            "Page heading",

          description:
            "",

          image:
            "",

          primaryCta: {
            label:
              "",

            url:
              "",
          },

          secondaryCta: {
            label:
              "",

            url:
              "",
          },

          badge:
            "",

          presentation: {
            ...DEFAULT_PRESENTATION,

            width:
              "wide",

            spacing:
              "spacious",

            variant:
              "editorial",
          },
        },
      );

    case "richText":
      return parseCmsStructuredBlockData(
        "richText",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            "",

          body:
            "",

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "editorial",
          },
        },
      );

    case "imageText":
      return parseCmsStructuredBlockData(
        "imageText",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            "",

          description:
            "",

          image:
            "",

          imagePosition:
            "right",

          cta: {
            label:
              "",

            url:
              "",
          },

          presentation: {
            ...DEFAULT_PRESENTATION,

            width:
              "wide",

            spacing:
              "spacious",

            variant:
              "split",
          },
        },
      );

    case "featureGrid":
      return parseCmsStructuredBlockData(
        "featureGrid",
        {
          schemaVersion:
            2,

          title:
            "",

          description:
            "",

          items:
            [],

          columns:
            3,

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "minimal",
          },
        },
      );

    case "cardGrid":
      return parseCmsStructuredBlockData(
        "cardGrid",
        {
          schemaVersion:
            2,

          title:
            "",

          description:
            "",

          cards:
            [],

          columns:
            3,

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "editorial",
          },
        },
      );

    case "stats":
      return parseCmsStructuredBlockData(
        "stats",
        {
          schemaVersion:
            2,

          title:
            "",

          items:
            [],

          presentation: {
            ...DEFAULT_PRESENTATION,

            alignment:
              "center",

            variant:
              "cards",
          },
        },
      );

    case "gallery":
      return parseCmsStructuredBlockData(
        "gallery",
        {
          schemaVersion:
            2,

          title:
            "",

          images:
            [],

          columns:
            3,

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "grid",
          },
        },
      );

    case "logoGrid":
      return parseCmsStructuredBlockData(
        "logoGrid",
        {
          schemaVersion:
            2,

          title:
            "",

          logos:
            [],

          presentation: {
            ...DEFAULT_PRESENTATION,

            alignment:
              "center",

            variant:
              "grid",
          },
        },
      );

    case "faq":
      return parseCmsStructuredBlockData(
        "faq",
        {
          schemaVersion:
            2,

          title:
            "Frequently Asked Questions",

          description:
            "",

          items:
            [],

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "stacked",
          },
        },
      );

    case "cta":
      return parseCmsStructuredBlockData(
        "cta",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            "",

          description:
            "",

          primaryCta: {
            label:
              "",

            url:
              "",
          },

          secondaryCta: {
            label:
              "",

            url:
              "",
          },

          image:
            "",

          presentation: {
            ...DEFAULT_PRESENTATION,

            width:
              "wide",

            spacing:
              "spacious",

            alignment:
              "center",

            variant:
              "centered",
          },
        },
      );

    case "buttonGroup":
      return parseCmsStructuredBlockData(
        "buttonGroup",
        {
          schemaVersion:
            2,

          title:
            "",

          buttons:
            [],

          presentation: {
            ...DEFAULT_PRESENTATION,

            variant:
              "inline",
          },
        },
      );

    case "download":
      return parseCmsStructuredBlockData(
        "download",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            "",

          description:
            "",

          image:
            "",

          googlePlayUrl:
            "",

          appStoreUrl:
            "",

          qrImage:
            "",

          presentation: {
            ...DEFAULT_PRESENTATION,

            width:
              "wide",

            spacing:
              "spacious",

            variant:
              "split",
          },
        },
      );

    case "divider":
      return parseCmsStructuredBlockData(
        "divider",
        {
          schemaVersion:
            2,

          style:
            "line",
        },
      );

    case "spacer":
      return parseCmsStructuredBlockData(
        "spacer",
        {
          schemaVersion:
            2,

          size:
            "medium",
        },
      );
  }

  const exhaustiveCheck:
    never =
      type;

  throw new Error(
    `Unsupported CMS block type: ${exhaustiveCheck}`,
  );
}