import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildSiteConfig,
} from "../lib/site/config";

describe(
  "GPS Maps GAMENEXA site profile",
  () => {
    it(
      "loads GPS Maps defaults from its site key",
      () => {
        const config =
          buildSiteConfig({
            SITE_KEY:
              "gps-maps",
          });

        expect(
          config.key,
        ).toBe(
          "gps-maps",
        );

        expect(
          config.name,
        ).toBe(
          "GPS Maps",
        );

        expect(
          config.shortName,
        ).toBe(
          "GPS Maps",
        );

        expect(
          config.tagline,
        ).toBe(
          "Navigation • Offline Maps • Weather • Live Location",
        );

        expect(
          config.databaseName,
        ).toBe(
          "gps_maps_website",
        );

        expect(
          config.mediaFolder,
        ).toBe(
          "gps-maps",
        );

        expect(
          config.themeKey,
        ).toBe(
          "gps-maps-navigation",
        );

        expect(
          config.adminSessionSubject,
        ).toBe(
          "gps-maps-admin",
        );
      },
    );

    it(
      "keeps PDF Office as the default profile",
      () => {
        const config =
          buildSiteConfig({});

        expect(
          config.key,
        ).toBe(
          "pdf-office",
        );

        expect(
          config.name,
        ).toBe(
          "PDF Office – Doc Scanner",
        );

        expect(
          config.themeKey,
        ).toBe(
          "pdf-office-product-editorial",
        );

        expect(
          config.databaseName,
        ).toBe(
          "pdf_office_website",
        );
      },
    );

    it(
      "allows deployment environment values to override GPS defaults",
      () => {
        const config =
          buildSiteConfig({
            SITE_KEY:
              "gps-maps",

            SITE_NAME:
              "GPS Earth Maps",

            SITE_URL:
              "https://maps.example.com",

            SITE_THEME_KEY:
              "gps-maps-custom",
          });

        expect(
          config.name,
        ).toBe(
          "GPS Earth Maps",
        );

        expect(
          config.siteUrl,
        ).toBe(
          "https://maps.example.com",
        );

        expect(
          config.themeKey,
        ).toBe(
          "gps-maps-custom",
        );

        expect(
          config.databaseName,
        ).toBe(
          "gps_maps_website",
        );

        expect(
          config.mediaFolder,
        ).toBe(
          "gps-maps",
        );
      },
    );
  },
);
