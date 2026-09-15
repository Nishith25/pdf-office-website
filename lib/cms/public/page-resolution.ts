import type {
  CmsBlock,
  CmsPage,
} from "../core/types";

export function isCmsPagePublic(
  page:
    Pick<
      CmsPage,
      "status"
    >,
): boolean {
  return (
    page.status ===
    "published"
  );
}

export function getVisibleCmsBlocks(
  blocks:
    readonly CmsBlock[],
): CmsBlock[] {
  return [...blocks]
    .filter(
      (
        block,
      ) =>
        block.visible,
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
        block,
      ) => ({
        ...block,

        data: {
          ...block.data,
        },
      }),
    );
}