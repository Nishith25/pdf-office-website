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

describe(
  "mapLegacyHomepageToCms",
  () => {
    it(
      "maps the existing homepage into CMS collections",
      () => {
        const result =
          mapLegacyHomepageToCms(
            siteData,
          );

        expect(
          result.page.slug,
        ).toBe(
          "home",
        );

        expect(
          result.settings.brandName,
        ).toBe(
          siteData.brand.name,
        );

        expect(
          result.settings.playStoreUrl,
        ).toBe(
          siteData.hero.playStoreUrl,
        );

        expect(
          result.sections.map(
            (section) =>
              section.key,
          ),
        ).toEqual([
          "hero",
          "scanWorkflow",
          "ocr",
          "convertOrganize",
          "esign",
          "download",
        ]);

        expect(
          result.tools,
        ).toHaveLength(
          siteData.tools.items.length,
        );

        expect(
          result.tools[0]?.order,
        ).toBe(1);

        expect(
          result.faqs,
        ).toHaveLength(
          siteData.faq.items.length,
        );

        expect(
          result.faqs[0]?.order,
        ).toBe(1);
      },
    );
  },
);