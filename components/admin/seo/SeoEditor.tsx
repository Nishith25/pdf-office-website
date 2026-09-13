"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import {
  saveSeoAction,
} from "../../../app/admin/(protected)/seo/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import type {
  SeoEditorInput,
} from "../../../lib/admin/seo-editor";

import AdminField from "../forms/AdminField";
import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";
import AdminTextarea from "../forms/AdminTextarea";
import MediaPickerField from "../media/MediaPickerField";

type SeoEditorProps = {
  initialValue: SeoEditorInput;
};

export default function SeoEditor({
  initialValue,
}: SeoEditorProps) {
  const [
    value,
    setValue,
  ] =
    useState<SeoEditorInput>(
      initialValue,
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveSeoAction,
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

      {/* Search metadata */}
      <section className="rounded-[16px] border border-[#E2E4E8] bg-white">
        <div className="flex items-start gap-3 border-b border-[#ECEEF1] px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F0F3FF]">
            <Search className="h-4 w-4 text-[#3157E7]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#222631]">
              Search metadata
            </h2>

            <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
              Control how the homepage is described to search engines
              and social platforms.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <AdminField
            label="SEO title"
            hint={`${value.title.length}/70`}
            name="title"
            value={
              value.title
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  title:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <AdminTextarea
            label="Meta description"
            hint={`${value.description.length}/180`}
            name="description"
            value={
              value.description
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  description:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <AdminTextarea
            label="Keywords"
            hint="Separate with commas"
            name="keywordsText"
            value={
              value.keywordsText
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  keywordsText:
                    event
                      .target
                      .value,
                }),
              )
            }
          />
        </div>
      </section>

      {/* Social sharing */}
      <section className="rounded-[16px] border border-[#E2E4E8] bg-white p-5">
        <h2 className="text-sm font-semibold text-[#222631]">
          Social sharing
        </h2>

        <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
          Open Graph information used when the website is shared.
        </p>

        <div className="mt-5 space-y-5">
          <AdminField
            label="Social title"
            name="ogTitle"
            value={
              value.ogTitle
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  ogTitle:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <AdminTextarea
            label="Social description"
            name="ogDescription"
            value={
              value.ogDescription
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  ogDescription:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <MediaPickerField
            label="Social image"
            hint="Used when the website is shared"
            name="ogImage"
            value={
              value.ogImage ??
              ""
            }
            onChange={(
              ogImage,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,
                  ogImage,
                }),
              )
            }
          />

          <AdminField
            label="Canonical URL"
            name="canonicalUrl"
            value={
              value.canonicalUrl ??
              ""
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  canonicalUrl:
                    event
                      .target
                      .value,
                }),
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