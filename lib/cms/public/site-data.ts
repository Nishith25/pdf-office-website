import type {
  CmsPublicSiteModel,
} from "./site-model";

import {
  buildCmsPublicSiteModel,
} from "./site-model";

import {
  getCmsBlocksForPage,
} from "../../repositories/cms-blocks";

import {
  listCmsMenus,
} from "../../repositories/cms-menus";

import {
  getCmsHomepage,
  getPublishedCmsPageBySlug,
  listCmsPages,
} from "../../repositories/cms-pages";

import {
  getCmsSettings,
} from "../../repositories/cms-settings";

async function buildPublicModelForPage(
  page:
    NonNullable<
      Awaited<
        ReturnType<
          typeof getCmsHomepage
        >
      >
    >,
): Promise<
  CmsPublicSiteModel
> {
  const [
    blocks,
    settings,
    menus,
    pages,
  ] =
    await Promise.all([
      getCmsBlocksForPage(
        page.id,
      ),

      getCmsSettings(),

      listCmsMenus(),

      listCmsPages(),
    ]);

  return buildCmsPublicSiteModel({
    page,

    blocks,

    settings,

    menus,

    pages,
  });
}

export async function getCmsPublicHomepageModel(): Promise<
  CmsPublicSiteModel | null
> {
  const page =
    await getCmsHomepage();

  if (!page) {
    return null;
  }

  return buildPublicModelForPage(
    page,
  );
}

export async function getCmsPublicPageModelBySlug(
  slug:
    string,
): Promise<
  CmsPublicSiteModel | null
> {
  const page =
    await getPublishedCmsPageBySlug(
      slug,
    );

  if (!page) {
    return null;
  }

  return buildPublicModelForPage(
    page,
  );
}