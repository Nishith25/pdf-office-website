import {
  describe,
  expect,
  it,
} from "vitest";

import {
  siteData,
} from "../data/site";

import {
  mapLegacyHomepageToCms,
} from "../lib/cms/migration";

import {
  buildGenericCmsMigration,
} from "../lib/cms/migration/generic-homepage";

import {
  resolveGenericCmsMigrationReferences,
} from "../lib/cms/migration/persistence";

const NOW =
  new Date(
    "2026-09-16T08:00:00.000Z",
  );

describe(
  "generic CMS migration persistence",
  () => {
    it(
      "replaces temporary homepage references with the persisted page ID",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const migration =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        const persisted =
          resolveGenericCmsMigrationReferences(
            migration,
            {
              homepagePageId:
                "68c91f4e1f1234567890abcd",
            },
          );

        expect(
          persisted.blocks.every(
            (
              block,
            ) =>
              block.pageId ===
              "68c91f4e1f1234567890abcd",
          ),
        ).toBe(
          true,
        );

        const headerHome =
          persisted.menus
            .find(
              (
                seed,
              ) =>
                seed.key ===
                "header",
            )
            ?.menu.items.find(
              (
                item,
              ) =>
                item.type ===
                "page",
            );

        const footerHome =
          persisted.menus
            .find(
              (
                seed,
              ) =>
                seed.key ===
                "footer",
            )
            ?.menu.items.find(
              (
                item,
              ) =>
                item.type ===
                "page",
            );

        expect(
          headerHome?.pageId,
        ).toBe(
          "68c91f4e1f1234567890abcd",
        );

        expect(
          footerHome?.pageId,
        ).toBe(
          "68c91f4e1f1234567890abcd",
        );
      },
    );

    it(
      "does not mutate the original migration payload",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const migration =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        const before =
          structuredClone(
            migration,
          );

        resolveGenericCmsMigrationReferences(
          migration,
          {
            homepagePageId:
              "68c91f4e1f1234567890abcd",
          },
        );

        expect(
          migration,
        ).toEqual(
          before,
        );
      },
    );

    it(
      "preserves custom menu links while rewriting page links",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const migration =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        const persisted =
          resolveGenericCmsMigrationReferences(
            migration,
            {
              homepagePageId:
                "68c91f4e1f1234567890abcd",
            },
          );

        const appLink =
          persisted.menus
            .find(
              (
                seed,
              ) =>
                seed.key ===
                "header",
            )
            ?.menu.items.find(
              (
                item,
              ) =>
                item.type ===
                "custom",
            );

        expect(
          appLink,
        ).toMatchObject({
          type:
            "custom",

          customUrl:
            siteData.hero
              .playStoreUrl,

          pageId:
            null,

          target:
            "new-tab",
        });
      },
    );

    it(
      "rejects an empty persisted homepage ID",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const migration =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        expect(
          () =>
            resolveGenericCmsMigrationReferences(
              migration,
              {
                homepagePageId:
                  "",
              },
            ),
        ).toThrow(
          "Persisted homepage page ID is required.",
        );
      },
    );
  },
);