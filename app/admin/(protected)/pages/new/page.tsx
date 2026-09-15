import Link from "next/link";

import {
  ArrowLeft,
  FilePlus2,
} from "lucide-react";

import {
  createCmsPageAction,
} from "../actions";

export default function NewCmsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/pages"
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#667080]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />

        Back to pages
      </Link>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#E9EDFF] text-[#3157E7]">
            <FilePlus2 className="h-5 w-5" />
          </span>

          <div>
            <h1 className="text-xl font-bold">
              Add New Page
            </h1>

            <p className="mt-1 text-[10px] text-[#8C929D]">
              Create a new dynamic CMS page without adding a Next.js route.
            </p>
          </div>
        </div>
      </div>

      <form
        action={
          createCmsPageAction
        }
        className="mt-7 rounded-[16px] border border-[#E1E4E9] bg-white p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-[11px] font-semibold">
              Page title
            </span>

            <input
              name="title"
              required
              className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] px-3.5 text-sm"
              placeholder="About Us"
            />
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Slug
            </span>

            <input
              name="slug"
              className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] px-3.5 text-sm"
              placeholder="about-us"
            />

            <span className="mt-1 block text-[9px] text-[#969CA7]">
              Leave blank to generate from the title.
            </span>
          </label>

          <label>
            <span className="text-[11px] font-semibold">
              Initial status
            </span>

            <select
              name="status"
              defaultValue="draft"
              className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 text-sm"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </label>

          <label className="flex items-center gap-2 self-end pb-3">
            <input
              type="checkbox"
              name="isHomepage"
              value="true"
            />

            <span className="text-[11px] font-semibold">
              Set as homepage
            </span>
          </label>

          <label className="md:col-span-2">
            <span className="text-[11px] font-semibold">
              SEO title
            </span>

            <input
              name="seoTitle"
              maxLength={
                70
              }
              className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] px-3.5 text-sm"
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
              rows={
                4
              }
              className="mt-2 w-full rounded-[10px] border border-[#DDE0E6] p-3 text-sm"
            />
          </label>
        </div>

        <input
          type="hidden"
          name="seoKeywords"
          value=""
        />

        <input
          type="hidden"
          name="canonicalUrl"
          value=""
        />

        <input
          type="hidden"
          name="ogTitle"
          value=""
        />

        <input
          type="hidden"
          name="ogDescription"
          value=""
        />

        <input
          type="hidden"
          name="ogImage"
          value=""
        />

        <div className="mt-6 flex justify-end">
          <button className="rounded-[9px] bg-[#3157E7] px-5 py-3 text-[11px] font-semibold text-white">
            Create page
          </button>
        </div>
      </form>
    </div>
  );
}