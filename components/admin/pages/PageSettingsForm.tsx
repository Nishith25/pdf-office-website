"use client";

import {
  useState,
} from "react";

import {
  Save,
} from "lucide-react";

import MediaPickerField from "../media/MediaPickerField";

import {
  saveCmsPageAction,
} from "../../../app/admin/(protected)/pages/actions";

type Props = {
  page: {
    id:
      string;

    title:
      string;

    slug:
      string;

    status:
      "draft" |
      "published";

    isHomepage:
      boolean;

    seo: {
      title:
        string;

      description:
        string;

      keywords:
        string[];

      canonicalUrl:
        string;

      ogTitle:
        string;

      ogDescription:
        string;

      ogImage:
        string;

      noIndex:
        boolean;
    };
  };
};

const inputClass =
  "mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 text-sm outline-none focus:border-[#617CE4] focus:ring-4 focus:ring-[#3157E7]/[0.07]";

export default function PageSettingsForm({
  page,
}: Props) {
  const [
    ogImage,
    setOgImage,
  ] =
    useState(
      page.seo
        .ogImage,
    );

  return (
    <form
      action={
        saveCmsPageAction
      }
      className="space-y-5"
    >
      <input
        type="hidden"
        name="pageId"
        value={
          page.id
        }
      />

      <input
        type="hidden"
        name="status"
        value={
          page.status
        }
      />

      <input
        type="hidden"
        name="isHomepage"
        value={
          String(
            page.isHomepage,
          )
        }
      />

      <section className="rounded-[16px] border border-[#E1E4E9] bg-white p-5">
        <h2 className="text-sm font-bold">
          Page settings
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-[11px] font-semibold">
              Page title
            </span>

            <input
              name="title"
              defaultValue={
                page.title
              }
              className={
                inputClass
              }
              required
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Slug
            </span>

            <input
              name="slug"
              defaultValue={
                page.slug
              }
              className={
                inputClass
              }
              required
            />

            <span className="mt-1 block text-[9px] text-[#949AA5]">
              /{
                page.slug
              }
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-[16px] border border-[#E1E4E9] bg-white p-5">
        <h2 className="text-sm font-bold">
          SEO
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-[11px] font-semibold">
              SEO title
            </span>

            <input
              name="seoTitle"
              maxLength={
                70
              }
              defaultValue={
                page.seo
                  .title
              }
              className={
                inputClass
              }
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Canonical URL
            </span>

            <input
              name="canonicalUrl"
              defaultValue={
                page.seo
                  .canonicalUrl
              }
              className={
                inputClass
              }
            />
          </label>

          <label className="md:col-span-2">
            <span className="text-[11px] font-semibold">
              SEO description
            </span>

            <textarea
              name="seoDescription"
              maxLength={
                180
              }
              defaultValue={
                page.seo
                  .description
              }
              rows={
                4
              }
              className="mt-2 w-full rounded-[10px] border border-[#DDE0E6] p-3 text-sm outline-none"
            />
          </label>

          <label className="md:col-span-2">
            <span className="text-[11px] font-semibold">
              Keywords
            </span>

            <textarea
              name="seoKeywords"
              defaultValue={
                page.seo
                  .keywords
                  .join(
                    ", ",
                  )
              }
              rows={
                3
              }
              className="mt-2 w-full rounded-[10px] border border-[#DDE0E6] p-3 text-sm outline-none"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Open Graph title
            </span>

            <input
              name="ogTitle"
              defaultValue={
                page.seo
                  .ogTitle
              }
              className={
                inputClass
              }
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Open Graph description
            </span>

            <input
              name="ogDescription"
              defaultValue={
                page.seo
                  .ogDescription
              }
              className={
                inputClass
              }
            />
          </label>

          <div className="md:col-span-2">
            <MediaPickerField
              label="Open Graph image"
              hint="Select from Media Library"
              name="ogImage"
              value={
                ogImage
              }
              onChange={
                setOgImage
              }
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="noIndex"
              value="true"
              defaultChecked={
                page.seo
                  .noIndex
              }
            />

            <span className="text-[11px] font-semibold">
              Prevent search engine indexing
            </span>
          </label>
        </div>
      </section>

      <div className="sticky bottom-4 flex justify-end rounded-[14px] border border-[#DDE0E6] bg-white/95 p-3 shadow-lg backdrop-blur">
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[11px] font-semibold text-white"
        >
          <Save className="h-3.5 w-3.5" />

          Save page
        </button>
      </div>
    </form>
  );
}