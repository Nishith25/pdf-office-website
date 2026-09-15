import type {
  CmsBlock,
  CmsPage,
} from "../../../lib/cms/core/types";

import {
  getVisibleCmsBlocks,
} from "../../../lib/cms/public/page-resolution";

import PublicBlockRenderer from "./PublicBlockRenderer";

export default function PublicCmsPage({
  page,
  blocks,
}: {
  page:
    CmsPage;

  blocks:
    readonly CmsBlock[];
}) {
  const visibleBlocks =
    getVisibleCmsBlocks(
      blocks,
    );

  return (
    <main
      data-cms-page={
        page.slug
      }
    >
      {visibleBlocks.map(
        (
          block,
          index,
        ) => (
          <PublicBlockRenderer
            key={`${block.pageId}-${block.order}-${block.type}-${index}`}
            block={
              block
            }
          />
        ),
      )}
    </main>
  );
}