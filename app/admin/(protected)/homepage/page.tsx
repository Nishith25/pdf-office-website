import {
  ExternalLink,
  FilePenLine,
} from "lucide-react";

import HomepageEditor from "../../../../components/admin/homepage/HomepageEditor";

import {
  createHomepageEditorState,
} from "../../../../lib/admin/homepage-editor";

import {
  getHomepageSections,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Homepage | PDF Office Admin",
};

export default async function AdminHomepagePage() {
  const sections =
    await getHomepageSections();

  const initialValue =
    createHomepageEditorState(
      sections,
    );

  return (
    <div className="mx-auto max-w-[1450px]">
      <div className="mb-7 flex flex-col justify-between gap-5 border-b border-[#E3E5E9] pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <FilePenLine className="h-4 w-4 text-[#3157E7]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
              Homepage
            </p>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
            Edit public content
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
            Change the main PDF Office homepage content while keeping
            the page structure and visual design controlled by the
            website.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-[10px] border border-[#DCE0E6] bg-white px-4 text-[10px] font-semibold text-[#555C69] transition hover:bg-[#F9FAFB]"
        >
          Open public site

          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <HomepageEditor
        initialValue={
          initialValue
        }
      />
    </div>
  );
}