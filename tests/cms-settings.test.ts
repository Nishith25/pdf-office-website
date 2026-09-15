import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

describe(
  "CMS settings",
  () => {
    it(
      "creates generic defaults without product-specific content",
      () => {
        const settings =
          createDefaultCmsSettings();

        expect(
          settings.key,
        ).toBe(
          "global",
        );

        expect(
          settings.identity
            .siteName,
        ).toBe(
          "Website",
        );

        expect(
          settings.identity
            .shortName,
        ).toBe(
          "Website",
        );

        expect(
          JSON.stringify(
            settings,
          ),
        ).not.toMatch(
          /PDF Office|GPS Maps|Scanner|eSign|OCR/i,
        );
      },
    );

    it(
      "provides valid generic theme defaults",
      () => {
        const settings =
          createDefaultCmsSettings();

        expect(
          settings.theme
            .primaryColor,
        ).toMatch(
          /^#[0-9A-Fa-f]{6}$/,
        );

        expect(
          settings.theme
            .containerWidth,
        ).toBe(
          "standard",
        );
      },
    );
  },
);