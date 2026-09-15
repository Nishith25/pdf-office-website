import {
  normalizeCmsBlockOrder,
} from "./blocks";

import type {
  CmsBlock,
} from "./types";

export type CmsBlockListItem =
  CmsBlock & {
    id:
      string;
  };

export type CmsBlockMoveDirection =
  | "up"
  | "down";

function cloneBlock(
  block:
    CmsBlockListItem,
): CmsBlockListItem {
  return {
    ...block,

    data:
      structuredClone(
        block.data,
      ),
  };
}

function normalize(
  blocks:
    readonly CmsBlockListItem[],
): CmsBlockListItem[] {
  return normalizeCmsBlockOrder(
    blocks.map(
      cloneBlock,
    ),
  );
}

function renumberInCurrentOrder(
  blocks:
    readonly CmsBlockListItem[],
): CmsBlockListItem[] {
  return blocks.map(
    (
      block,
      index,
    ) => ({
      ...cloneBlock(
        block,
      ),

      order:
        index +
        1,
    }),
  );
}

export function moveCmsBlock(
  blocks:
    readonly CmsBlockListItem[],

  blockId:
    string,

  direction:
    CmsBlockMoveDirection,
): CmsBlockListItem[] {
  const ordered =
    normalize(
      blocks,
    );

  const currentIndex =
    ordered.findIndex(
      (
        block,
      ) =>
        block.id ===
        blockId,
    );

  if (
    currentIndex ===
    -1
  ) {
    return ordered;
  }

  const targetIndex =
    direction ===
    "up"
      ? currentIndex -
        1
      : currentIndex +
        1;

  if (
    targetIndex <
      0 ||
    targetIndex >=
      ordered.length
  ) {
    return ordered;
  }

  const result = [
    ...ordered,
  ];

  const current =
    result[
      currentIndex
    ];

  const target =
    result[
      targetIndex
    ];

  if (
    !current ||
    !target
  ) {
    return ordered;
  }

  result[
    currentIndex
  ] =
    target;

  result[
    targetIndex
  ] =
    current;

  return renumberInCurrentOrder(
    result,
  );
}

export function toggleCmsBlockVisibility(
  blocks:
    readonly CmsBlockListItem[],

  blockId:
    string,
): CmsBlockListItem[] {
  return normalize(
    blocks.map(
      (
        block,
      ) =>
        block.id ===
        blockId
          ? {
              ...cloneBlock(
                block,
              ),

              visible:
                !block.visible,
            }
          : cloneBlock(
              block,
            ),
    ),
  );
}

export function removeCmsBlock(
  blocks:
    readonly CmsBlockListItem[],

  blockId:
    string,
): CmsBlockListItem[] {
  return normalize(
    blocks.filter(
      (
        block,
      ) =>
        block.id !==
        blockId,
    ),
  );
}

export function duplicateCmsBlockInList(
  blocks:
    readonly CmsBlockListItem[],

  blockId:
    string,

  duplicateId:
    string,

  now =
    new Date(),
): CmsBlockListItem[] {
  const ordered =
    normalize(
      blocks,
    );

  const sourceIndex =
    ordered.findIndex(
      (
        block,
      ) =>
        block.id ===
        blockId,
    );

  if (
    sourceIndex ===
    -1
  ) {
    return ordered;
  }

  const source =
    ordered[
      sourceIndex
    ];

  if (!source) {
    return ordered;
  }

  const duplicate:
    CmsBlockListItem = {
    ...cloneBlock(
      source,
    ),

    id:
      duplicateId,

    order:
      source.order +
      1,

    createdAt:
      now,

    updatedAt:
      now,
  };

  const result = [
    ...ordered.slice(
      0,
      sourceIndex +
        1,
    ),

    duplicate,

    ...ordered.slice(
      sourceIndex +
        1,
    ),
  ];

  return renumberInCurrentOrder(
    result,
  );
}