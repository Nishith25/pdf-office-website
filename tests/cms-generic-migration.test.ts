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
    "2026-09-15T12:00:00.000Z",
  );

describe(
  "generic CMS migration",
  () => {
    it(
      "maps the existing PDF Office content into generic CMS collections",
      () => {
        const legacy =
          mapLegacyHomepageToCms(
            siteData,
          );

        const before =
          structuredClone(
            legacy,
          );

        const result =
          buildGenericCmsMigration(
            legacy,
            NOW,
          );

        expect(
          result.page.slug,
        ).toBe(
          "home",
        );

        expect(
          result.page.status,
        ).toBe(
          "published",
        );

        expect(
          result.page.isHomepage,
        ).toBe(
          true,
        );

        expect(
          result.settings
            .identity
            .siteName,
        ).toBe(
          siteData.brand.name,
        );

        expect(
          result.settings
            .identity
            .shortName,
        ).toBe(
          siteData.brand
            .shortName,
        );

        expect(
          result.settings
            .externalLinks
            .googlePlayUrl,
        ).toBe(
          siteData.hero
            .playStoreUrl,
        );

        expect(
          result.settings
            .externalLinks
            .primaryCtaUrl,
        ).toBe(
          siteData.hero
            .playStoreUrl,
        );

        const blockTypes =
          result.blocks.map(
            (
              block,
            ) =>
              block.type,
          );

        expect(
          blockTypes,
        ).toContain(
          "hero",
        );

        expect(
          blockTypes,
        ).toContain(
          "stats",
        );

        expect(
          blockTypes,
        ).toContain(
          "cardGrid",
        );

        expect(
          blockTypes,
        ).toContain(
          "featureGrid",
        );

        expect(
          blockTypes,
        ).toContain(
          "faq",
        );

        expect(
          blockTypes,
        ).toContain(
          "download",
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
          result.blocks.every(
            (
              block,
            ) =>
              block.visible,
          ),
        ).toBe(
          true,
        );

        expect(
          result.menus.map(
            (
              item,
            ) =>
              item.key,
          ),
        ).toEqual([
          "header",
          "footer",
        ]);

        expect(
          result.menus[0]
            ?.menu.location,
        ).toBe(
          "header",
        );

        expect(
          result.menus[1]
            ?.menu.location,
        ).toBe(
          "footer",
        );

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
          result.menus[0]
            ?.menu.items[0],
        ).toMatchObject({
          label:
            "Home",

          type:
            "page",

          target:
            "same-tab",

          parentId:
            null,

          enabled:
            true,
        });

        expect(
          result.menus[0]
            ?.menu.items[1],
        ).toMatchObject({
          label:
            "Get the app",

          type:
            "custom",

          customUrl:
            siteData.hero
              .playStoreUrl,

          target:
            "new-tab",

          parentId:
            null,

          enabled:
            true,
        });

        expect(
          legacy,
        ).toEqual(
          before,
        );
      },
    );

    it(
      "maps PDF Office tools and FAQs into literal generic block lines",
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

        const toolsBlock =
          result.blocks.find(
            (
              block,
            ) =>
              block.type ===
                "cardGrid" &&
              block.data
                .title ===
                siteData.tools
                  .title,
          );

        expect(
          toolsBlock,
        ).toBeDefined();

        expect(
          toolsBlock?.data
            .cards,
        ).toEqual(
          siteData.tools.items.map(
            (
              tool,
            ) =>
              tool.name,
          ),
        );

        const faqBlock =
          result.blocks.find(
            (
              block,
            ) =>
              block.type ===
              "faq",
          );

        expect(
          faqBlock,
        ).toBeDefined();

        expect(
          faqBlock?.data
            .items,
        ).toEqual(
          siteData.faq.items.map(
            (
              item,
            ) =>
              `${item.question} — ${item.answer}`,
          ),
        );
      },
    );

    it(
      "uses only deterministic values when the same timestamp is supplied",
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
  },
);