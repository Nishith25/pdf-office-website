import type {
  SiteData,
} from "../../data/site";

import {
  faqSchema,
  sitePageSchema,
  siteSectionSchema,
  siteSettingsSchema,
  toolSchema,
} from "./schemas";

export function mapLegacyHomepageToCms(
  legacy: SiteData,
) {
  const siteUrl =
    "https://pdf-office-website.vercel.app";

  const page =
    sitePageSchema.parse({
      slug: "home",

      seo: {
        title:
          legacy.brand.name,

        description:
          legacy.hero.description,

        keywords: [
          "PDF Office",
          "PDF scanner",
          "document scanner",
          "OCR",
          "PDF tools",
          "eSign",
        ],

        ogTitle:
          legacy.brand.name,

        ogDescription:
          legacy.hero.description,

        ogImage: "",

        canonicalUrl:
          siteUrl,
      },
    });

  const settings =
    siteSettingsSchema.parse({
      brandName:
        legacy.brand.name,

      shortName:
        legacy.brand.shortName,

      playStoreUrl:
        legacy.hero.playStoreUrl,

      siteUrl,

      appIconUrl: "",

      footerText:
        "Scan · Convert · Sign · Organize",

      privacyUrl: "",

      termsUrl: "",
    });

  const sections = [
    siteSectionSchema.parse({
      key: "hero",

      eyebrow:
        legacy.hero.eyebrow,

      title:
        legacy.hero.titleTop,

      description:
        legacy.hero.description,

      visible: true,

      order: 1,

      mediaId: "",

      data: {
        titleTop:
          legacy.hero.titleTop,

        titleBottom:
          legacy.hero.titleBottom,

        primaryCta:
          legacy.hero.primaryCta,

        secondaryCta:
          legacy.hero.secondaryCta,

        playStoreUrl:
          legacy.hero.playStoreUrl,

        stats:
          legacy.stats,
      },
    }),

    siteSectionSchema.parse({
      key:
        "scanWorkflow",

      eyebrow:
        legacy.onboarding.eyebrow,

      title:
        legacy.onboarding.title,

      description:
        legacy.onboarding.description,

      visible: true,

      order: 2,

      mediaId: "",

      data: {
        items:
          legacy.onboarding.items,
      },
    }),

    siteSectionSchema.parse({
      key: "ocr",

      eyebrow:
        "Scanner & OCR",

      title:
        "Turn paper into something useful.",

      description:
        "Capture documents, improve scans and extract reusable text directly from your phone.",

      visible: true,

      order: 3,

      mediaId: "",

      data: {
        features: [
          "Camera OCR",
          "Gallery OCR",
          "Extract text",
          "Copy and reuse text",
        ],
      },
    }),

    siteSectionSchema.parse({
      key:
        "convertOrganize",

      eyebrow:
        "Convert & Organize",

      title:
        "Your document workspace, organized.",

      description:
        "Convert everyday files into PDFs and keep important documents easier to find.",

      visible: true,

      order: 4,

      mediaId: "",

      data: {
        categories: [
          "All Docs",
          "Business Card",
          "ID Card",
          "Academic",
          "Personal",
        ],
      },
    }),

    siteSectionSchema.parse({
      key: "esign",

      eyebrow:
        "eSign",

      title:
        "Sign PDFs without printing them.",

      description:
        "Add digital signatures directly from your phone and keep document workflows completely digital.",

      visible: true,

      order: 5,

      mediaId: "",

      data: {
        steps: [
          "Open document",
          "Add signature",
          "Save & share",
        ],
      },
    }),

    siteSectionSchema.parse({
      key: "download",

      eyebrow:
        "Ready when you are",

      title:
        "Your document toolkit, always with you.",

      description:
        "Scan, OCR, convert, sign and organize documents from one mobile app.",

      visible: true,

      order: 6,

      mediaId: "",

      data: {
        cta:
          "Get it on Google Play",

        playStoreUrl:
          legacy.hero.playStoreUrl,
      },
    }),
  ];

  const tools =
    legacy.tools.items.map(
      (
        item,
        index,
      ) =>
        toolSchema.parse({
          name:
            item.name,

          type:
            item.type,

          description: "",

          visible: true,

          featured: false,

          order:
            index + 1,
        }),
    );

  const faqs =
    legacy.faq.items.map(
      (
        item,
        index,
      ) =>
        faqSchema.parse({
          question:
            item.question,

          answer:
            item.answer,

          visible: true,

          order:
            index + 1,
        }),
    );

  return {
    page,
    settings,
    sections,
    tools,
    faqs,
  };
}