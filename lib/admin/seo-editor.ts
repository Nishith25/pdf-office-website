import {
  z,
} from "zod";

import {
  sitePageSchema,
} from "../cms/schemas";

import type {
  SitePage,
} from "../cms/types";

export const seoEditorSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        1,
        "SEO title is required",
      )
      .max(
        70,
        "Keep the title under 70 characters",
      ),

    description: z
      .string()
      .trim()
      .min(
        1,
        "SEO description is required",
      )
      .max(
        180,
        "Keep the description under 180 characters",
      ),

    keywordsText: z
      .string()
      .max(1500),

    ogTitle: z
      .string()
      .trim()
      .max(100),

    ogDescription: z
      .string()
      .trim()
      .max(200),

    ogImage: z
      .string()
      .trim()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),

    canonicalUrl: z
      .string()
      .trim()
      .url()
      .optional()
      .or(
        z.literal(""),
      ),
  });

export type SeoEditorInput =
  z.infer<
    typeof seoEditorSchema
  >;

export function parseSeoKeywords(
  value: string,
): string[] {
  const seen =
    new Set<
      string
    >();

  const result:
    string[] = [];

  for (
    const keyword of
    value
      .split(",")
      .map(
        (item) =>
          item.trim(),
      )
      .filter(Boolean)
  ) {
    const normalized =
      keyword.toLowerCase();

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

    if (
      result.length ===
      30
    ) {
      break;
    }
  }

  return result;
}

export function createSeoEditorState(
  page:
    SitePage | null,
): SeoEditorInput {
  const seo =
    page?.seo;

  return seoEditorSchema.parse({
    title:
      seo?.title ??
      "PDF Office – Doc Scanner",

    description:
      seo?.description ??
      "Scan documents, extract text, convert PDFs, add signatures and organize files with PDF Office.",

    keywordsText:
      seo?.keywords?.join(
        ", ",
      ) ??
      "PDF Office, PDF scanner, document scanner, OCR, PDF tools, eSign",

    ogTitle:
      seo?.ogTitle ??
      "PDF Office – Doc Scanner",

    ogDescription:
      seo?.ogDescription ??
      seo?.description ??
      "Mobile document scanning and PDF tools.",

    ogImage:
      seo?.ogImage ??
      "",

    canonicalUrl:
      seo?.canonicalUrl ??
      "https://pdf-office-website.vercel.app",
  });
}

export function buildHomePageFromSeo(
  input:
    SeoEditorInput,
): SitePage {
  return sitePageSchema.parse({
    slug: "home",

    seo: {
      title:
        input.title,

      description:
        input.description,

      keywords:
        parseSeoKeywords(
          input.keywordsText,
        ),

      ogTitle:
        input.ogTitle,

      ogDescription:
        input.ogDescription,

      ogImage:
        input.ogImage,

      canonicalUrl:
        input.canonicalUrl,
    },
  });
}