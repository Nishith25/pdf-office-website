import {
  Signature,
} from "lucide-react";

import EsignEditor from "../../../../components/admin/esign/EsignEditor";

import {
  getMediaItems,
} from "../../../../lib/repositories/media";

import {
  getSiteSectionByKey,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export default async function EsignPage() {
  const [
    section,
    media,
  ] =
    await Promise.all([
      getSiteSectionByKey(
        "esign",
      ),

      getMediaItems(
        250,
      ),
    ]);

  const mediaUrl =
    media.find(
      (item) =>
        item.id ===
        section?.mediaId,
    )?.url ??
    "";

  const steps =
    Array.isArray(
      section?.data.steps,
    )
      ? section.data.steps.filter(
          (
            item,
          ): item is string =>
            typeof item ===
            "string",
        )
      : [
          "Open document",
          "Add signature",
          "Save & share",
        ];

  return (
    <div className="mx-auto max-w-[950px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <Signature className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            eSign
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          Signing workflow
        </h1>

        <p className="mt-2 text-sm text-[#747B88]">
          Manage eSign workflow steps and product imagery.
        </p>
      </div>

      <EsignEditor
        initialMediaId={
          section?.mediaId ??
          ""
        }
        initialMediaUrl={
          mediaUrl
        }
        initialSteps={
          steps
        }
      />
    </div>
  );
}