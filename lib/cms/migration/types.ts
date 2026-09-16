import type {
  CmsBlock,
  CmsMenu,
  CmsPage,
  CmsSettings,
} from "../core/types";

import type {
  mapLegacyHomepageToCms,
} from "../migration";

export type LegacyCmsMigrationSnapshot =
  ReturnType<
    typeof mapLegacyHomepageToCms
  >;

export type GenericCmsMenuSeed = {
  key:
    string;

  menu:
    CmsMenu;
};

export type GenericCmsMigrationPayload = {
  page:
    CmsPage;

  blocks:
    CmsBlock[];

  settings:
    CmsSettings;

  menus:
    GenericCmsMenuSeed[];
};