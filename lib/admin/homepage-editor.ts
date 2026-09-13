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
      .min(1)
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
      .min(1)
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
      key: "hero",

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
      key: "download",

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