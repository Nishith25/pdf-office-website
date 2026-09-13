import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildEsignSectionUpdate,
  buildOrganizeSectionUpdate,
  buildScannerSectionUpdates,
  parseEditorLines,
} from "../lib/admin/section-detail-editors";

import type {
  SiteSection,
} from "../lib/cms/types";

describe(
  "section detail editors",
  () => {
    it(
      "parses line-based editor content",
      () => {
        expect(
          parseEditorLines(
            "Capture\n Detect \n\nEnhance\nPDF",
          ),
        ).toEqual([
          "Capture",
          "Detect",
          "Enhance",
          "PDF",
        ]);
      },
    );

    it(
      "preserves scanner content while updating steps and media",
      () => {
        const sections: SiteSection[] =
          [
            {
              key:
                "scanWorkflow",

              eyebrow:
                "Document Scanner",

              title:
                "From paper to PDF.",

              description:
                "Scan documents.",

              visible: true,

              order: 2,

              mediaId:
                "old-media",

              data: {
                custom:
                  "preserve",
              },
            },

            {
              key:
                "ocr",

              eyebrow:
                "OCR",

              title:
                "Extract text.",

              description:
                "Reuse text.",

              visible: true,

              order: 3,

              mediaId: "",

              data: {},
            },
          ];

        const result =
          buildScannerSectionUpdates(
            {
              scanMediaId:
                "scan-image",

              scanSteps: [
                "Capture",
                "Detect",
                "Enhance",
                "PDF",
              ],

              ocrMediaId:
                "ocr-image",

              ocrFeatures: [
                "Camera OCR",
                "Gallery OCR",
                "Extract text",
              ],
            },

            sections,
          );

        expect(
          result,
        ).toHaveLength(2);

        expect(
          result[0]?.mediaId,
        ).toBe(
          "scan-image",
        );

        expect(
          result[0]?.data.custom,
        ).toBe(
          "preserve",
        );

        expect(
          result[0]?.data.steps,
        ).toEqual([
          "Capture",
          "Detect",
          "Enhance",
          "PDF",
        ]);

        expect(
          result[1]?.mediaId,
        ).toBe(
          "ocr-image",
        );
      },
    );

    it(
      "updates organize categories",
      () => {
        const section =
          buildOrganizeSectionUpdate(
            {
              mediaId:
                "workspace-image",

              categories: [
                "All Docs",
                "Business Card",
                "ID Card",
              ],
            },

            [],
          );

        expect(
          section.key,
        ).toBe(
          "convertOrganize",
        );

        expect(
          section.data.categories,
        ).toEqual([
          "All Docs",
          "Business Card",
          "ID Card",
        ]);
      },
    );

    it(
      "updates eSign workflow steps",
      () => {
        const section =
          buildEsignSectionUpdate(
            {
              mediaId:
                "esign-image",

              steps: [
                "Open document",
                "Add signature",
                "Save & share",
              ],
            },

            [],
          );

        expect(
          section.key,
        ).toBe(
          "esign",
        );

        expect(
          section.data.steps,
        ).toHaveLength(3);
      },
    );
  },
);