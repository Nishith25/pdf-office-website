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

function cloneCmsPage(
  page:
    CmsPage,
): CmsPage {
  return cmsPageSchema.parse({
    ...page,

    seo: {
      ...page.seo,

      keywords: [
        ...page.seo
          .keywords,
      ],
    },
  });
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

    seo: {
      ...page.seo,

      keywords: [
        ...page.seo
          .keywords,
      ],
    },

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

    seo: {
      ...page.seo,

      keywords: [
        ...page.seo
          .keywords,
      ],
    },

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

export function ensureCmsHomepageEligibility(
  page:
    CmsPage,

  requestedHomepage:
    boolean,

  now =
    new Date(),
): CmsPage {
  if (
    !requestedHomepage
  ) {
    return cloneCmsPage(
      page,
    );
  }

  if (
    page.status ===
    "published"
  ) {
    return cloneCmsPage(
      page,
    );
  }

  return publishCmsPage(
    page,
    now,
  );
}