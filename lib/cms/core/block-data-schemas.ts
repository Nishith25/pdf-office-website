import {
  z,
} from "zod";

import type {
  CmsBlockType,
} from "./types";

export const CMS_STRUCTURED_BLOCK_DATA_VERSION =
  2 as const;

const text =
  z
    .string()
    .trim()
    .max(
      5000,
    );

const shortText =
  z
    .string()
    .trim()
    .max(
      240,
    );

const href =
  z
    .string()
    .trim()
    .max(
      2000,
    );

const mediaValue =
  z
    .string()
    .trim()
    .max(
      2000,
    );

const itemId =
  z
    .string()
    .trim()
    .min(
      1,
    )
    .max(
      100,
    );

const presentationBase = {
  background:
    z.enum([
      "default",
      "muted",
      "contrast",
      "accent",
    ]),

  width:
    z.enum([
      "narrow",
      "standard",
      "wide",
      "full",
    ]),

  spacing:
    z.enum([
      "compact",
      "normal",
      "spacious",
    ]),

  alignment:
    z.enum([
      "left",
      "center",
    ]),
};

export const cmsBlockPresentationSchema =
  z
    .object({
      ...presentationBase,
    })
    .strict();

const ctaLinkSchema =
  z
    .object({
      label:
        shortText,

      url:
        href,
    })
    .strict();

const structuredBase = {
  schemaVersion:
    z.literal(
      CMS_STRUCTURED_BLOCK_DATA_VERSION,
    ),
};

/*
 * Hero
 */

