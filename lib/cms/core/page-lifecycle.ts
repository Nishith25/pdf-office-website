import {
  cmsPageSchema,
} from "./schemas";

import {
  normalizeCmsSlug,
} from "./slug";

import type {
  CmsPage,
} from "./types";

function emptySeo(): CmsPage["seo"] {
  return {
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
  };
}

export function createCmsPageDraft(
  input: {
    title:
      string;

    slug?:
      string;
  },

  now =
    new Date(),
): CmsPage {
  const title =
    input.title.trim();

  const requestedSlug =
    input.slug?.trim() ||
    title;

  return cmsPageSchema.parse({
    title,

    slug:
      normalizeCmsSlug(
        requestedSlug,
      ),

    status:
      "draft",

    isHomepage:
      false,

    seo:
      emptySeo(),

    createdAt:
      now,

    updatedAt:
      now,

    publishedAt:
      null,
  });
}

export function publishCmsPage(
  page:
    CmsPage,

  now =
    new Date(),
): CmsPage {
  return cmsPageSchema.parse({
    ...page,

    status:
      "published",

    updatedAt:
      now,

    publishedAt:
      page.publishedAt ??
      now,
  });
}

export function unpublishCmsPage(
  page:
    CmsPage,

  now =
    new Date(),
): CmsPage {
  return cmsPageSchema.parse({
    ...page,

    status:
      "draft",

    updatedAt:
      now,

    publishedAt:
      null,
  });
}

export function duplicateCmsPageDraft(
  source:
    CmsPage,

  duplicateSlug:
    string,

  now =
    new Date(),
): CmsPage {
  return cmsPageSchema.parse({
    title:
      `${source.title} (Copy)`,

    slug:
      normalizeCmsSlug(
        duplicateSlug,
      ),

    status:
      "draft",

    isHomepage:
      false,

    seo: {
      ...source.seo,

      keywords: [
        ...source.seo
          .keywords,
      ],
    },

    createdAt:
      now,

    updatedAt:
      now,

    publishedAt:
      null,
  });
}