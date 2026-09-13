"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  saveOrganizeAction,
} from "../../../app/admin/(protected)/organize/actions";

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
  initialMediaId:
    string;

  initialMediaUrl:
    string;

  initialCategories:
    string[];
};

export default function OrganizeEditor({
  initialMediaId,
  initialMediaUrl,
  initialCategories,
}: Props) {
  const [
    mediaId,
    setMediaId,
  ] =
    useState(
      initialMediaId,
    );

  const [
    mediaUrl,
    setMediaUrl,
  ] =
    useState(
      initialMediaUrl,
    );

  const [
    categories,
    setCategories,
  ] =
    useState(
      initialCategories.join(
        "\n",
      ),
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveOrganizeAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

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
        value={JSON.stringify({
          mediaId,

          categories:
            parseEditorLines(
              categories,
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
          label="Workspace image"
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
          label="Document categories"
          hint="One category per line"
          value={
            categories
          }
          onChange={(
            event,
          ) =>
            setCategories(
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