export const cmsHeroBlockDataSchema =
  z
    .object({
      ...structuredBase,

      eyebrow:
        shortText,

      title:
        shortText,

      description:
        text,

      image:
        mediaValue,

      primaryCta:
        ctaLinkSchema,

      secondaryCta:
        ctaLinkSchema,

      badge:
        shortText,

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "editorial",
                "split",
                "centered",
                "product",
                "immersive",
                "app-showcase",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Rich Text
 */

export const cmsRichTextBlockDataSchema =
  z
    .object({
      ...structuredBase,

      eyebrow:
        shortText,

      title:
        shortText,

      body:
        text,

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "editorial",
                "minimal",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Image + Text
 */

export const cmsImageTextBlockDataSchema =
  z
    .object({
      ...structuredBase,

      eyebrow:
        shortText,

      title:
        shortText,

      description:
        text,

      image:
        mediaValue,

      imagePosition:
        z.enum([
          "left",
          "right",
        ]),

      cta:
        ctaLinkSchema,

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "split",
                "editorial",
                "showcase",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Feature Grid
 */

const cmsFeatureItemSchema =
  z
    .object({
      id:
        itemId,

      eyebrow:
        shortText,

      title:
        shortText,

      description:
        text,

      icon:
        shortText,

      image:
        mediaValue,

      badge:
        shortText,

      linkLabel:
        shortText,

      linkUrl:
        href,
    })
    .strict();

export const cmsFeatureGridBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      description:
        text,

      columns:
        z.union([
          z.literal(
            2,
          ),
          z.literal(
            3,
          ),
          z.literal(
            4,
          ),
        ]),

      items:
        z
          .array(
            cmsFeatureItemSchema,
          )
          .max(
            50,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "minimal",
                "icon-grid",
                "editorial",
                "bento",
                "alternating",
                "showcase",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Card Grid
 */

const cmsCardItemSchema =
  z
    .object({
      id:
        itemId,

      title:
        shortText,

      description:
        text,

      image:
        mediaValue,

      icon:
        shortText,

      badge:
        shortText,

      linkLabel:
        shortText,

      linkUrl:
        href,
    })
    .strict();

export const cmsCardGridBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      description:
        text,

      columns:
        z.union([
          z.literal(
            2,
          ),
          z.literal(
            3,
          ),
          z.literal(
            4,
          ),
        ]),

      cards:
        z
          .array(
            cmsCardItemSchema,
          )
          .max(
            50,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "minimal",
                "editorial",
                "bento",
                "showcase",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Stats
 */

const cmsStatItemSchema =
  z
    .object({
      id:
        itemId,

      value:
        shortText,

      label:
        shortText,

      description:
        text,
    })
    .strict();

export const cmsStatsBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      items:
        z
          .array(
            cmsStatItemSchema,
          )
          .max(
            30,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "minimal",
                "cards",
                "strip",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Gallery
 */

const cmsGalleryItemSchema =
  z
    .object({
      id:
        itemId,

      image:
        mediaValue,

      altText:
        shortText,

      caption:
        text,
    })
    .strict();

export const cmsGalleryBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      columns:
        z.union([
          z.literal(
            2,
          ),
          z.literal(
            3,
          ),
          z.literal(
            4,
          ),
        ]),

      images:
        z
          .array(
            cmsGalleryItemSchema,
          )
          .max(
            60,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "grid",
                "masonry",
                "showcase",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Logo Grid
 */

const cmsLogoItemSchema =
  z
    .object({
      id:
        itemId,

      image:
        mediaValue,

      name:
        shortText,

      url:
        href,
    })
    .strict();

export const cmsLogoGridBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      logos:
        z
          .array(
            cmsLogoItemSchema,
          )
          .max(
            60,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "grid",
                "strip",
                "monochrome",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * FAQ
 */

const cmsFaqItemSchema =
  z
    .object({
      id:
        itemId,

      question:
        shortText,

      answer:
        text,
    })
    .strict();

export const cmsFaqBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      description:
        text,

      items:
        z
          .array(
            cmsFaqItemSchema,
          )
          .max(
            60,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "stacked",
                "accordion",
                "two-column",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * CTA
 */

export const cmsCtaBlockDataSchema =
  z
    .object({
      ...structuredBase,

      eyebrow:
        shortText,

      title:
        shortText,

      description:
        text,

      primaryCta:
        ctaLinkSchema,

      secondaryCta:
        ctaLinkSchema,

      image:
        mediaValue,

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "centered",
                "split",
                "banner",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Button Group
 */

const cmsButtonItemSchema =
  z
    .object({
      id:
        itemId,

      label:
        shortText,

      url:
        href,

      style:
        z.enum([
          "primary",
          "secondary",
          "text",
        ]),

      target:
        z.enum([
          "same-tab",
          "new-tab",
        ]),
    })
    .strict();

export const cmsButtonGroupBlockDataSchema =
  z
    .object({
      ...structuredBase,

      title:
        shortText,

      buttons:
        z
          .array(
            cmsButtonItemSchema,
          )
          .max(
            20,
          ),

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "inline",
                "stacked",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Download / App Promotion
 */

export const cmsDownloadBlockDataSchema =
  z
    .object({
      ...structuredBase,

      eyebrow:
        shortText,

      title:
        shortText,

      description:
        text,

      image:
        mediaValue,

      googlePlayUrl:
        href,

      appStoreUrl:
        href,

      qrImage:
        mediaValue,

      presentation:
        z
          .object({
            ...presentationBase,

            variant:
              z.enum([
                "split",
                "centered",
                "device",
              ]),
          })
          .strict(),
    })
    .strict();

/*
 * Divider
 */

export const cmsDividerBlockDataSchema =
  z
    .object({
      ...structuredBase,

      style:
        z.enum([
          "line",
          "subtle",
        ]),
    })
    .strict();

/*
 * Spacer
 */

export const cmsSpacerBlockDataSchema =
  z
    .object({
      ...structuredBase,

      size:
        z.enum([
          "small",
          "medium",
          "large",
        ]),
    })
    .strict();

/*
 * Registry
 */

export const CMS_STRUCTURED_BLOCK_DATA_SCHEMAS = {
  hero:
    cmsHeroBlockDataSchema,

  richText:
    cmsRichTextBlockDataSchema,

  imageText:
    cmsImageTextBlockDataSchema,

  featureGrid:
    cmsFeatureGridBlockDataSchema,

  cardGrid:
    cmsCardGridBlockDataSchema,

  stats:
    cmsStatsBlockDataSchema,

  gallery:
    cmsGalleryBlockDataSchema,

  logoGrid:
    cmsLogoGridBlockDataSchema,

  faq:
    cmsFaqBlockDataSchema,

  cta:
    cmsCtaBlockDataSchema,

  buttonGroup:
    cmsButtonGroupBlockDataSchema,

  download:
    cmsDownloadBlockDataSchema,

  divider:
    cmsDividerBlockDataSchema,

  spacer:
    cmsSpacerBlockDataSchema,
} as const;

type CmsStructuredBlockDataSchemaMap =
  typeof CMS_STRUCTURED_BLOCK_DATA_SCHEMAS;

export type CmsStructuredBlockDataByType = {
  [K in keyof CmsStructuredBlockDataSchemaMap]:
    z.infer<
      CmsStructuredBlockDataSchemaMap[K]
    >;
};

export function getCmsStructuredBlockDataSchema<
  T extends CmsBlockType,
>(
  type:
    T,
): CmsStructuredBlockDataSchemaMap[T] {
  return CMS_STRUCTURED_BLOCK_DATA_SCHEMAS[
    type
  ];
}

export function isCmsStructuredBlockData(
  type:
    CmsBlockType,

  data:
    unknown,
): boolean {
  return getCmsStructuredBlockDataSchema(
    type,
  )
    .safeParse(
      data,
    )
    .success;
}

export function parseCmsStructuredBlockData<
  T extends CmsBlockType,
>(
  type:
    T,

  data:
    unknown,
): CmsStructuredBlockDataByType[T] {
  return getCmsStructuredBlockDataSchema(
    type,
  ).parse(
    data,
  ) as CmsStructuredBlockDataByType[T];
}