import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

import {
  buildCmsThemeStyle,
  getCmsBodyFontClass,
  getCmsButtonClass,
  getCmsContainerClass,
  getCmsHeadingFontClass,
  getCmsRadiusClass,
} from "../lib/cms/public/theme";

describe(
  "CMS public theme",
  () => {
    it(
      "maps theme colors into safe CSS variables",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.theme.primaryColor =
          "#112233";

        settings.theme.secondaryColor =
          "#223344";

        settings.theme.accentColor =
          "#334455";

        settings.theme.backgroundColor =
          "#FFFFFF";

        settings.theme.textColor =
          "#111111";

        expect(
          buildCmsThemeStyle(
            settings.theme,
          ),
        ).toEqual({
          "--cms-primary":
            "#112233",

          "--cms-secondary":
            "#223344",

          "--cms-accent":
            "#334455",

          "--cms-background":
            "#FFFFFF",

          "--cms-text":
            "#111111",
        });
      },
    );

    it(
      "maps container width to known classes",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.theme.containerWidth =
          "narrow";

        expect(
          getCmsContainerClass(
            settings.theme,
          ),
        ).toContain(
          "max-w-4xl",
        );

        settings.theme.containerWidth =
          "wide";

        expect(
          getCmsContainerClass(
            settings.theme,
          ),
        ).toContain(
          "max-w-7xl",
        );
      },
    );

    it(
      "maps radius and button styles to controlled classes",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.theme.radiusScale =
          "large";

        settings.theme.buttonStyle =
          "pill";

        expect(
          getCmsRadiusClass(
            settings.theme,
          ),
        ).toContain(
          "rounded",
        );

        expect(
          getCmsButtonClass(
            settings.theme,
          ),
        ).toContain(
          "rounded-full",
        );
      },
    );

    it(
      "maps heading and body fonts to controlled classes",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.theme.headingFont =
          "display";

        settings.theme.bodyFont =
          "serif";

        expect(
          getCmsHeadingFontClass(
            settings.theme,
          ),
        ).toBe(
          "font-display",
        );

        expect(
          getCmsBodyFontClass(
            settings.theme,
          ),
        ).toBe(
          "font-serif",
        );
      },
    );
  },
);