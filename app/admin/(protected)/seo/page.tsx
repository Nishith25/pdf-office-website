import {
  Search,
} from "lucide-react";

import SeoEditor from "../../../../components/admin/seo/SeoEditor";

import {
  createSeoEditorState,
} from "../../../../lib/admin/seo-editor";

import {
  getHomePage,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "SEO | PDF Office Admin",
};

export default async function AdminSeoPage() {
  const page =
    await getHomePage();

  const initialValue =
    createSeoEditorState(
      page,
    );

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            SEO
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Search & social metadata
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Manage homepage title, description, keywords, canonical URL
          and social-sharing metadata.
        </p>
      </div>

      <SeoEditor
        initialValue={
          initialValue
        }
      />
    </div>
  );
}