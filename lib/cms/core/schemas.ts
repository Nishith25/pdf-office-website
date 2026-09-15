import {
  z,
} from "zod";

import {
  isReservedCmsSlug,
  normalizeCmsSlug,
} from "./slug";

export const cmsBlockTypeSchema =
  z.enum([
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
  ]);

export const cmsPageStatusSchema =
  z.enum([
    "draft",
    "published",
  ]);

export const cmsSeoSchema =
  z.object({
    title: z
      .string()
      .trim()
      .max(70),

    description: z
      .string()
      .trim()
      .max(180),

    keywords: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(80),
      )
      .max(30),

    canonicalUrl: z
      .string()
      .trim()
      .url()
      .or(
        z.literal(""),
      ),

    ogTitle: z
      .string()
      .trim()
      .max(100),

    ogDescription: z
      .string()
      .trim()
      .max(200),

    ogImage: z
      .string()
      .trim()
      .url()
      .or(
        z.literal(""),
      ),

    noIndex:
      z.boolean(),
  });

export const cmsPageSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(160),

    slug: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .transform(
        normalizeCmsSlug,
      )
      .refine(
        (
          slug,
        ) =>
          slug.length >
            0 &&
          !isReservedCmsSlug(
            slug,
          ),
        {
          message:
            "This slug is reserved.",
        },
      ),

    status:
      cmsPageStatusSchema,

    isHomepage:
      z.boolean(),

    seo:
      cmsSeoSchema,

    createdAt:
      z.coerce.date(),

    updatedAt:
      z.coerce.date(),

    publishedAt:
      z
        .coerce
        .date()
        .nullable(),
  });

export const cmsBlockSchema =
  z.object({
    pageId: z
      .string()
      .min(1)
      .max(64),

    type:
      cmsBlockTypeSchema,

    order: z
      .number()
      .int()
      .min(1),

    visible:
      z.boolean(),

    data:
      z.record(
        z.string(),
        z.unknown(),
      ),

    createdAt:
      z.coerce.date(),

    updatedAt:
      z.coerce.date(),
  });

/*
 * Generic CMS menu schemas
 */

export const cmsMenuItemTypeSchema =
  z.enum([
    "page",
    "custom",
  ]);

export const cmsMenuItemTargetSchema =
  z.enum([
    "same-tab",
    "new-tab",
  ]);

export const cmsMenuLocationSchema =
  z.enum([
    "header",
    "footer",
    "custom",
  ]);

export const cmsMenuItemSchema =
  z
    .object({
      id: z
        .string()
        .trim()
        .min(1)
        .max(100),

      label: z
        .string()
        .trim()
        .min(1)
        .max(120),

      type:
        cmsMenuItemTypeSchema,

      pageId: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .nullable(),

      customUrl: z
        .string()
        .trim()
        .max(2000),

      target:
        cmsMenuItemTargetSchema,

      parentId: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .nullable(),

      order: z
        .number()
        .int()
        .min(1),

      enabled:
        z.boolean(),
    })
    .superRefine(
      (
        value,
        context,
      ) => {
        if (
          value.type ===
            "page" &&
          !value.pageId
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "pageId",
            ],

            message:
              "A page menu item requires a page.",
          });
        }

        if (
          value.type ===
            "custom" &&
          value.customUrl.length ===
            0
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "customUrl",
            ],

            message:
              "A custom menu item requires a URL.",
          });
        }

        if (
          value.parentId ===
          value.id
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "parentId",
            ],

            message:
              "A menu item cannot be its own parent.",
          });
        }
      },
    );

export const cmsMenuSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(120),

    key: z
      .string()
      .trim()
      .min(1)
      .max(120)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Menu key must use lowercase letters, numbers and hyphens.",
      ),

    location:
      cmsMenuLocationSchema,

    items: z
      .array(
        cmsMenuItemSchema,
      )
      .max(200),

    createdAt:
      z.coerce.date(),

    updatedAt:
      z.coerce.date(),
  });

const optionalUrl =
  z
    .string()
    .trim()
    .url()
    .or(
      z.literal(""),
    );

export const cmsSettingsSchema =
  z.object({
    key:
      z.literal(
        "global",
      ),

    identity:
      z.object({
        siteName: z
          .string()
          .trim()
          .min(1)
          .max(120),

        shortName: z
          .string()
          .trim()
          .min(1)
          .max(80),

        tagline: z
          .string()
          .trim()
          .max(200),

        logoUrl:
          optionalUrl,

        faviconUrl:
          optionalUrl,

        siteUrl:
          optionalUrl,
      }),

    contact:
      z.object({
        email: z
          .string()
          .trim()
          .email()
          .or(
            z.literal(""),
          ),

        phone: z
          .string()
          .trim()
          .max(50),

        address: z
          .string()
          .trim()
          .max(500),
      }),

    social:
      z.object({
        instagram:
          optionalUrl,

        facebook:
          optionalUrl,

        linkedin:
          optionalUrl,

        youtube:
          optionalUrl,

        x:
          optionalUrl,
      }),

    externalLinks:
      z.object({
        primaryCtaLabel:
          z
            .string()
            .trim()
            .max(80),

        primaryCtaUrl:
          optionalUrl,

        googlePlayUrl:
          optionalUrl,

        appStoreUrl:
          optionalUrl,
      }),

    footer:
      z.object({
        text: z
          .string()
          .trim()
          .max(500),

        copyright:
          z
            .string()
            .trim()
            .max(200),

        privacyPageId:
          z
            .string()
            .trim()
            .max(64),

        termsPageId:
          z
            .string()
            .trim()
            .max(64),

        headerMenuId:
          z
            .string()
            .trim()
            .max(64),

        footerMenuId:
          z
            .string()
            .trim()
            .max(64),
      }),

    globalSeo:
      cmsSeoSchema,

    theme:
      z.object({
        primaryColor:
          z
            .string()
            .regex(
              /^#[0-9A-Fa-f]{6}$/,
            ),

        secondaryColor:
          z
            .string()
            .regex(
              /^#[0-9A-Fa-f]{6}$/,
            ),

        accentColor:
          z
            .string()
            .regex(
              /^#[0-9A-Fa-f]{6}$/,
            ),

        backgroundColor:
          z
            .string()
            .regex(
              /^#[0-9A-Fa-f]{6}$/,
            ),

        textColor:
          z
            .string()
            .regex(
              /^#[0-9A-Fa-f]{6}$/,
            ),

        headingFont:
          z.enum([
            "sans",
            "serif",
            "display",
          ]),

        bodyFont:
          z.enum([
            "sans",
            "serif",
          ]),

        buttonStyle:
          z.enum([
            "square",
            "rounded",
            "pill",
          ]),

        radiusScale:
          z.enum([
            "none",
            "small",
            "medium",
            "large",
          ]),

        containerWidth:
          z.enum([
            "narrow",
            "standard",
            "wide",
          ]),
      }),

    updatedAt:
      z.coerce.date(),
  });

export const cmsActivitySchema =
  z.object({
    action: z
      .string()
      .trim()
      .min(1)
      .max(160),

    entityType:
      z.enum([
        "page",
        "block",
        "menu",
        "media",
        "settings",
        "security",
        "system",
      ]),

    entityId: z
      .string()
      .trim()
      .max(64),

    entityName: z
      .string()
      .trim()
      .max(160),

    createdAt:
      z.coerce.date(),
  });