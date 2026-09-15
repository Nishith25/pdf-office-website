import {
  notFound,
} from "next/navigation";

import PublicCmsPage from "../../../../../components/cms/public/PublicCmsPage";

import PublicSiteShell from "../../../../../components/cms/public/PublicSiteShell";

import {
  buildCmsPublicSiteModel,
} from "../../../../../lib/cms/public/site-model";

import {
  getCmsBlocksForPage,
} from "../../../../../lib/repositories/cms-blocks";

import {
  listCmsMenus,
} from "../../../../../lib/repositories/cms-menus";

import {
  getCmsPageById,
  listCmsPages,
} from "../../../../../lib/repositories/cms-pages";

import {
  getCmsSettings,
} from "../../../../../lib/repositories/cms-settings";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      id:
        string;
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
    settings,
    menus,
    pages,
  ] =
    await Promise.all([
      getCmsPageById(
        id,
      ),

      getCmsBlocksForPage(
        id,
      ),

      getCmsSettings(),

      listCmsMenus(),

      listCmsPages(),
    ]);

  if (!page) {
    notFound();
  }

  const model =
    buildCmsPublicSiteModel({
      page,

      blocks,

      settings,

      menus,

      pages,
    });

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-[100] border-b border-[#DDE1E7] bg-[#11151D] px-5 py-2.5 text-center text-[10px] font-semibold text-white">
        CMS Preview ·{" "}
        {
          page.status
        }{" "}
        · /{
          page.slug
        }
        {page.status ===
          "draft" && (
          <span className="ml-2 rounded-full bg-amber-400/20 px-2 py-1 text-amber-200">
            Not publicly visible
          </span>
        )}
      </div>

      <PublicSiteShell
        settings={
          model.settings
        }
        headerNavigation={
          model.headerNavigation
        }
        footerNavigation={
          model.footerNavigation
        }
      >
        <PublicCmsPage
          page={
            model.page
          }
          blocks={
            model.blocks
          }
        />
      </PublicSiteShell>
    </div>
  );
}