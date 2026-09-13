import {
  z,
} from "zod";

import {
  siteSectionSchema,
} from "../cms/schemas";

import type {
  SiteSection,
} from "../cms/types";

const standardSectionSchema =
  z.object({
    eyebrow: z
      .string()
      .max(100),

    title: z
      .string()
      .min(
        1,
        "Title is required",
      )
      .max(160),

    description: z
      .string()
      .max(600),

    visible:
      z.boolean(),
  });

const heroEditorSchema =
  z.object({
    eyebrow: z
      .string()
      .max(100),

    titleTop: z
      .string()
      .min(
        1,
        "Hero title is required",
      )
      .max(160),

    titleBottom: z
      .string()
      .min(
        1,
        "Hero secondary title is required",
      )
      .max(160),

    description: z
      .string()
      .max(600),

    primaryCta: z
      .string()
      .min(
        1,
        "CTA text is required",
      )
      .max(100),

    visible:
      z.boolean(),
  });

const downloadEditorSchema =
  z.object({
    eyebrow: z
      .string()
      .max(100),

    title: z
      .string()
      .min(
        1,
        "Download title is required",
      )
      .max(160),

    description: z
      .string()
      .max(600),

    cta: z
      .string()
      .min(
        1,
        "CTA text is required",
      )
      .max(100),

    visible:
      z.boolean(),
  });

export const homepageEditorSchema =
  z.object({
    hero:
      heroEditorSchema,

    scanWorkflow:
      standardSectionSchema,

    ocr:
      standardSectionSchema,

    convertOrganize:
      standardSectionSchema,

    esign:
      standardSectionSchema,

    download:
      downloadEditorSchema,
  });

export type HomepageEditorInput =
  z.infer<
    typeof homepageEditorSchema
  >;

const sectionOrder = {
  hero: 1,
  scanWorkflow: 2,
  ocr: 3,
  convertOrganize: 4,
  esign: 5,
  download: 6,
} as const;

const defaults: HomepageEditorInput = {
  hero: {
    eyebrow:
      "Scanner • OCR • PDF Tools • eSign",

    titleTop:
      "Scan. Edit. Sign.",

    titleBottom:
      "Everything PDF.",

    description:
      "Scan documents, extract text, work with PDFs, add signatures and keep important files organized from one mobile app.",

    primaryCta:
      "Get it on Google Play",

    visible: true,
  },

  scanWorkflow: {
    eyebrow:
      "Document Scanner",

    title:
      "From paper to polished PDF.",

    description:
      "Capture documents, detect page edges, improve readability and save clean multi-page PDFs.",

    visible: true,
  },

  ocr: {
    eyebrow:
      "Scanner & OCR",

    title:
      "Turn paper into something useful.",

    description:
      "Extract reusable text from scanned documents and images directly from your phone.",

    visible: true,
  },

  convertOrganize: {
    eyebrow:
      "Convert & Organize",

    title:
      "Your document workspace, organized.",

    description:
      "Convert everyday files into PDFs and keep important documents easier to search and manage.",

    visible: true,
  },

  esign: {
    eyebrow:
      "eSign",

    title:
      "Sign PDFs without printing them.",

    description:
      "Add signatures directly to documents and keep your workflow digital from start to finish.",

    visible: true,
  },

  download: {
    eyebrow:
      "Ready when you are",

    title:
      "Your document toolkit, always with you.",

    description:
      "Scan, OCR, convert, sign and organize documents with PDF Office.",

    cta:
      "Get it on Google Play",

    visible: true,
  },
};

function findExistingSection(
  sections:
    readonly SiteSection[],
  key: string,
): SiteSection | undefined {
  return sections.find(
    (section) =>
      section.key === key,
  );
}

function readDataString(
  section:
    SiteSection | undefined,

  key: string,

  fallback: string,
): string {
  const value =
    section?.data?.[
      key
    ];

  return typeof value ===
    "string"
    ? value
    : fallback;
}

