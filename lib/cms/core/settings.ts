import {
  cmsSettingsSchema,
} from "./schemas";

import type {
  CmsSettings,
} from "./types";

export function createDefaultCmsSettings(): CmsSettings {
  return cmsSettingsSchema.parse({
    key:
      "global",

    identity: {
      siteName:
        "Website",

      shortName:
        "Website",

      tagline:
        "",

      logoUrl:
        "",

      faviconUrl:
        "",

      siteUrl:
        "",
    },

    contact: {
      email:
        "",

      phone:
        "",

      address:
        "",
    },

    social: {
      instagram:
        "",

      facebook:
        "",

      linkedin:
        "",

      youtube:
        "",

      x:
        "",
    },

    externalLinks: {
      primaryCtaLabel:
        "",

      primaryCtaUrl:
        "",

      googlePlayUrl:
        "",

      appStoreUrl:
        "",
    },

    footer: {
      text:
        "",

      copyright:
        "",

      privacyPageId:
        "",

      termsPageId:
        "",

      headerMenuId:
        "",

      footerMenuId:
        "",
    },

    globalSeo: {
      title:
        "",

      description:
        "",

      keywords:
        [],

      canonicalUrl:
        "",

      ogTitle:
        "",

      ogDescription:
        "",

      ogImage:
        "",

      noIndex:
        false,
    },

    theme: {
      primaryColor:
        "#2563EB",

      secondaryColor:
        "#111827",

      accentColor:
        "#F97316",

      backgroundColor:
        "#FFFFFF",

      textColor:
        "#111827",

      headingFont:
        "sans",

      bodyFont:
        "sans",

      buttonStyle:
        "rounded",

      radiusScale:
        "medium",

      containerWidth:
        "standard",
    },

    updatedAt:
      new Date(),
  });
}