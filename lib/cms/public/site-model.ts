import type {
  CmsBlock,
  CmsMenu,
  CmsPage,
  CmsSettings,
} from "../core/types";

import {
  getVisibleCmsBlocks,
} from "./page-resolution";

import {
  resolveCmsMenuItems,
  type CmsPublicNavigationItem,
} from "./navigation";

type CmsPageWithId =
  CmsPage & {
    id:
      string;
  };

type CmsMenuWithId =
  CmsMenu & {
    id:
      string;
  };

export type CmsPublicSiteModel = {
  page:
    CmsPageWithId;

  blocks:
    CmsBlock[];

  settings:
    CmsSettings;

  headerNavigation:
    CmsPublicNavigationItem[];

  footerNavigation:
    CmsPublicNavigationItem[];
};

export function buildCmsPublicSiteModel({
  page,
  blocks,
  settings,
  menus,
  pages,
}: {
  page:
    CmsPageWithId;

  blocks:
    readonly CmsBlock[];

  settings:
    CmsSettings;

  menus:
    readonly CmsMenuWithId[];

  pages:
    readonly CmsPageWithId[];
}): CmsPublicSiteModel {
  const headerMenu =
    settings.footer
      .headerMenuId
      ? menus.find(
          (
            menu,
          ) =>
            menu.id ===
            settings.footer
              .headerMenuId,
        )
      : undefined;

  const footerMenu =
    settings.footer
      .footerMenuId
      ? menus.find(
          (
            menu,
          ) =>
            menu.id ===
            settings.footer
              .footerMenuId,
        )
      : undefined;

  return {
    page,

    blocks:
      getVisibleCmsBlocks(
        blocks,
      ),

    settings,

    headerNavigation:
      headerMenu
        ? resolveCmsMenuItems(
            headerMenu,
            pages,
          )
        : [],

    footerNavigation:
      footerMenu
        ? resolveCmsMenuItems(
            footerMenu,
            pages,
          )
        : [],
  };
}