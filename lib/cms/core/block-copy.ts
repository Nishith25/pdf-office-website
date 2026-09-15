import type {
  CmsBlock,
} from "./types";

type CmsBlockWithId =
  CmsBlock & {
    id: string;
  };

export function cloneCmsBlocksForPage(
  source:
    readonly CmsBlockWithId[],

  pageId: string,

  now =
    new Date(),
): CmsBlock[] {
  return [...source]
    .sort(
      (a, b) =>
        a.order -
        b.order,
    )
    .map(
      (
        block,
        index,
      ) => ({
        pageId,

        type:
          block.type,

        order:
          index +
          1,

        visible:
          block.visible,

        data:
          structuredClone(
            block.data,
          ),

        createdAt:
          now,

        updatedAt:
          now,
      }),
    );
}