import {
  describe,
  expect,
  it,
} from "vitest";

import {
  assertBootstrapApplyConfirmation,
} from "../lib/cms/bootstrap/apply-guard";

const TARGET = {
  siteKey:
    "gps-maps",

  databaseName:
    "gps_maps_website",

  siteUrl:
    "https://gps.example.com",
};

const VALID_ENV = {
  CMS_BOOTSTRAP_CONFIRM_SITE_KEY:
    "gps-maps",

  CMS_BOOTSTRAP_CONFIRM_DATABASE:
    "gps_maps_website",

  CMS_BOOTSTRAP_CONFIRM_SITE_URL:
    "https://gps.example.com",

  CMS_BOOTSTRAP_CONFIRM_APPLY:
    "CREATE_EMPTY_SITE",
};

describe(
  "GAMENEXA bootstrap apply guard",
  () => {
    it(
      "accepts an exact deployment confirmation",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              VALID_ENV,
            ),
        ).not.toThrow();
      },
    );

    it(
      "rejects apply without confirmation",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              {},
            ),
        ).toThrow(
          /confirmation failed/i,
        );
      },
    );

    it(
      "rejects the wrong site key",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              {
                ...VALID_ENV,

                CMS_BOOTSTRAP_CONFIRM_SITE_KEY:
                  "pdf-office",
              },
            ),
        ).toThrow(
          /CMS_BOOTSTRAP_CONFIRM_SITE_KEY/,
        );
      },
    );

    it(
      "rejects the wrong database",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              {
                ...VALID_ENV,

                CMS_BOOTSTRAP_CONFIRM_DATABASE:
                  "pdf_office_website",
              },
            ),
        ).toThrow(
          /CMS_BOOTSTRAP_CONFIRM_DATABASE/,
        );
      },
    );

    it(
      "rejects the wrong site URL",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              {
                ...VALID_ENV,

                CMS_BOOTSTRAP_CONFIRM_SITE_URL:
                  "https://wrong.example.com",
              },
            ),
        ).toThrow(
          /CMS_BOOTSTRAP_CONFIRM_SITE_URL/,
        );
      },
    );

    it(
      "rejects an incorrect confirmation phrase",
      () => {
        expect(
          () =>
            assertBootstrapApplyConfirmation(
              TARGET,
              {
                ...VALID_ENV,

                CMS_BOOTSTRAP_CONFIRM_APPLY:
                  "YES",
              },
            ),
        ).toThrow(
          /CREATE_EMPTY_SITE/,
        );
      },
    );
  },
);
