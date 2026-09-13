import {
  ScanLine,
} from "lucide-react";

import ScannerEditor from "../../../../components/admin/scanner/ScannerEditor";

import {
  getMediaItems,
} from "../../../../lib/repositories/media";

import {
  getHomepageSections,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export default async function ScannerPage() {
  const [
    sections,
    media,
  ] =
    await Promise.all([
      getHomepageSections(),
      getMediaItems(
        250,
      ),
    ]);

  const scan =
    sections.find(
      (section) =>
        section.key ===
        "scanWorkflow",
    );

  const ocr =
    sections.find(
      (section) =>
        section.key ===
        "ocr",
    );

  const getMediaUrl = (
    id:
      string | undefined,
  ) =>
    media.find(
      (item) =>
        item.id === id,
    )?.url ??
    "";

  const scanSteps =
    Array.isArray(
      scan?.data.steps,
    )
      ? scan.data.steps.filter(
          (
            item,
          ): item is string =>
            typeof item ===
            "string",
        )
      : [
          "Capture",
          "Detect",
          "Enhance",
          "PDF",
        ];

  const ocrFeatures =
    Array.isArray(
      ocr?.data.features,
    )
      ? ocr.data.features.filter(
          (
            item,
          ): item is string =>
            typeof item ===
            "string",
        )
      : [
          "Camera OCR",
          "Gallery OCR",
          "Extract text",
          "Copy and reuse text",
        ];

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <ScanLine className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Scanner & OCR
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          Scanner details
        </h1>

        <p className="mt-2 text-sm text-[#747B88]">
          Manage workflow steps, OCR capabilities and product imagery.
        </p>
      </div>

      <ScannerEditor
        initialScanMediaId={
          scan?.mediaId ??
          ""
        }
        initialScanMediaUrl={
          getMediaUrl(
            scan?.mediaId,
          )
        }
        initialSteps={
          scanSteps
        }
        initialOcrMediaId={
          ocr?.mediaId ??
          ""
        }
        initialOcrMediaUrl={
          getMediaUrl(
            ocr?.mediaId,
          )
        }
        initialOcrFeatures={
          ocrFeatures
        }
      />
    </div>
  );
}