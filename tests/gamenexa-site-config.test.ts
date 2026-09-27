import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildSiteConfig,
} from "../lib/site/config";

describe(
  "GAMENEXA site configuration",
  () => {
    it(
      "loads the PDF Office site profile by default",
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
          config.shortName,
        ).toBe(
          "PDF Office",
        );

        expect(
          config.databaseName,
        ).toBe(
          "pdf_office_website",
        );

        expect(
          config.adminSessionSubject,
        ).toBe(
          "pdf-office-admin",
        );
      },
    );

    it(
      "supports a completely separate deployment configuration",
      () => {
        const config =
          buildSiteConfig({
            SITE_KEY:
              "gps-maps",

            SITE_NAME:
              "GPS Maps",

            SITE_SHORT_NAME:
              "GPS Maps",

            SITE_TAGLINE:
              "Explore the world.",

            SITE_URL:
              "https://maps.example.com",

            MONGODB_DB:
              "gps_maps_website",
          });

        expect(
          config.key,
        ).toBe(
          "gps-maps",
        );

        expect(
          config.databaseName,
        ).toBe(
          "gps_maps_website",
        );

        expect(
          config.adminSessionSubject,
        ).toBe(
          "gps-maps-admin",
        );

        expect(
          config.siteUrl,
        ).toBe(
          "https://maps.example.com",
        );
      },
    );

    it(
      "derives an isolated database when a new site key is supplied",
      () => {
        const config =
          buildSiteConfig({
            SITE_KEY:
              "gps-maps",
          });

        expect(
          config.databaseName,
        ).toBe(
          "gps_maps_website",
        );
      },
    );

    it(
      "rejects unsafe site keys",
      () => {
        expect(
          () =>
            buildSiteConfig({
              SITE_KEY:
                "GPS Maps !!!",
            }),
        ).toThrow();
      },
    );
  },
);
