import {
  cmsPageSchema,
  cmsSettingsSchema,
} from "../core/schemas";

import {
  createDefaultCmsSettings,
} from "../core/settings";

import {
  createCmsStructuredBlockDefault,
} from "../core/structured-block-defaults";

import type {
  SiteConfig,
} from "../../site/config";

export function createCmsBootstrapSeed(
  site:
    SiteConfig,

  now:
    Date,
) {
  const defaults =
    createDefaultCmsSettings();

  const homepage =
    cmsPageSchema.parse({
      title:
        "Home",

      slug:
        "home",

      status:
        "published",

      isHomepage:
        true,

      seo: {
        title:
          site.name,

        description:
          site.tagline,

        keywords:
          [],

        canonicalUrl:
          site.siteUrl,

        ogTitle:
          site.name,

        ogDescription:
          site.tagline,

        ogImage:
          "",

        noIndex:
          false,
      },

      createdAt:
        now,

      updatedAt:
        now,

      publishedAt:
        now,
    });

  const heroDefault =
    createCmsStructuredBlockDefault(
      "hero",
    );

  const heroData = {
    ...heroDefault,

    eyebrow:
      site.shortName,

    title:
      site.name,

    description:
      site.tagline,
  };

  const settings =
    cmsSettingsSchema.parse({
      ...defaults,

      identity: {
        ...defaults.identity,

        siteName:
          site.name,

        shortName:
          site.shortName,

        tagline:
          site.tagline,

        siteUrl:
          site.siteUrl,
      },

      globalSeo: {
        ...defaults.globalSeo,

        title:
          site.name,

        description:
          site.tagline,

        canonicalUrl:
          site.siteUrl,

        ogTitle:
          site.name,

        ogDescription:
          site.tagline,
      },

      updatedAt:
        now,
    });

  return {
    homepage,
    heroData,
    settings,
  };
}
