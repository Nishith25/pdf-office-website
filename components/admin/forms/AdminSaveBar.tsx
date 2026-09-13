"use client";

import {
  Eye,
  Save,
} from "lucide-react";

type AdminSaveBarProps = {
  saving?: boolean;

  onPreview?: () => void;

  previewDisabled?: boolean;
};

export default function AdminSaveBar({
  saving = false,
  onPreview,
  previewDisabled = false,
}: AdminSaveBarProps) {
  return (
    <div className="sticky bottom-4 z-20 mt-6 flex items-center justify-between gap-3 rounded-[14px] border border-[#DDE0E6] bg-white/95 p-3 shadow-[0_10px_35px_rgba(20,26,40,0.08)] backdrop-blur">
      <p className="hidden text-[9px] leading-4 text-[#9298A4] sm:block">
        Preview changes before saving them live.
      </p>

      <div className="ml-auto flex items-center gap-2">
        {onPreview && (
          <button
            type="button"
            disabled={
              previewDisabled ||
              saving
            }
            onClick={
              onPreview
            }
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-[#D9DCE2] bg-white px-4 text-[11px] font-semibold text-[#545B68] transition hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Eye className="h-3.5 w-3.5" />

            Preview
          </button>
        )}

        <button
          type="submit"
          disabled={
            saving
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[11px] font-semibold text-white transition hover:bg-[#284AC7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" />

          {saving
            ? "Saving..."
            : "Save changes"}
        </button>
      </div>
    </div>
  );
}