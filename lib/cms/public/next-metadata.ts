import type {
  Metadata,
} from "next";

import type {
  CmsPage,
  CmsSettings,
} from "../core/types";

import {
  buildCmsPublicMetadata,
} from "./metadata";

export function buildNextCmsMetadata(
  page:
    CmsPage,

  settings:
    CmsSettings,
): Metadata {
  const seo =
    buildCmsPublicMetadata(
      page,
      settings,
    );

  const siteName =
    settings.identity
      .shortName ||
    settings.identity
      .siteName;

  const metadata:
    Metadata = {
    title: {
      absolute:
        seo.title,
    },

    description:
      seo.description ||
      undefined,

    keywords:
      seo.keywords.length >
      0
        ? seo.keywords
        : undefined,

    alternates:
      seo.canonicalUrl
        ? {
            canonical:
              seo.canonicalUrl,
          }
        : undefined,

    icons:
      settings.identity
        .faviconUrl
        ? {
            icon:
              settings.identity
                .faviconUrl,
          }
        : undefined,

    robots: {
      index:
        !seo.noIndex,

      follow:
        true,
    },

    openGraph: {
      type:
        "website",

      title:
        seo.ogTitle,

      description:
        seo.ogDescription ||
        undefined,

      siteName,

      ...(seo.canonicalUrl
        ? {
            url:
              seo.canonicalUrl,
          }
        : {}),

      ...(seo.ogImage
        ? {
            images: [
              {
                url:
                  seo.ogImage,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card:
        seo.ogImage
          ? "summary_large_image"
          : "summary",

      title:
        seo.ogTitle,

      description:
        seo.ogDescription ||
        undefined,

      ...(seo.ogImage
        ? {
            images: [
              seo.ogImage,
            ],
          }
        : {}),
    },
  };

  return metadata;
}