export function createHomepageEditorState(
  sections:
    readonly SiteSection[],
): HomepageEditorInput {
  const hero =
    findExistingSection(
      sections,
      "hero",
    );

  const scanWorkflow =
    findExistingSection(
      sections,
      "scanWorkflow",
    );

  const ocr =
    findExistingSection(
      sections,
      "ocr",
    );

  const convertOrganize =
    findExistingSection(
      sections,
      "convertOrganize",
    );

  const esign =
    findExistingSection(
      sections,
      "esign",
    );

  const download =
    findExistingSection(
      sections,
      "download",
    );

  return homepageEditorSchema.parse({
    hero: {
      eyebrow:
        hero?.eyebrow ??
        defaults.hero.eyebrow,

      titleTop:
        readDataString(
          hero,
          "titleTop",
          hero?.title ??
            defaults.hero.titleTop,
        ),

      titleBottom:
        readDataString(
          hero,
          "titleBottom",
          defaults.hero.titleBottom,
        ),

      description:
        hero?.description ??
        defaults.hero.description,

      primaryCta:
        readDataString(
          hero,
          "primaryCta",
          defaults.hero.primaryCta,
        ),

      visible:
        hero?.visible ??
        defaults.hero.visible,
    },

    scanWorkflow: {
      eyebrow:
        scanWorkflow?.eyebrow ??
        defaults.scanWorkflow.eyebrow,

      title:
        scanWorkflow?.title ??
        defaults.scanWorkflow.title,

      description:
        scanWorkflow?.description ??
        defaults.scanWorkflow.description,

      visible:
        scanWorkflow?.visible ??
        defaults.scanWorkflow.visible,
    },

    ocr: {
      eyebrow:
        ocr?.eyebrow ??
        defaults.ocr.eyebrow,

      title:
        ocr?.title ??
        defaults.ocr.title,

      description:
        ocr?.description ??
        defaults.ocr.description,

      visible:
        ocr?.visible ??
        defaults.ocr.visible,
    },

    convertOrganize: {
      eyebrow:
        convertOrganize?.eyebrow ??
        defaults.convertOrganize.eyebrow,

      title:
        convertOrganize?.title ??
        defaults.convertOrganize.title,

      description:
        convertOrganize?.description ??
        defaults.convertOrganize.description,

      visible:
        convertOrganize?.visible ??
        defaults.convertOrganize.visible,
    },

    esign: {
      eyebrow:
        esign?.eyebrow ??
        defaults.esign.eyebrow,

      title:
        esign?.title ??
        defaults.esign.title,

      description:
        esign?.description ??
        defaults.esign.description,

      visible:
        esign?.visible ??
        defaults.esign.visible,
    },

    download: {
      eyebrow:
        download?.eyebrow ??
        defaults.download.eyebrow,

      title:
        download?.title ??
        defaults.download.title,

      description:
        download?.description ??
        defaults.download.description,

      cta:
        readDataString(
          download,
          "cta",
          defaults.download.cta,
        ),

      visible:
        download?.visible ??
        defaults.download.visible,
    },
  });
}

function buildStandardSection(
  key:
    | "scanWorkflow"
    | "ocr"
    | "convertOrganize"
    | "esign",

  input: {
    eyebrow: string;
    title: string;
    description: string;
    visible: boolean;
  },

  existingSections:
    readonly SiteSection[],
): SiteSection {
  const existing =
    findExistingSection(
      existingSections,
      key,
    );

  return siteSectionSchema.parse({
    key,

    eyebrow:
      input.eyebrow,

    title:
      input.title,

    description:
      input.description,

    visible:
      input.visible,

    order:
      existing?.order ??
      sectionOrder[key],

    mediaId:
      existing?.mediaId ??
      "",

    data: {
      ...(
        existing?.data ??
        {}
      ),
    },
  });
}

export function buildHomepageSectionUpdates(
  input: HomepageEditorInput,

  existingSections:
    readonly SiteSection[],
): SiteSection[] {
  const existingHero =
    findExistingSection(
      existingSections,
      "hero",
    );

  const hero =
    siteSectionSchema.parse({
      key:
        "hero",

      eyebrow:
        input.hero.eyebrow,

      title:
        input.hero.titleTop,

      description:
        input.hero.description,

      visible:
        input.hero.visible,

      order:
        existingHero?.order ??
        sectionOrder.hero,

      mediaId:
        existingHero?.mediaId ??
        "",

      data: {
        ...(
          existingHero?.data ??
          {}
        ),

        titleTop:
          input.hero.titleTop,

        titleBottom:
          input.hero.titleBottom,

        primaryCta:
          input.hero.primaryCta,
      },
    });

  const scanWorkflow =
    buildStandardSection(
      "scanWorkflow",
      input.scanWorkflow,
      existingSections,
    );

  const ocr =
    buildStandardSection(
      "ocr",
      input.ocr,
      existingSections,
    );

  const convertOrganize =
    buildStandardSection(
      "convertOrganize",
      input.convertOrganize,
      existingSections,
    );

  const esign =
    buildStandardSection(
      "esign",
      input.esign,
      existingSections,
    );

  const existingDownload =
    findExistingSection(
      existingSections,
      "download",
    );

  const download =
    siteSectionSchema.parse({
      key:
        "download",

      eyebrow:
        input.download.eyebrow,

      title:
        input.download.title,

      description:
        input.download.description,

      visible:
        input.download.visible,

      order:
        existingDownload?.order ??
        sectionOrder.download,

      mediaId:
        existingDownload?.mediaId ??
        "",

      data: {
        ...(
          existingDownload?.data ??
          {}
        ),

        cta:
          input.download.cta,
      },
    });

  return [
    hero,
    scanWorkflow,
    ocr,
    convertOrganize,
    esign,
    download,
  ];
}