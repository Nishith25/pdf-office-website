import {
  z,
} from "zod";

import {
  cmsSettingsSchema,
} from "../cms/core/schemas";

import type {
  CmsSettings,
} from "../cms/core/types";

const optionalUrlSchema =
  z
    .string()
    .trim()
    .url()
    .or(
      z.literal(""),
    );

const optionalEmailSchema =
  z
    .string()
    .trim()
    .email()
    .or(
      z.literal(""),
    );

const colorSchema =
  z
    .string()
    .trim()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Use a 6-digit hexadecimal color.",
    );

const headingFontSchema =
  z.enum([
    "sans",
    "serif",
    "display",
  ]);

const bodyFontSchema =
  z.enum([
    "sans",
    "serif",
  ]);

const buttonStyleSchema =
  z.enum([
    "square",
    "rounded",
    "pill",
  ]);

const radiusScaleSchema =
  z.enum([
    "none",
    "small",
    "medium",
    "large",
  ]);

const containerWidthSchema =
  z.enum([
    "narrow",
    "standard",
    "wide",
  ]);

export const cmsAppearanceEditorSchema =
  z.object({
    siteName: z
      .string()
      .trim()
      .min(1)
      .max(120),

    shortName: z
      .string()
      .trim()
      .max(80),

    tagline: z
      .string()
      .trim()
      .max(200),

    /*
     * Form field names stay generic/simple.
     * They are mapped to logoUrl/faviconUrl
     * when CmsSettings is built.
     */
    logo:
      optionalUrlSchema,

    favicon:
      optionalUrlSchema,

    siteUrl:
      optionalUrlSchema,

    email:
      optionalEmailSchema,

    phone: z
      .string()
      .trim()
      .max(50),

    address: z
      .string()
      .trim()
      .max(500),

    instagram:
      optionalUrlSchema,

    facebook:
      optionalUrlSchema,

    linkedin:
      optionalUrlSchema,

    youtube:
      optionalUrlSchema,

    x:
      optionalUrlSchema,

    /*
     * These are editor/form field names.
     * They map to the existing CmsSettings names:
     *
     * ctaLabel -> primaryCtaLabel
     * ctaUrl -> primaryCtaUrl
     * playStoreUrl -> googlePlayUrl
     */
    ctaLabel: z
      .string()
      .trim()
      .max(80),

    ctaUrl:
      optionalUrlSchema,

    playStoreUrl:
      optionalUrlSchema,

    appStoreUrl:
      optionalUrlSchema,

    footerText: z
      .string()
      .trim()
      .max(500),

    copyright: z
      .string()
      .trim()
      .max(200),

    privacyPageId: z
      .string()
      .trim()
      .max(64),

    termsPageId: z
      .string()
      .trim()
      .max(64),

    headerMenuId: z
      .string()
      .trim()
      .max(64),

    footerMenuId: z
      .string()
      .trim()
      .max(64),

    seoTitle: z
      .string()
      .trim()
      .max(70),

    seoDescription: z
      .string()
      .trim()
      .max(180),

    seoKeywords: z
      .string()
      .max(2000),

    canonicalUrl:
      optionalUrlSchema,

    ogTitle: z
      .string()
      .trim()
      .max(100),

    ogDescription: z
      .string()
      .trim()
      .max(200),

    ogImage:
      optionalUrlSchema,

    noIndex:
      z.boolean(),

    primaryColor:
      colorSchema,

    secondaryColor:
      colorSchema,

    accentColor:
      colorSchema,

    backgroundColor:
      colorSchema,

    textColor:
      colorSchema,

    headingFont:
      headingFontSchema,

    bodyFont:
      bodyFontSchema,

    buttonStyle:
      buttonStyleSchema,

    radiusScale:
      radiusScaleSchema,

    containerWidth:
      containerWidthSchema,
  });

export type CmsAppearanceEditorInput =
  z.infer<
    typeof cmsAppearanceEditorSchema
  >;

