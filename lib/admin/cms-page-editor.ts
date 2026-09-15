import {
  z,
} from "zod";

import {
  cmsPageSchema,
  cmsPageStatusSchema,
} from "../cms/core/schemas";

import {
  isReservedCmsSlug,
  normalizeCmsSlug,
} from "../cms/core/slug";

import type {
  CmsPage,
} from "../cms/core/types";

const optionalUrl =
  z
    .string()
    .trim()
    .url()
    .or(
      z.literal(""),
    );

export const cmsPageEditorInputSchema =
  z
    .object({
      title: z
        .string()
        .trim()
        .min(
          1,
          "Page title is required.",
        )
        .max(160),

      slug: z
        .string()
        .trim()
        .max(160),

      status:
        cmsPageStatusSchema,

      isHomepage:
        z.boolean(),

      seoTitle: z
        .string()
        .trim()
        .max(70),

      seoDescription:
        z
          .string()
          .trim()
          .max(180),

      seoKeywords: z
        .string()
        .max(2000),

      canonicalUrl:
        optionalUrl,

      ogTitle: z
        .string()
        .trim()
        .max(100),

      ogDescription:
        z
          .string()
          .trim()
          .max(200),

      ogImage:
        optionalUrl,

      noIndex:
        z.boolean(),
    })
    .superRefine(
      (
        value,
        context,
      ) => {
        const candidate =
          normalizeCmsSlug(
            value.slug ||
              value.title,
          );

        if (
          !candidate
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "slug",
            ],

            message:
              "A valid page slug is required.",
          });

          return;
        }

        if (
          isReservedCmsSlug(
            candidate,
          )
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "slug",
            ],

            message:
              "This page slug is reserved.",
          });
        }
      },
    );

export type CmsPageEditorInput =
  z.infer<
    typeof cmsPageEditorInputSchema
  >;

export function parseCmsKeywords(
  value:
    string,
): string[] {
  const result:
    string[] = [];

  const seen =
    new Set<
      string
    >();

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

    const key =
      keyword.toLocaleLowerCase();

    if (
      seen.has(
        key,
      )
    ) {
      continue;
    }

    seen.add(
      key,
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

export function buildCmsPageFromEditor(
  input:
    CmsPageEditorInput,

  existing:
    CmsPage | null =
      null,

  now =
    new Date(),
): CmsPage {
  const parsed =
    cmsPageEditorInputSchema.parse(
      input,
    );

  const slug =
    normalizeCmsSlug(
      parsed.slug ||
        parsed.title,
    );

  const isPublishing =
    parsed.status ===
    "published";

  const publishedAt =
    isPublishing
      ? existing
          ?.publishedAt ??
        now
      : null;

  return cmsPageSchema.parse({
    title:
      parsed.title,

    slug,

    status:
      parsed.status,

    isHomepage:
      parsed.isHomepage,

    seo: {
      title:
        parsed.seoTitle,

      description:
        parsed.seoDescription,

      keywords:
        parseCmsKeywords(
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

    createdAt:
      existing
        ?.createdAt ??
      now,

    updatedAt:
      now,

    publishedAt,
  });
}