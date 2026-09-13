import {
  FolderOpen,
} from "lucide-react";

import OrganizeEditor from "../../../../components/admin/organize/OrganizeEditor";

import {
  getMediaItems,
} from "../../../../lib/repositories/media";

import {
  getSiteSectionByKey,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export default async function OrganizePage() {
  const [
    section,
    media,
  ] =
    await Promise.all([
      getSiteSectionByKey(
        "convertOrganize",
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

  const categories =
    Array.isArray(
      section?.data.categories,
    )
      ? section.data.categories.filter(
          (
            item,
          ): item is string =>
            typeof item ===
            "string",
        )
      : [
          "All Docs",
          "Business Card",
          "ID Card",
          "Academic",
          "Personal",
        ];

  return (
    <div className="mx-auto max-w-[950px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Convert & Organize
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          Document workspace
        </h1>

        <p className="mt-2 text-sm text-[#747B88]">
          Manage workspace categories and conversion-section imagery.
        </p>
      </div>

      <OrganizeEditor
        initialMediaId={
          section?.mediaId ??
          ""
        }
        initialMediaUrl={
          mediaUrl
        }
        initialCategories={
          categories
        }
      />
    </div>
  );
}