import type {
  CmsMenuItem,
} from "./types";

export type CmsMenuMoveDirection =
  | "up"
  | "down";

function cloneItem(
  item:
    CmsMenuItem,
): CmsMenuItem {
  return {
    ...item,
  };
}

function renumberCurrentOrder(
  items:
    readonly CmsMenuItem[],
): CmsMenuItem[] {
  return items.map(
    (
      item,
      index,
    ) => ({
      ...cloneItem(
        item,
      ),

      order:
        index +
        1,
    }),
  );
}

export function normalizeCmsMenuItems(
  items:
    readonly CmsMenuItem[],
): CmsMenuItem[] {
  return [...items]
    .map(
      cloneItem,
    )
    .sort(
      (
        a,
        b,
      ) =>
        a.order -
        b.order,
    )
    .map(
      (
        item,
        index,
      ) => ({
        ...item,

        order:
          index +
          1,
      }),
    );
}

export function addCmsMenuItem(
  items:
    readonly CmsMenuItem[],

  item:
    CmsMenuItem,
): CmsMenuItem[] {
  const existing =
    normalizeCmsMenuItems(
      items,
    );

  if (
    existing.some(
      (
        current,
      ) =>
        current.id ===
        item.id,
    )
  ) {
    return existing;
  }

  return renumberCurrentOrder([
    ...existing,

    {
      ...cloneItem(
        item,
      ),

      order:
        existing.length +
        1,
    },
  ]);
}

export function moveCmsMenuItem(
  items:
    readonly CmsMenuItem[],

  itemId:
    string,

  direction:
    CmsMenuMoveDirection,
): CmsMenuItem[] {
  const ordered =
    normalizeCmsMenuItems(
      items,
    );

  const index =
    ordered.findIndex(
      (
        item,
      ) =>
        item.id ===
        itemId,
    );

  if (
    index ===
    -1
  ) {
    return ordered;
  }

  const targetIndex =
    direction ===
    "up"
      ? index -
        1
      : index +
        1;

  if (
    targetIndex <
      0 ||
    targetIndex >=
      ordered.length
  ) {
    return ordered;
  }

  const current =
    ordered[
      index
    ];

  const target =
    ordered[
      targetIndex
    ];

  if (
    !current ||
    !target
  ) {
    return ordered;
  }

  /*
   * Keep items inside their current nesting level.
   * A child should not swap directly with a root item
   * belonging to another branch.
   */
  if (
    current.parentId !==
    target.parentId
  ) {
    return ordered;
  }

  const result = [
    ...ordered,
  ];

  result[index] =
    target;

  result[
    targetIndex
  ] =
    current;

  return renumberCurrentOrder(
    result,
  );
}

export function updateCmsMenuItem(
  items:
    readonly CmsMenuItem[],

  itemId:
    string,

  patch:
    Partial<
      Omit<
        CmsMenuItem,
        "id" |
          "order"
      >
    >,
): CmsMenuItem[] {
  return normalizeCmsMenuItems(
    items.map(
      (
        item,
      ) => {
        if (
          item.id !==
          itemId
        ) {
          return cloneItem(
            item,
          );
        }

        return {
          ...cloneItem(
            item,
          ),

          ...patch,

          id:
            item.id,

          order:
            item.order,
        };
      },
    ),
  );
}

export function setCmsMenuItemParent(
  items:
    readonly CmsMenuItem[],

  itemId:
    string,

  parentId:
    string | null,
): CmsMenuItem[] {
  const normalized =
    normalizeCmsMenuItems(
      items,
    );

  const item =
    normalized.find(
      (
        candidate,
      ) =>
        candidate.id ===
        itemId,
    );

  if (!item) {
    return normalized;
  }

  if (
    parentId ===
    null
  ) {
    return normalized.map(
      (
        candidate,
      ) =>
        candidate.id ===
        itemId
          ? {
              ...candidate,

              parentId:
                null,
            }
          : {
              ...candidate,
            },
    );
  }

  if (
    parentId ===
    itemId
  ) {
    return normalized;
  }

  const parent =
    normalized.find(
      (
        candidate,
      ) =>
        candidate.id ===
        parentId,
    );

  if (!parent) {
    return normalized;
  }

  /*
   * One-level nesting only.
   * A child cannot become a parent.
   */
  if (
    parent.parentId !==
    null
  ) {
    return normalized;
  }

  /*
   * Prevent moving a root item underneath one of
   * its own existing children.
   */
  const parentIsChildOfItem =
    parent.parentId ===
    itemId;

  if (
    parentIsChildOfItem
  ) {
    return normalized;
  }

  /*
   * An item that already owns children cannot itself
   * become a child. That would create a second level.
   */
  const itemHasChildren =
    normalized.some(
      (
        candidate,
      ) =>
        candidate.parentId ===
        itemId,
    );

  if (
    itemHasChildren
  ) {
    return normalized;
  }

  return normalized.map(
    (
      candidate,
    ) =>
      candidate.id ===
      itemId
        ? {
            ...candidate,

            parentId,
          }
        : {
            ...candidate,
          },
  );
}

export function removeCmsMenuItem(
  items:
    readonly CmsMenuItem[],

  itemId:
    string,
): CmsMenuItem[] {
  const remaining =
    items
      .filter(
        (
          item,
        ) =>
          item.id !==
          itemId,
      )
      .map(
        (
          item,
        ) => ({
          ...cloneItem(
            item,
          ),

          parentId:
            item.parentId ===
            itemId
              ? null
              : item.parentId,
        }),
      );

  return normalizeCmsMenuItems(
    remaining,
  );
}