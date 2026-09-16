import {
  cmsBlockSchema,
  cmsMenuSchema,
} from "../core/schemas";

import type {
  GenericCmsMigrationPayload,
} from "./types";

const TEMPORARY_HOMEPAGE_REFERENCE =
  "home";

export type GenericCmsMigrationPersistenceReferences = {
  homepagePageId:
    string;
};

export function resolveGenericCmsMigrationReferences(
  migration:
    GenericCmsMigrationPayload,

  references:
    GenericCmsMigrationPersistenceReferences,
): GenericCmsMigrationPayload {
  const homepagePageId =
    references.homepagePageId.trim();

  if (!homepagePageId) {
    throw new Error(
      "Persisted homepage page ID is required.",
    );
  }

  const cloned =
    structuredClone(
      migration,
    );

  const blocks =
    cloned.blocks.map(
      (
        block,
      ) =>
        cmsBlockSchema.parse({
          ...block,

          pageId:
            homepagePageId,
        }),
    );

  const menus =
    cloned.menus.map(
      (
        seed,
      ) => {
        const items =
          seed.menu.items.map(
            (
              item,
            ) => {
              if (
                item.type ===
                  "page" &&
                item.pageId ===
                  TEMPORARY_HOMEPAGE_REFERENCE
              ) {
                return {
                  ...item,

                  pageId:
                    homepagePageId,
                };
              }

              return {
                ...item,
              };
            },
          );

        return {
          ...seed,

          menu:
            cmsMenuSchema.parse({
              ...seed.menu,

              items,
            }),
        };
      },
    );

  return {
    ...cloned,

    blocks,

    menus,
  };
}