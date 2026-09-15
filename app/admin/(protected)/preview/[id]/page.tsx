import {
  notFound,
} from "next/navigation";

import CmsPreviewRenderer from "../../../../../components/admin/preview/CmsPreviewRenderer";

import {
  getCmsBlocksForPage,
} from "../../../../../lib/repositories/cms-blocks";

import {
  getCmsPageById,
} from "../../../../../lib/repositories/cms-pages";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      id: string;
    }>;
};

export default async function CmsPagePreview({
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
    <div className="min-h-screen bg-white text-[#181B22]">
      <div className="border-b border-[#E7E9ED] bg-[#F8F9FB] px-6 py-3 text-center text-[10px] font-semibold text-[#707784]">
        CMS Preview · {
          page.status
        } · /{
          page.slug
        }
      </div>

      <header className="border-b border-[#ECEEF1] px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold tracking-[-0.04em]">
            {
              page.title
            }
          </h1>
        </div>
      </header>

      <CmsPreviewRenderer
        blocks={
          blocks
        }
      />
    </div>
  );
}