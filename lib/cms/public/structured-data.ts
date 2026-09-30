import type {
  CmsPage,
  CmsSettings,
} from "../core/types";

import {
  getSiteConfig,
} from "../../site/config";

export function buildHomepageStructuredData(
  page:
    CmsPage,

  settings:
    CmsSettings,
) {
  const site =
    getSiteConfig();

  const baseUrl =
    site.siteUrl.replace(
      /\/+$/,
      "",
    );

  const canonicalUrl =
    page.seo
      .canonicalUrl ||
    settings.globalSeo
      .canonicalUrl ||
    baseUrl;

  const description =
    page.seo
      .description ||
    settings.globalSeo
      .description ||
    site.tagline;

  const siteName =
    settings.identity
      .siteName ||
    site.name;

  return {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "WebSite",

        "@id":
          `${baseUrl}/#website`,

        url:
          baseUrl,

        name:
          siteName,

        description,

        inLanguage:
          "en",
      },

      {
        "@type":
          "WebPage",

        "@id":
          `${canonicalUrl}#webpage`,

        url:
          canonicalUrl,

        name:
          page.seo
            .title ||
          page.title,

        description,

        isPartOf: {
          "@id":
            `${baseUrl}/#website`,
        },

        inLanguage:
          "en",
      },
    ],
  };
}

export function serializeStructuredData(
  value:
    unknown,
): string {
  return JSON
    .stringify(
      value,
    )
    .replace(
      /</g,
      "\\u003c",
    );
}
