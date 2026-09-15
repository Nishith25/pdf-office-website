import Link from "next/link";

import {
  Copy,
  FileText,
  Pencil,
  Plus,
} from "lucide-react";

import {
  listCmsPages,
} from "../../../../lib/repositories/cms-pages";

import {
  duplicateCmsPageAction,
  publishCmsPageAction,
  unpublishCmsPageAction,
} from "./actions";

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
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#3157E7]" />

            <h1 className="text-xl font-bold">
              Pages
            </h1>
          </div>

          <p className="mt-1 text-[10px] text-[#9096A1]">
            Create and manage dynamic website pages.
          </p>
        </div>

        <Link
          href="/admin/pages/new"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[11px] font-semibold text-white"
        >
          <Plus className="h-4 w-4" />

          Add New Page
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[16px] border border-[#E1E4E9] bg-white">
        {pages.length ===
        0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-semibold">
              No CMS pages yet.
            </p>

            <p className="mt-2 text-[10px] text-[#9298A3]">
              Create your first page without writing a route or component.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-[#F8F9FA]">
                <tr className="text-left text-[9px] font-bold uppercase tracking-[0.1em] text-[#9399A4]">
                  <th className="px-5 py-3">
                    Page
                  </th>

                  <th className="px-5 py-3">
                    Path
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Updated
                  </th>

                  <th className="px-5 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {pages.map(
                  (page) => (
                    <tr
                      key={
                        page.id
                      }
                      className="border-t border-[#ECEEF1]"
                    >
                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold text-[#303540]">
                          {
                            page.title
                          }
                        </p>

                        {page.isHomepage && (
                          <span className="mt-1 inline-block rounded-full bg-[#EEF1FF] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.1em] text-[#3157E7]">
                            Homepage
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-[10px] text-[#747C89]">
                        /{
                          page.slug
                        }
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase ${
                          page.status ===
                          "published"
                            ? "bg-[#EAF7EE] text-[#357A4C]"
                            : "bg-[#F0F1F3] text-[#737A86]"
                        }`}>
                          {
                            page.status
                          }
                        </span>
                      </td>

                      <td className="px-5 py-4 text-[9px] text-[#858C98]">
                        {
                          page.updatedAt.toLocaleString()
                        }
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/admin/pages/${page.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>

                          <form
                            action={
                              duplicateCmsPageAction
                            }
                          >
                            <input
                              type="hidden"
                              name="pageId"
                              value={
                                page.id
                              }
                            />

                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
                              title="Duplicate"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </form>

                          {page.status ===
                          "draft" ? (
                            <form
                              action={
                                publishCmsPageAction
                              }
                            >
                              <input
                                type="hidden"
                                name="pageId"
                                value={
                                  page.id
                                }
                              />

                              <button className="h-8 rounded-[8px] bg-[#3157E7] px-3 text-[9px] font-semibold text-white">
                                Publish
                              </button>
                            </form>
                          ) : (
                            !page.isHomepage && (
                              <form
                                action={
                                  unpublishCmsPageAction
                                }
                              >
                                <input
                                  type="hidden"
                                  name="pageId"
                                  value={
                                    page.id
                                  }
                                />

                                <button className="h-8 rounded-[8px] border border-[#DFE2E7] px-3 text-[9px] font-semibold">
                                  Unpublish
                                </button>
                              </form>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}