import {
  existsSync,
  readFileSync,
} from "node:fs";

import {
  resolve,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  path:
    string,
) {
  const absolute =
    resolve(
      process.cwd(),
      path,
    );

  if (
    !existsSync(
      absolute,
    )
  ) {
    return "";
  }

  return readFileSync(
    absolute,
    "utf8",
  );
}

describe(
  "GPS Maps cartographic homepage",
  () => {
    it(
      "uses a GPS-specific public renderer",
      () => {
        const page =
          source(
            "app/page.tsx",
          );

        expect(
          page,
        ).toContain(
          "GpsHomeExperience",
        );

        expect(
          page,
        ).toMatch(
          /site\.key\s*===\s*"gps-maps"/,
        );
      },
    );

    it(
      "has a bespoke cartographic experience",
      () => {
        const component =
          source(
            "components/gps/GpsHomeExperience.tsx",
          );

        expect(
          component,
        ).toContain(
          "gpsx-map-stage",
        );

        expect(
          component,
        ).toContain(
          "gpsx-feature-rail",
        );

        expect(
          component,
        ).toContain(
          "gpsx-location-section",
        );

        expect(
          component,
        ).toContain(
          "gpsx-tool-index",
        );
      },
    );

    it(
      "keeps the product screenshot free",
      () => {
        const component =
          source(
            "components/gps/GpsHomeExperience.tsx",
          );

        expect(
          component,
        ).not.toContain(
          "app-screens",
        );

        expect(
          component,
        ).not.toContain(
          "<img",
        );
      },
    );

    it(
      "surfaces recent CMS blog posts",
      () => {
        const page =
          source(
            "app/page.tsx",
          );

        expect(
          page,
        ).toContain(
          "listPublishedCmsBlogPosts",
        );

        const experience =
          source(
            "components/gps/GpsHomeExperience.tsx",
          );

        expect(
          experience,
        ).toContain(
          "Recent from",
        );

        expect(
          experience,
        ).toContain(
          "the journal.",
        );

        expect(
          experience,
        ).toContain(
          "recentPosts",
        );
      },
    );

    it(
      "keeps PDF Office on the generic renderer",
      () => {
        const page =
          source(
            "app/page.tsx",
          );

        expect(
          page,
        ).toContain(
          "<PublicCmsPage",
        );
      },
    );
  },
);
