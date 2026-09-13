import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildHomepageSectionUpdates,
  homepageEditorSchema,
} from "../lib/admin/homepage-editor";

import type {
  SiteSection,
} from "../lib/cms/types";

const validInput = {
  hero: {
    eyebrow:
      "Scanner • OCR • PDF Tools • eSign",
    titleTop:
      "Scan. Edit. Sign.",
    titleBottom:
      "Everything PDF.",
    description:
      "Work with documents from one mobile app.",
    primaryCta:
      "Get it on Google Play",
    visible: true,
  },

  scanWorkflow: {
    eyebrow:
      "Document Scanner",
    title:
      "From paper to PDF.",
    description:
      "Scan, detect, enhance and save.",
    visible: true,
  },

  ocr: {
    eyebrow:
      "Scanner & OCR",
    title:
      "Turn paper into something useful.",
    description:
      "Extract reusable text from documents.",
    visible: true,
  },

  convertOrganize: {
    eyebrow:
      "Convert & Organize",
    title:
      "Your document workspace, organized.",
    description:
      "Convert files and keep documents organized.",
    visible: true,
  },

  esign: {
    eyebrow:
      "eSign",
    title:
      "Sign PDFs without printing them.",
    description:
      "Add digital signatures to PDF documents.",
    visible: true,
  },

  download: {
    eyebrow:
      "Ready when you are",
    title:
      "Your document toolkit, always with you.",
    description:
      "Get PDF Office on your Android device.",
    cta:
      "Get it on Google Play",
    visible: true,
  },
};

describe(
  "homepage editor",
  () => {
    it(
      "rejects an empty hero title",
      () => {
        const result =
          homepageEditorSchema.safeParse({
            ...validInput,

            hero: {
              ...validInput.hero,
              titleTop: "",
            },
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "builds six section updates and preserves existing section data",
      () => {
        const existingSections: SiteSection[] =
          [
            {
              key: "hero",

              eyebrow:
                "Old eyebrow",

              title:
                "Old title",

              description:
                "Old description",

              visible: true,

              order: 1,

              mediaId:
                "hero-image",

              data: {
                secondaryCta:
                  "Explore tools",

                stats: [
                  {
                    label:
                      "Documents",
                    value:
                      "100M+",
                  },
                ],
              },
            },
          ];

        const parsed =
          homepageEditorSchema.parse(
            validInput,
          );

        const updates =
          buildHomepageSectionUpdates(
            parsed,
            existingSections,
          );

        expect(
          updates,
        ).toHaveLength(6);

        expect(
          updates.map(
            (section) =>
              section.key,
          ),
        ).toEqual([
          "hero",
          "scanWorkflow",
          "ocr",
          "convertOrganize",
          "esign",
          "download",
        ]);

        const hero =
          updates.find(
            (section) =>
              section.key ===
              "hero",
          );

        expect(
          hero?.title,
        ).toBe(
          "Scan. Edit. Sign.",
        );

        expect(
          hero?.mediaId,
        ).toBe(
          "hero-image",
        );

        expect(
          hero?.data.secondaryCta,
        ).toBe(
          "Explore tools",
        );

        expect(
          hero?.data.stats,
        ).toEqual([
          {
            label:
              "Documents",
            value:
              "100M+",
          },
        ]);

        expect(
          hero?.data.titleBottom,
        ).toBe(
          "Everything PDF.",
        );
      },
    );
  },
);