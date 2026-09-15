import type {
  CmsMenu,
  CmsMenuItem,
  CmsPage,
} from "../core/types";

type CmsPageWithId =
  CmsPage & {
    id:
      string;
  };

export type CmsPublicNavigationItem = {
  id:
    string;

  label:
    string;

  href:
    string;

  target:
    "same-tab" |
    "new-tab";

  children:
    CmsPublicNavigationItem[];
};

export function resolveCmsMenuHref(
  item:
    CmsMenuItem,

  pages:
    readonly CmsPageWithId[],
): string | null {
  if (
    item.type ===
    "custom"
  ) {
    const url =
      item.customUrl.trim();

    return url ||
      null;
  }

  if (!item.pageId) {
    return null;
  }

  const page =
    pages.find(
      (
        candidate,
      ) =>
        candidate.id ===
        item.pageId,
    );

  if (
    !page ||
    page.status !==
      "published"
  ) {
    return null;
  }

  if (
    page.isHomepage
  ) {
    return "/";
  }

  return `/${page.slug}`;
}

function resolveItem(
  item:
    CmsMenuItem,

  pages:
    readonly CmsPageWithId[],
): CmsPublicNavigationItem | null {
  if (
    !item.enabled
  ) {
    return null;
  }

  const href =
    resolveCmsMenuHref(
      item,
      pages,
    );

  if (!href) {
    return null;
  }

  return {
    id:
      item.id,

    label:
      item.label,

    href,

    target:
      item.target,

    children:
      [],
  };
}

export function resolveCmsMenuItems(
  menu:
    CmsMenu,

  pages:
    readonly CmsPageWithId[],
): CmsPublicNavigationItem[] {
  const ordered =
    [...menu.items].sort(
      (
        a,
        b,
      ) =>
        a.order -
        b.order,
    );

  const resolvable =
    ordered
      .map(
        (
          item,
        ) => ({
          source:
            item,

          resolved:
            resolveItem(
              item,
              pages,
            ),
        }),
      )
      .filter(
        (
          entry,
        ): entry is {
          source:
            CmsMenuItem;

          resolved:
            CmsPublicNavigationItem;
        } =>
          entry.resolved !==
          null,
      );

  const rootIds =
    new Set(
      resolvable
        .filter(
          (
            entry,
          ) =>
            entry.source
              .parentId ===
            null,
        )
        .map(
          (
            entry,
          ) =>
            entry.source.id,
        ),
    );

  return resolvable
    .filter(
      (
        entry,
      ) =>
        entry.source
          .parentId ===
        null,
    )
    .map(
      (
        entry,
      ) => ({
        ...entry.resolved,

        children:
          resolvable
            .filter(
              (
                child,
              ) =>
                child.source
                  .parentId ===
                  entry.source
                    .id &&
                rootIds.has(
                  entry.source
                    .id,
                ),
            )
            .map(
              (
                child,
              ) => ({
                ...child.resolved,

                children:
                  [],
              }),
            ),
      }),
    );
}