import {
  Plus,
} from "lucide-react";

import {
  CMS_BLOCK_REGISTRY,
} from "../../../lib/cms/core/block-registry";

import {
  addCmsBlockAction,
} from "../../../app/admin/(protected)/pages/actions";

export default function BlockLibrary({
  pageId,
}: {
  pageId:
    string;
}) {
  return (
    <section className="rounded-[16px] border border-[#E1E4E9] bg-white p-5">
      <div>
        <p className="text-sm font-bold text-[#20242E]">
          Add block
        </p>

        <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
          Choose a reusable content block for this page.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {CMS_BLOCK_REGISTRY.map(
          (
            definition,
          ) => (
            <form
              key={
                definition.type
              }
              action={
                addCmsBlockAction
              }
            >
              <input
                type="hidden"
                name="pageId"
                value={
                  pageId
                }
              />

              <input
                type="hidden"
                name="blockType"
                value={
                  definition.type
                }
              />

              <button
                type="submit"
                className="flex min-h-[76px] w-full items-center gap-3 rounded-[12px] border border-[#E1E4E9] bg-[#FAFBFC] p-3 text-left transition hover:border-[#AAB8F5] hover:bg-[#F4F6FF]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#E9EDFF] text-[#3157E7]">
                  <Plus className="h-4 w-4" />
                </span>

                <span>
                  <strong className="block text-[11px] text-[#343945]">
                    {
                      definition.label
                    }
                  </strong>

                  <span className="mt-1 block text-[9px] leading-4 text-[#949AA5]">
                    {
                      definition.description
                    }
                  </span>
                </span>
              </button>
            </form>
          ),
        )}
      </div>
    </section>
  );
}