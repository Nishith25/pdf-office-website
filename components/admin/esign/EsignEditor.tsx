"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  saveEsignAction,
} from "../../../app/admin/(protected)/esign/actions";

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

type Props = {
  initialMediaId: string;
  initialMediaUrl: string;
  initialSteps: string[];
};

export default function EsignEditor({
  initialMediaId,
  initialMediaUrl,
  initialSteps,
}: Props) {
  const [
    mediaId,
    setMediaId,
  ] = useState(
    initialMediaId,
  );

  const [
    mediaUrl,
    setMediaUrl,
  ] = useState(
    initialMediaUrl,
  );

  const [
    steps,
    setSteps,
  ] = useState(
    initialSteps.join(
      "\n",
    ),
  );

  const [
    result,
    formAction,
    saving,
  ] = useActionState(
    saveEsignAction,
    null,
  );

  const notice =
    formatAdminActionResult(
      result,
    );

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify({
          mediaId,

          steps:
            parseEditorLines(
              steps,
            ),
        })}
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

      <section className="space-y-5 rounded-[16px] border border-[#E2E4E8] bg-white p-5">
        <MediaPickerField
          label="eSign image"
          value={
            mediaUrl
          }
          onChange={(
            url,
            item,
          ) => {
            setMediaUrl(
              url,
            );

            setMediaId(
              item?.id ??
                "",
            );
          }}
        />

        <AdminTextarea
          label="Signing workflow"
          hint="One step per line"
          value={
            steps
          }
          onChange={(
            event,
          ) =>
            setSteps(
              event.target
                .value,
            )
          }
        />
      </section>

      <AdminSaveBar
        saving={
          saving
        }
      />
    </form>
  );
}