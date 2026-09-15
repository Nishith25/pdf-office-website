import {
  FileText,
} from "lucide-react";

import {
  listCmsPages,
} from "../../../../lib/repositories/cms-pages";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Pages | CMS",
};

export default async function CmsPagesPage() {
  const pages =
    await listCmsPages();

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Content
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Pages
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Website pages stored in the generic CMS.
        </p>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#E2E4E8] bg-white">
        {pages.length >
        0 ? (
          <>
            <div className="hidden grid-cols-[1fr_180px_120px_150px] border-b border-[#E7E9ED] bg-[#FAFAFB] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8E949F] sm:grid">
              <span>
                Page
              </span>

              <span>
                Slug
              </span>

              <span>
                Status
              </span>

              <span>
                Updated
              </span>
            </div>

            <div className="divide-y divide-[#ECEEF1]">
              {pages.map(
                (
                  page,
                ) => (
                  <div
                    key={
                      page.id
                    }
                    className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_180px_120px_150px] sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#272C35]">
                          {
                            page.title
                          }
                        </p>

                        {page.isHomepage && (
                          <span className="rounded-full bg-[#EEF4FF] px-2 py-1 text-[8px] font-semibold text-[#3157E7]">
                            Homepage
                          </span>
                        )}
                      </div>

                      <p className="mt-1 font-mono text-[9px] text-[#969CA6]">
                        {page.isHomepage
                          ? "/"
                          : `/${page.slug}`}
                      </p>
                    </div>

                    <p className="text-[10px] text-[#6F7682]">
                      {
                        page.slug
                      }
                    </p>

                    <p className="text-[10px] font-semibold capitalize text-[#535A65]">
                      {
                        page.status
                      }
                    </p>

                    <p className="text-[9px] text-[#9298A3]">
                      {page.updatedAt.toLocaleDateString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[13px] bg-[#F0F3FF]">
              <FileText className="h-5 w-5 text-[#3157E7]" />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#454B56]">
              No generic CMS pages yet
            </p>

            <p className="mx-auto mt-2 max-w-md text-[10px] leading-5 text-[#9298A3]">
              Your existing website content remains untouched. Creating,
              editing and publishing dynamic pages arrives in the next
              CMS bundle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}