function readText(
  formData:
    FormData,

  name:
    string,
): string {
  const value =
    formData.get(
      name,
    );

  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readBoolean(
  formData:
    FormData,

  name:
    string,
): boolean {
  const value =
    readText(
      formData,
      name,
    ).toLowerCase();

  return (
    value ===
      "true" ||
    value ===
      "1" ||
    value ===
      "on"
  );
}

function readEnum<
  T extends string,
>(
  value:
    string,

  allowed:
    readonly T[],

  fallback:
    T,
): T {
  return allowed.includes(
    value as T,
  )
    ? (
        value as T
      )
    : fallback;
}

export function readCmsAppearanceFromFormData(
  formData:
    FormData,
): CmsAppearanceEditorInput {
  return {
    siteName:
      readText(
        formData,
        "siteName",
      ) ||
      "Website",

    shortName:
      readText(
        formData,
        "shortName",
      ) ||
      "Website",

    tagline:
      readText(
        formData,
        "tagline",
      ),

    logo:
      readText(
        formData,
        "logo",
      ),

    favicon:
      readText(
        formData,
        "favicon",
      ),

    siteUrl:
      readText(
        formData,
        "siteUrl",
      ),

    email:
      readText(
        formData,
        "email",
      ),

    phone:
      readText(
        formData,
        "phone",
      ),

    address:
      readText(
        formData,
        "address",
      ),

    instagram:
      readText(
        formData,
        "instagram",
      ),

    facebook:
      readText(
        formData,
        "facebook",
      ),

    linkedin:
      readText(
        formData,
        "linkedin",
      ),

    youtube:
      readText(
        formData,
        "youtube",
      ),

    x:
      readText(
        formData,
        "x",
      ),

    ctaLabel:
      readText(
        formData,
        "ctaLabel",
      ),

    ctaUrl:
      readText(
        formData,
        "ctaUrl",
      ),

    playStoreUrl:
      readText(
        formData,
        "playStoreUrl",
      ),

    appStoreUrl:
      readText(
        formData,
        "appStoreUrl",
      ),

    footerText:
      readText(
        formData,
        "footerText",
      ),

    copyright:
      readText(
        formData,
        "copyright",
      ),

    privacyPageId:
      readText(
        formData,
        "privacyPageId",
      ),

    termsPageId:
      readText(
        formData,
        "termsPageId",
      ),

    headerMenuId:
      readText(
        formData,
        "headerMenuId",
      ),

    footerMenuId:
      readText(
        formData,
        "footerMenuId",
      ),

    seoTitle:
      readText(
        formData,
        "seoTitle",
      ),

    seoDescription:
      readText(
        formData,
        "seoDescription",
      ),

    seoKeywords:
      readText(
        formData,
        "seoKeywords",
      ),

    canonicalUrl:
      readText(
        formData,
        "canonicalUrl",
      ),

    ogTitle:
      readText(
        formData,
        "ogTitle",
      ),

    ogDescription:
      readText(
        formData,
        "ogDescription",
      ),

    ogImage:
      readText(
        formData,
        "ogImage",
      ),

    noIndex:
      readBoolean(
        formData,
        "noIndex",
      ),

    primaryColor:
      readText(
        formData,
        "primaryColor",
      ) ||
      "#2563EB",

    secondaryColor:
      readText(
        formData,
        "secondaryColor",
      ) ||
      "#111827",

    accentColor:
      readText(
        formData,
        "accentColor",
      ) ||
      "#F97316",

    backgroundColor:
      readText(
        formData,
        "backgroundColor",
      ) ||
      "#FFFFFF",

    textColor:
      readText(
        formData,
        "textColor",
      ) ||
      "#111827",

    headingFont:
      readEnum(
        readText(
          formData,
          "headingFont",
        ),

        [
          "sans",
          "serif",
          "display",
        ] as const,

        "sans",
      ),

    bodyFont:
      readEnum(
        readText(
          formData,
          "bodyFont",
        ),

        [
          "sans",
          "serif",
        ] as const,

        "sans",
      ),

    buttonStyle:
      readEnum(
        readText(
          formData,
          "buttonStyle",
        ),

        [
          "square",
          "rounded",
          "pill",
        ] as const,

        "rounded",
      ),

    radiusScale:
      readEnum(
        readText(
          formData,
          "radiusScale",
        ),

        [
          "none",
          "small",
          "medium",
          "large",
        ] as const,

        "medium",
      ),

    containerWidth:
      readEnum(
        readText(
          formData,
          "containerWidth",
        ),

        [
          "narrow",
          "standard",
          "wide",
        ] as const,

        "standard",
      ),
  };
}

function parseKeywords(
  value:
    string,
): string[] {
  const seen =
    new Set<
      string
    >();

  const result:
    string[] = [];

  for (
    const raw of value.split(
      /[,\n]+/,
    )
  ) {
    const keyword =
      raw.trim();

    if (!keyword) {
      continue;
    }

    const normalized =
      keyword.toLocaleLowerCase();

    if (
      seen.has(
        normalized,
      )
    ) {
      continue;
    }

    seen.add(
      normalized,
    );

    result.push(
      keyword,
    );
  }

  return result.slice(
    0,
    30,
  );
}

export function buildCmsSettingsFromAppearance(
  input:
    CmsAppearanceEditorInput,

  existing:
    CmsSettings,

  now =
    new Date(),
): CmsSettings {
  const parsed =
    cmsAppearanceEditorSchema.parse(
      input,
    );

  /*
   * Build through the real cmsSettingsSchema so
   * this function can never silently return a
   * shape that the repository later rejects.
   */
  return cmsSettingsSchema.parse({
    ...existing,

    key:
      "global",

    identity: {
      ...existing.identity,

      siteName:
        parsed.siteName,

      shortName:
        parsed.shortName ||
        parsed.siteName,

      tagline:
        parsed.tagline,

      logoUrl:
        parsed.logo,

      faviconUrl:
        parsed.favicon,

      siteUrl:
        parsed.siteUrl,
    },

    contact: {
      ...existing.contact,

      email:
        parsed.email,

      phone:
        parsed.phone,

      address:
        parsed.address,
    },

    social: {
      ...existing.social,

      instagram:
        parsed.instagram,

      facebook:
        parsed.facebook,

      linkedin:
        parsed.linkedin,

      youtube:
        parsed.youtube,

      x:
        parsed.x,
    },

    externalLinks: {
      ...existing.externalLinks,

      primaryCtaLabel:
        parsed.ctaLabel,

      primaryCtaUrl:
        parsed.ctaUrl,

      googlePlayUrl:
        parsed.playStoreUrl,

      appStoreUrl:
        parsed.appStoreUrl,
    },

    footer: {
      ...existing.footer,

      text:
        parsed.footerText,

      copyright:
        parsed.copyright,

      privacyPageId:
        parsed.privacyPageId,

      termsPageId:
        parsed.termsPageId,

      headerMenuId:
        parsed.headerMenuId,

      footerMenuId:
        parsed.footerMenuId,
    },

    globalSeo: {
      ...existing.globalSeo,

      title:
        parsed.seoTitle,

      description:
        parsed.seoDescription,

      keywords:
        parseKeywords(
          parsed.seoKeywords,
        ),

      canonicalUrl:
        parsed.canonicalUrl,

      ogTitle:
        parsed.ogTitle,

      ogDescription:
        parsed.ogDescription,

      ogImage:
        parsed.ogImage,

      noIndex:
        parsed.noIndex,
    },

    theme: {
      ...existing.theme,

      primaryColor:
        parsed.primaryColor,

      secondaryColor:
        parsed.secondaryColor,

      accentColor:
        parsed.accentColor,

      backgroundColor:
        parsed.backgroundColor,

      textColor:
        parsed.textColor,

      headingFont:
        parsed.headingFont,

      bodyFont:
        parsed.bodyFont,

      buttonStyle:
        parsed.buttonStyle,

      radiusScale:
        parsed.radiusScale,

      containerWidth:
        parsed.containerWidth,
    },

    updatedAt:
      now,
  });
}