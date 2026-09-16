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

const NOW =
  new Date(
    "2026-09-16T07:58:00.000Z",
  );

describe(
  "generic CMS migration idempotency",
  () => {
    it(
      "produces the same payload for the same source and timestamp",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const first =
          buildGenericCmsMigration(
            structuredClone(
              legacy,
            ),
            NOW,
          );

        const second =
          buildGenericCmsMigration(
            structuredClone(
              legacy,
            ),
            NOW,
          );

        expect(
          second,
        ).toEqual(
          first,
        );
      },
    );

    it(
      "keeps block order contiguous and deterministic",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const result =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        expect(
          result.blocks.map(
            (
              block,
            ) =>
              block.order,
          ),
        ).toEqual(
          result.blocks.map(
            (
              _,
              index,
            ) =>
              index + 1,
          ),
        );

        expect(
          result.blocks.map(
            (
              block,
            ) =>
              block.type,
          ),
        ).toEqual([
          "hero",
          "stats",
          "cardGrid",
          "featureGrid",
          "cardGrid",
          "featureGrid",
          "featureGrid",
          "faq",
          "download",
        ]);
      },
    );

    it(
      "keeps migration menu keys and item IDs stable",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const result =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        expect(
          result.menus.map(
            (
              seed,
            ) =>
              seed.key,
          ),
        ).toEqual([
          "header",
          "footer",
        ]);

        expect(
          result.menus[0]
            ?.menu.items.map(
              (
                item,
              ) =>
                item.id,
            ),
        ).toEqual([
          "header-1",
          "header-2",
        ]);

        expect(
          result.menus[1]
            ?.menu.items.map(
              (
                item,
              ) =>
                item.id,
            ),
        ).toEqual([
          "footer-1",
          "footer-2",
        ]);
      },
    );

    it(
      "does not generate runtime IDs inside generic records",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const result =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        for (
          const block of
          result.blocks
        ) {
          expect(
            block.pageId,
          ).toBe(
            "home",
          );
        }

        expect(
          result.menus[0]
            ?.menu.items[0]
            ?.pageId,
        ).toBe(
          "home",
        );

        expect(
          result.menus[1]
            ?.menu.items[0]
            ?.pageId,
        ).toBe(
          "home",
        );
      },
    );
  },
);