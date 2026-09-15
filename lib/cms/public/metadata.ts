import type {
  CmsPage,
  CmsSettings,
} from "../core/types";

export type CmsPublicMetadata = {
  title:
    string;

  description:
    string;

  keywords:
    string[];

  canonicalUrl:
    string;

  ogTitle:
    string;

  ogDescription:
    string;

  ogImage:
    string;

  noIndex:
    boolean;
};

function preferredText(
  primary:
    string,

  fallback:
    string,

  finalFallback =
    "",
): string {
  const primaryValue =
    primary.trim();

  if (
    primaryValue
  ) {
    return primaryValue;
  }

  const fallbackValue =
    fallback.trim();

  if (
    fallbackValue
  ) {
    return fallbackValue;
  }

  return finalFallback.trim();
}

export function buildCmsPublicMetadata(
  page:
    CmsPage,

  settings:
    CmsSettings,
): CmsPublicMetadata {
  const title =
    preferredText(
      page.seo.title,

      settings.globalSeo
        .title,

      page.title,
    );

  const description =
    preferredText(
      page.seo
        .description,

      settings.globalSeo
        .description,
    );

  const keywords =
    page.seo.keywords
      .length >
    0
      ? [
          ...page.seo
            .keywords,
        ]
      : [
          ...settings
            .globalSeo
            .keywords,
        ];

  const canonicalUrl =
    preferredText(
      page.seo
        .canonicalUrl,

      settings.globalSeo
        .canonicalUrl,
    );

  const ogTitle =
    preferredText(
      page.seo
        .ogTitle,

      settings.globalSeo
        .ogTitle,

      title,
    );

  const ogDescription =
    preferredText(
      page.seo
        .ogDescription,

      settings.globalSeo
        .ogDescription,

      description,
    );

  const ogImage =
    preferredText(
      page.seo
        .ogImage,

      settings.globalSeo
        .ogImage,
    );

  return {
    title,

    description,

    keywords,

    canonicalUrl,

    ogTitle,

    ogDescription,

    ogImage,

    noIndex:
      page.seo
        .noIndex ||
      settings.globalSeo
        .noIndex,
  };
}