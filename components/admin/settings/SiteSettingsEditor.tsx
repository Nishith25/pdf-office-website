"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  Settings,
} from "lucide-react";

import {
  saveSiteSettingsAction,
} from "../../../app/admin/(protected)/settings/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import type {
  SiteSettings,
} from "../../../lib/cms/types";

import AdminField from "../forms/AdminField";
import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";
import AdminTextarea from "../forms/AdminTextarea";
import MediaPickerField from "../media/MediaPickerField";

type SiteSettingsEditorProps = {
  initialValue:
    SiteSettings;
};

export default function SiteSettingsEditor({
  initialValue,
}: SiteSettingsEditorProps) {
  const [
    value,
    setValue,
  ] =
    useState(
      initialValue,
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveSiteSettingsAction,
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
    >
      {notice && (
        <div className="mb-5">
          <AdminNotice
            tone={
              notice.tone
            }
            message={
              notice.message
            }
          />
        </div>
      )}

      <section className="rounded-[16px] border border-[#E2E4E8] bg-white">
        <div className="flex items-start gap-3 border-b border-[#ECEEF1] px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F0F3FF]">
            <Settings className="h-4 w-4 text-[#3157E7]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#222631]">
              Website identity
            </h2>

            <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
              Global brand, application and website links.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          <AdminField
            label="Brand name"
            name="brandName"
            value={
              value.brandName
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  brandName:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <AdminField
            label="Short name"
            name="shortName"
            value={
              value.shortName
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  shortName:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <div className="md:col-span-2">
            <AdminField
              label="Google Play URL"
              name="playStoreUrl"
              value={
                value.playStoreUrl
              }
              onChange={(
                event,
              ) =>
                setValue(
                  (
                    current,
                  ) => ({
                    ...current,

                    playStoreUrl:
                      event
                        .target
                        .value,
                  }),
                )
              }
            />
          </div>

          <AdminField
            label="Website URL"
            name="siteUrl"
            value={
              value.siteUrl
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  siteUrl:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <MediaPickerField
  label="App icon"
  hint="Select from Media Library"
  name="appIconUrl"
  value={
    value.appIconUrl
  }
  onChange={(
    appIconUrl,
  ) =>
    setValue(
      (
        current,
      ) => ({
        ...current,
        appIconUrl,
      }),
    )
  }
/>

          <div className="md:col-span-2">
            <AdminTextarea
              label="Footer text"
              name="footerText"
              value={
                value.footerText
              }
              onChange={(
                event,
              ) =>
                setValue(
                  (
                    current,
                  ) => ({
                    ...current,

                    footerText:
                      event
                        .target
                        .value,
                  }),
                )
              }
            />
          </div>

          <AdminField
            label="Privacy policy URL"
            name="privacyUrl"
            value={
              value.privacyUrl
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  privacyUrl:
                    event
                      .target
                      .value,
                }),
              )
            }
          />

          <AdminField
            label="Terms URL"
            name="termsUrl"
            value={
              value.termsUrl
            }
            onChange={(
              event,
            ) =>
              setValue(
                (
                  current,
                ) => ({
                  ...current,

                  termsUrl:
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