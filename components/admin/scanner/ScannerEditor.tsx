"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  ScanLine,
  Type,
} from "lucide-react";

import {
  saveScannerDetailsAction,
} from "../../../app/admin/(protected)/scanner/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import {
  parseEditorLines,
} from "../../../lib/admin/section-detail-editors";

import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";
import AdminTextarea from "../forms/AdminTextarea";
import MediaPickerField from "../media/MediaPickerField";

type ScannerEditorProps = {
  initialScanMediaId:
    string;

  initialScanMediaUrl:
    string;

  initialSteps:
    string[];

  initialOcrMediaId:
    string;

  initialOcrMediaUrl:
    string;

  initialOcrFeatures:
    string[];
};

export default function ScannerEditor({
  initialScanMediaId,
  initialScanMediaUrl,
  initialSteps,
  initialOcrMediaId,
  initialOcrMediaUrl,
  initialOcrFeatures,
}: ScannerEditorProps) {
  const [
    scanMediaId,
    setScanMediaId,
  ] =
    useState(
      initialScanMediaId,
    );

  const [
    scanMediaUrl,
    setScanMediaUrl,
  ] =
    useState(
      initialScanMediaUrl,
    );

  const [
    stepsText,
    setStepsText,
  ] =
    useState(
      initialSteps.join(
        "\n",
      ),
    );

  const [
    ocrMediaId,
    setOcrMediaId,
  ] =
    useState(
      initialOcrMediaId,
    );

  const [
    ocrMediaUrl,
    setOcrMediaUrl,
  ] =
    useState(
      initialOcrMediaUrl,
    );

  const [
    ocrText,
    setOcrText,
  ] =
    useState(
      initialOcrFeatures.join(
        "\n",
      ),
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveScannerDetailsAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

  const payload = {
    scanMediaId,

    scanSteps:
      parseEditorLines(
        stepsText,
      ),

    ocrMediaId,

    ocrFeatures:
      parseEditorLines(
        ocrText,
      ),
  };

  return (
    <form
      action={
        formAction
      }
      className="space-y-5"
    >
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify(
          payload,
        )}
      />

      {notice && (
        <AdminNotice
          tone={
            notice.tone
          }
          message={
            notice.message
          }
        />
      )}

      <section className="rounded-[16px] border border-[#E2E4E8] bg-white">
        <div className="flex items-center gap-3 border-b border-[#ECEEF1] px-5 py-4">
          <ScanLine className="h-4 w-4 text-[#3157E7]" />

          <div>
            <h2 className="text-sm font-semibold">
              Scanner workflow
            </h2>

            <p className="mt-1 text-[10px] text-[#8B919D]">
              One workflow step per line.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <MediaPickerField
            label="Scanner image"
            value={
              scanMediaUrl
            }
            onChange={(
              url,
              item,
            ) => {
              setScanMediaUrl(
                url,
              );

              setScanMediaId(
                item?.id ??
                  "",
              );
            }}
          />

          <AdminTextarea
            label="Workflow steps"
            hint="One item per line"
            value={
              stepsText
            }
            onChange={(
              event,
            ) =>
              setStepsText(
                event.target
                  .value,
              )
            }
          />
        </div>
      </section>

      <section className="rounded-[16px] border border-[#E2E4E8] bg-white">
        <div className="flex items-center gap-3 border-b border-[#ECEEF1] px-5 py-4">
          <Type className="h-4 w-4 text-[#8852AF]" />

          <div>
            <h2 className="text-sm font-semibold">
              OCR capabilities
            </h2>

            <p className="mt-1 text-[10px] text-[#8B919D]">
              One capability per line.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <MediaPickerField
            label="OCR image"
            value={
              ocrMediaUrl
            }
            onChange={(
              url,
              item,
            ) => {
              setOcrMediaUrl(
                url,
              );

              setOcrMediaId(
                item?.id ??
                  "",
              );
            }}
          />

          <AdminTextarea
            label="OCR capabilities"
            hint="One item per line"
            value={
              ocrText
            }
            onChange={(
              event,
            ) =>
              setOcrText(
                event.target
                  .value,
              )
            }
          />
        </div>
      </section>

      <AdminSaveBar
        saving={
          saving
        }
      />
    </form>
  );
}