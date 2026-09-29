import {
  existsSync,
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createCmsBootstrapSeed,
} from "../lib/cms/bootstrap";

import {
  buildSiteConfig,
} from "../lib/site/config";

describe(
  "GPS Maps site bundle",
  () => {
    const site =
      buildSiteConfig({
        SITE_KEY:
          "gps-maps",
      });

    const seed =
      createCmsBootstrapSeed(
        site,
        new Date(
          "2026-09-29T00:00:00.000Z",
        ),
      );

    it(
      "creates a complete GPS Maps homepage block set",
      () => {
        expect(
          seed.blocks.map(
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
          "faq",
          "cta",
        ]);
      },
    );

    it(
      "keeps PDF Office content out of the GPS Maps seed",
      () => {
        const serialized =
          JSON.stringify(
            seed,
          );

        expect(
          serialized,
        ).not.toMatch(
          /PDF OFFICE/i,
        );

        expect(
          serialized,
        ).not.toMatch(
          /document workspace/i,
        );

        expect(
          serialized,
        ).not.toMatch(
          /document work/i,
        );
      },
    );

    it(
      "uses GPS Maps visual settings",
      () => {
        expect(
          seed.settings.theme.primaryColor,
        ).toBe(
          "#2563EB",
        );

        expect(
          seed.settings.theme.accentColor,
        ).toBe(
          "#22C55E",
        );

        expect(
          seed.settings.theme.containerWidth,
        ).toBe(
          "wide",
        );

        expect(
          seed.settings.theme.radiusScale,
        ).toBe(
          "large",
        );
      },
    );

    it(
      "ships a dedicated GPS Maps theme",
      () => {
        const css =
          readFileSync(
            "app/globals.css",
            "utf8",
          );

        expect(
          css,
        ).toContain(
          '[data-site-theme="gps-maps-navigation"]',
        );

        expect(
          css,
        ).toContain(
          "--gps-map-blue",
        );
      },
    );

    it(
      "ships a GPS Maps admin brand asset",
      () => {
        expect(
          existsSync(
            "public/gps-maps-icon.svg",
          ),
        ).toBe(
          true,
        );
      },
    );

    it(
      "teaches the fresh-site bootstrap to insert every seeded block",
      () => {
        const bootstrap =
          readFileSync(
            "scripts/bootstrap-gamenexa-site.ts",
            "utf8",
          );

        expect(
          bootstrap,
        ).toContain(
          "seed.blocks",
        );

        expect(
          bootstrap,
        ).toContain(
          "insertMany",
        );
      },
    );
  },
);
