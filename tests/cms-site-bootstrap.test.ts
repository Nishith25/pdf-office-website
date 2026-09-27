import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildSiteConfig,
} from "../lib/site/config";

import {
  createCmsBootstrapSeed,
} from "../lib/cms/bootstrap";

const NOW =
  new Date(
    "2026-09-26T12:00:00.000Z",
  );

describe(
  "GAMENEXA CMS site bootstrap",
  () => {
    it(
      "creates site-specific CMS settings",
      () => {
        const site =
          buildSiteConfig({
            SITE_KEY:
              "gps-maps",

            SITE_NAME:
              "GPS Maps",

            SITE_SHORT_NAME:
              "GPS",

            SITE_TAGLINE:
              "Explore smarter.",

            SITE_URL:
              "https://maps.example.com",

            MONGODB_DB:
              "gps_maps_website",
          });

        const seed =
          createCmsBootstrapSeed(
            site,
            NOW,
          );

        expect(
          seed.settings.identity.siteName,
        ).toBe(
          "GPS Maps",
        );

        expect(
          seed.settings.identity.shortName,
        ).toBe(
          "GPS",
        );

        expect(
          seed.settings.identity.tagline,
        ).toBe(
          "Explore smarter.",
        );

        expect(
          seed.settings.identity.siteUrl,
        ).toBe(
          "https://maps.example.com",
        );
      },
    );

    it(
      "creates a published homepage",
      () => {
        const site =
          buildSiteConfig({});

        const seed =
          createCmsBootstrapSeed(
            site,
            NOW,
          );

        expect(
          seed.homepage.status,
        ).toBe(
          "published",
        );

        expect(
          seed.homepage.isHomepage,
        ).toBe(
          true,
        );

        expect(
          seed.homepage.slug,
        ).toBe(
          "home",
        );
      },
    );

    it(
      "creates a V2 starter hero",
      () => {
        const site =
          buildSiteConfig({
            SITE_NAME:
              "Example Site",

            SITE_TAGLINE:
              "Example tagline",
          });

        const seed =
          createCmsBootstrapSeed(
            site,
            NOW,
          );

        expect(
          seed.heroData.schemaVersion,
        ).toBe(
          2,
        );

        expect(
          seed.heroData.title,
        ).toBe(
          "Example Site",
        );

        expect(
          seed.heroData.description,
        ).toBe(
          "Example tagline",
        );
      },
    );
  },
);
