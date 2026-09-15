import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildCmsSettingsFromAppearance,
  cmsAppearanceEditorSchema,
  readCmsAppearanceFromFormData,
} from "../lib/admin/cms-appearance-editor";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

const NOW =
  new Date(
    "2026-09-15T10:00:00.000Z",
  );

describe(
  "CMS appearance editor",
  () => {
    it(
      "reads appearance fields from FormData",
      () => {
        const formData =
          new FormData();

        formData.set(
          "siteName",
          " Example Site ",
        );

        formData.set(
          "shortName",
          " Example ",
        );

        formData.set(
          "tagline",
          " Built for everyone ",
        );

        formData.set(
          "siteUrl",
          "https://example.com",
        );

        formData.set(
          "logo",
          "https://example.com/logo.png",
        );

        formData.set(
          "primaryColor",
          "#2563EB",
        );

        formData.set(
          "buttonStyle",
          "rounded",
        );

        formData.set(
          "radiusScale",
          "medium",
        );

        formData.set(
          "containerWidth",
          "standard",
        );

        const result =
          readCmsAppearanceFromFormData(
            formData,
          );

        expect(
          result.siteName,
        ).toBe(
          "Example Site",
        );

        expect(
          result.shortName,
        ).toBe(
          "Example",
        );

        expect(
          result.tagline,
        ).toBe(
          "Built for everyone",
        );

        expect(
          result.primaryColor,
        ).toBe(
          "#2563EB",
        );
      },
    );

    it(
      "rejects malformed colors",
      () => {
        const defaults =
          readCmsAppearanceFromFormData(
            new FormData(),
          );

        const result =
          cmsAppearanceEditorSchema.safeParse({
            ...defaults,

            primaryColor:
              "blue",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "rejects invalid URLs when provided",
      () => {
        const defaults =
          readCmsAppearanceFromFormData(
            new FormData(),
          );

        const result =
          cmsAppearanceEditorSchema.safeParse({
            ...defaults,

            siteUrl:
              "not-a-url",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "builds global CMS settings while preserving the settings key",
      () => {
        const existing =
          createDefaultCmsSettings();

        const input =
          readCmsAppearanceFromFormData(
            new FormData(),
          );

        const result =
          buildCmsSettingsFromAppearance(
            {
              ...input,

              siteName:
                "Acme",

              primaryColor:
                "#112233",

              backgroundColor:
                "#FFFFFF",

              textColor:
                "#111111",
            },

            existing,

            NOW,
          );

        expect(
          result.key,
        ).toBe(
          "global",
        );

        expect(
          result.identity.siteName,
        ).toBe(
          "Acme",
        );

        expect(
          result.theme.primaryColor,
        ).toBe(
          "#112233",
        );

        expect(
          result.updatedAt,
        ).toEqual(
          NOW,
        );
      },
    );
  },
);