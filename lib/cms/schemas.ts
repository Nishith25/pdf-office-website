import {
  z,
} from "zod";

export const siteSettingsSchema =
  z.object({
    brandName: z
      .string()
      .min(1)
      .max(120),

    shortName: z
      .string()
      .min(1)
      .max(60),

    playStoreUrl: z
      .string()
      .url(),

    siteUrl: z
      .string()
      .url(),

    appIconUrl: z
      .string()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),

    footerText: z
      .string()
      .max(300)
      .default(""),

    privacyUrl: z
      .string()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),

    termsUrl: z
      .string()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),
  });

export const seoSchema =
  z.object({
    title: z
      .string()
      .min(1)
      .max(70),

    description: z
      .string()
      .min(1)
      .max(180),

    keywords: z
      .array(
        z
          .string()
          .min(1)
          .max(60),
      )
      .max(30)
      .default([]),

    ogTitle: z
      .string()
      .max(100)
      .default(""),

    ogDescription: z
      .string()
      .max(200)
      .default(""),

    ogImage: z
      .string()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),

    canonicalUrl: z
      .string()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),
  });

export const sitePageSchema =
  z.object({
    slug: z.literal(
      "home",
    ),

    seo: seoSchema,
  });

export const siteSectionSchema =
  z.object({
    key: z
      .string()
      .min(1)
      .max(80),

    eyebrow: z
      .string()
      .max(100)
      .default(""),

    title: z
      .string()
      .min(1)
      .max(160),

    description: z
      .string()
      .max(600)
      .default(""),

    visible: z
      .boolean()
      .default(true),

    order: z
      .number()
      .int()
      .min(0),

    mediaId: z
      .string()
      .max(120)
      .optional()
      .or(
        z.literal(""),
      ),

    data: z
      .record(
        z.string(),
        z.unknown(),
      )
      .default({}),
  });

export const toolSchema =
  z.object({
    name: z
      .string()
      .min(1)
      .max(80),

    type: z
      .string()
      .min(1)
      .max(50),

    description: z
      .string()
      .max(240)
      .default(""),

    visible: z
      .boolean()
      .default(true),

    featured: z
      .boolean()
      .default(false),

    order: z
      .number()
      .int()
      .min(0),
  });

export const faqSchema =
  z.object({
    question: z
      .string()
      .min(1)
      .max(220),

    answer: z
      .string()
      .min(1)
      .max(1200),

    visible: z
      .boolean()
      .default(true),

    order: z
      .number()
      .int()
      .min(0),
  });