import Link from "next/link";

import {
  ArrowLeft,
  Copy,
  Eye,
  Globe2,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import BlockCard from "../../../../../components/admin/blocks/BlockCard";

import BlockLibrary from "../../../../../components/admin/blocks/BlockLibrary";

import DeletePageButton from "../../../../../components/admin/pages/DeletePageButton";

import PageSettingsForm from "../../../../../components/admin/pages/PageSettingsForm";

import {
  getCmsBlocksForPage,
} from "../../../../../lib/repositories/cms-blocks";

import {
  getCmsPageById,
} from "../../../../../lib/repositories/cms-pages";

import {
  duplicateCmsPageAction,
  publishCmsPageAction,
  setCmsHomepageAction,
  unpublishCmsPageAction,
} from "../actions";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      id: string;
    }>;
};

export default async function CmsPageEditor({
  params,
}: Props) {
  const {
    id,
  } =
    await params;

  const [
    page,
    blocks,
  ] =
    await Promise.all([
      getCmsPageById(
        id,
      ),

      getCmsBlocksForPage(
        id,
      ),
    ]);

  if (!page) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/admin/pages"
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#68717F]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />

        All pages
      </Link>

      <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] ${
                page.status ===
                "published"
                  ? "bg-[#EAF7EE] text-[#347A4B]"
                  : "bg-[#F1F2F4] text-[#777E8A]"
              }`}
            >
              {
                page.status
              }
            </span>

            {page.isHomepage && (
              <span className="rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#3157E7]">
                Homepage
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-[-0.03em]">
            {
              page.title
            }
          </h1>

          <p className="mt-1 text-[10px] text-[#8B929E]">
            /{
              page.slug
            }
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/preview/${page.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center gap-2 rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] font-semibold"
          >
            <Eye className="h-3.5 w-3.5" />

            Preview
          </Link>

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

              <button
                type="submit"
                className="inline-flex min-h-9 items-center gap-2 rounded-[9px] bg-[#3157E7] px-3 text-[10px] font-semibold text-white transition hover:bg-[#294CCB]"
              >
                <Globe2 className="h-3.5 w-3.5" />

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

                <button
                  type="submit"
                  className="min-h-9 rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] font-semibold transition hover:bg-[#F8F9FA]"
                >
                  Unpublish
                </button>
              </form>
            )
          )}

          {!page.isHomepage && (
            <form
              action={
                setCmsHomepageAction
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
                type="submit"
                className="min-h-9 rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] font-semibold transition hover:bg-[#F8F9FA]"
              >
                Set Homepage
              </button>
            </form>
          )}

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
              type="submit"
              className="inline-flex min-h-9 items-center gap-2 rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] font-semibold transition hover:bg-[#F8F9FA]"
            >
              <Copy className="h-3.5 w-3.5" />

              Duplicate
            </button>
          </form>

          {!page.isHomepage && (
            <DeletePageButton
              pageId={
                page.id
              }
              pageTitle={
                page.title
              }
            />
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold">
              Page Builder
            </h2>

            <p className="mt-1 text-[10px] text-[#8E949F]">
              Blocks are rendered from top to bottom.
            </p>
          </div>

          {blocks.length ===
          0 ? (
            <div className="rounded-[16px] border border-dashed border-[#CDD2DA] bg-white p-10 text-center">
              <p className="text-sm font-semibold">
                This page has no blocks yet.
              </p>

              <p className="mt-2 text-[10px] text-[#9298A3]">
                Choose a block from the library below.
              </p>
            </div>
          ) : (
            blocks.map(
              (
                block,
                index,
              ) => (
                <BlockCard
                  key={
                    block.id
                  }
                  pageId={
                    page.id
                  }
                  block={{
                    id:
                      block.id,

                    type:
                      block.type,

                    order:
                      block.order,

                    visible:
                      block.visible,

                    data:
                      block.data,
                  }}
                  isFirst={
                    index ===
                    0
                  }
                  isLast={
                    index ===
                    blocks.length -
                      1
                  }
                />
              ),
            )
          )}

          <BlockLibrary
            pageId={
              page.id
            }
          />
        </div>

        <aside>
          <PageSettingsForm
            page={{
              id:
                page.id,

              title:
                page.title,

              slug:
                page.slug,

              status:
                page.status,

              isHomepage:
                page.isHomepage,

              seo:
                page.seo,
            }}
          />
        </aside>
      </div>
    </div>
  );
}