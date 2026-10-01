import {
  getCmsHomepage,
} from "../lib/repositories/cms-pages";

import {
  getCmsBlocksForPage,
  insertCmsBlock,
} from "../lib/repositories/cms-blocks";

import {
  createCmsBlockDraft,
} from "../lib/cms/core/block-registry";

import {
  parseCmsStructuredBlockData,
} from "../lib/cms/core/block-data-schemas";

import {
  getSiteConfig,
} from "../lib/site/config";

async function main() {
  const site =
    getSiteConfig();

  if (site.key !== "gps-maps") {
    throw new Error(
      `Expected gps-maps, received ${site.key}`,
    );
  }

  const homepage =
    await getCmsHomepage();

  if (!homepage) {
    throw new Error(
      "GPS homepage not found.",
    );
  }

  const blocks =
    await getCmsBlocksForPage(
      homepage.id,
    );

  let nextOrder =
    blocks.length + 1;

  const hasJournalContent =
    blocks.some(
      (block) =>
        block.type === "richText",
    );

  const hasJournalAction =
    blocks.some(
      (block) =>
        block.type === "buttonGroup",
    );

  if (!hasJournalContent) {
    const draft =
      createCmsBlockDraft(
        "richText",
        homepage.id,
        nextOrder++,
      );

    await insertCmsBlock({
      ...draft,

      data:
        parseCmsStructuredBlockData(
          "richText",
          {
            schemaVersion: 2,

            eyebrow:
              "Journal",

            title:
              "Recent from the journal.",

            body:
              "Guides, travel tips and useful updates from GPS Maps.",

            presentation: {
              background:
                "default",

              width:
                "wide",

              spacing:
                "compact",

              alignment:
                "left",

              variant:
                "minimal",
            },
          },
        ),
    });

    console.log(
      "✓ Journal content block added",
    );
  }

  if (!hasJournalAction) {
    const draft =
      createCmsBlockDraft(
        "buttonGroup",
        homepage.id,
        nextOrder++,
      );

    await insertCmsBlock({
      ...draft,

      data:
        parseCmsStructuredBlockData(
          "buttonGroup",
          {
            schemaVersion: 2,

            title:
              "Journal action",

            buttons: [
              {
                id:
                  "journal-view-all",

                label:
                  "View all articles",

                url:
                  "/blog",

                style:
                  "text",

                target:
                  "same-tab",
              },
            ],

            presentation: {
              background:
                "default",

              width:
                "wide",

              spacing:
                "compact",

              alignment:
                "left",

              variant:
                "inline",
            },
          },
        ),
    });

    console.log(
      "✓ Journal action block added",
    );
  }

  console.log(
    "✓ GPS Journal is now CMS-ready",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
