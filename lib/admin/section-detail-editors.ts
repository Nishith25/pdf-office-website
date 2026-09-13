import {
  z,
} from "zod";

import {
  siteSectionSchema,
} from "../cms/schemas";

import type {
  SiteSection,
} from "../cms/types";

const mediaIdSchema =
  z
    .string()
    .max(120);

const lineArraySchema =
  z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(120),
    )
    .min(1)
    .max(20);

export const scannerDetailSchema =
  z.object({
    scanMediaId:
      mediaIdSchema,

    scanSteps:
      lineArraySchema,

    ocrMediaId:
      mediaIdSchema,

    ocrFeatures:
      lineArraySchema,
  });

export const organizeDetailSchema =
  z.object({
    mediaId:
      mediaIdSchema,

    categories:
      lineArraySchema,
  });

export const esignDetailSchema =
  z.object({
    mediaId:
      mediaIdSchema,

    steps:
      lineArraySchema,
  });

export type ScannerDetailInput =
  z.infer<
    typeof scannerDetailSchema
  >;

export type OrganizeDetailInput =
  z.infer<
    typeof organizeDetailSchema
  >;

export type EsignDetailInput =
  z.infer<
    typeof esignDetailSchema
  >;

export function parseEditorLines(
  value:
    string,
): string[] {
  return value
    .split("\n")
    .map(
      (line) =>
        line.trim(),
    )
    .filter(Boolean);
}

function findSection(
  sections:
    readonly SiteSection[],

  key:
    string,
): SiteSection | undefined {
  return sections.find(
    (section) =>
      section.key ===
      key,
  );
}

function sectionOrDefault(
  sections:
    readonly SiteSection[],

  key:
    | "scanWorkflow"
    | "ocr"
    | "convertOrganize"
    | "esign",
): SiteSection {
  const existing =
    findSection(
      sections,
      key,
    );

  if (existing) {
    return existing;
  }

  const defaults = {
    scanWorkflow: {
      eyebrow:
        "Document Scanner",

      title:
        "From paper to polished PDF.",

      description:
        "Capture documents, detect page edges, improve readability and save clean multi-page PDFs.",

      order: 2,
    },

    ocr: {
      eyebrow:
        "Scanner & OCR",

      title:
        "Turn paper into something useful.",

      description:
        "Extract reusable text from scanned documents and images.",

      order: 3,
    },

    convertOrganize: {
      eyebrow:
        "Convert & Organize",

      title:
        "Your document workspace, organized.",

      description:
        "Convert files into PDFs and keep important documents easier to manage.",

      order: 4,
    },

    esign: {
      eyebrow:
        "eSign",

      title:
        "Sign PDFs without printing them.",

      description:
        "Add signatures directly to PDF documents and keep workflows digital.",

      order: 5,
    },
  } as const;

  const fallback =
    defaults[
      key
    ];

  return siteSectionSchema.parse({
    key,

    eyebrow:
      fallback.eyebrow,

    title:
      fallback.title,

    description:
      fallback.description,

    visible: true,

    order:
      fallback.order,

    mediaId: "",

    data: {},
  });
}

export function buildScannerSectionUpdates(
  input:
    ScannerDetailInput,

  sections:
    readonly SiteSection[],
): SiteSection[] {
  const scan =
    sectionOrDefault(
      sections,
      "scanWorkflow",
    );

  const ocr =
    sectionOrDefault(
      sections,
      "ocr",
    );

  return [
    siteSectionSchema.parse({
      ...scan,

      mediaId:
        input.scanMediaId,

      data: {
        ...scan.data,

        steps:
          input.scanSteps,
      },
    }),

    siteSectionSchema.parse({
      ...ocr,

      mediaId:
        input.ocrMediaId,

      data: {
        ...ocr.data,

        features:
          input.ocrFeatures,
      },
    }),
  ];
}

export function buildOrganizeSectionUpdate(
  input:
    OrganizeDetailInput,

  sections:
    readonly SiteSection[],
): SiteSection {
  const existing =
    sectionOrDefault(
      sections,
      "convertOrganize",
    );

  return siteSectionSchema.parse({
    ...existing,

    mediaId:
      input.mediaId,

    data: {
      ...existing.data,

      categories:
        input.categories,
    },
  });
}

export function buildEsignSectionUpdate(
  input:
    EsignDetailInput,

  sections:
    readonly SiteSection[],
): SiteSection {
  const existing =
    sectionOrDefault(
      sections,
      "esign",
    );

  return siteSectionSchema.parse({
    ...existing,

    mediaId:
      input.mediaId,

    data: {
      ...existing.data,

      steps:
        input.steps,
    },
  });
}