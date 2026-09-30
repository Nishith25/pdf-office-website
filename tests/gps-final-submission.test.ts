import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  path:
    string,
) {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "GPS Maps final submission bundle",
  () => {
    it(
      "hardens the administrator login",
      () => {
        const page =
          source(
            "app/admin/login/page.tsx",
          );

        expect(
          page,
        ).toMatch(
          /index:\s*false/,
        );

        expect(
          page,
        ).toMatch(
          /follow:\s*false/,
        );

        expect(
          page,
        ).toContain(
          "administrator portal",
        );

        expect(
          page,
        ).toContain(
          "third-party",
        );
      },
    );

    it(
      "uses site-specific CMS branding",
      () => {
        const shell =
          source(
            "components/admin/AdminShell.tsx",
          );

        expect(
          shell,
        ).toContain(
          "getSiteConfig",
        );

        expect(
          shell,
        ).toContain(
          "site.shortName",
        );
      },
    );

    it(
      "ships click-to-explain public content",
      () => {
        const explainable =
          source(
            "components/cms/public/blocks/ExplainableCopy.tsx",
          );

        expect(
          explainable,
        ).toContain(
          "gps-explainable",
        );

        expect(
          explainable,
        ).toContain(
          "<details",
        );
      },
    );

    it(
      "ships useful homepage section anchors",
      () => {
        expect(
          source(
            "components/cms/public/blocks/CardGridBlock.tsx",
          ),
        ).toContain(
          'id="tools"',
        );

        expect(
          source(
            "components/cms/public/blocks/FeatureGridBlock.tsx",
          ),
        ).toContain(
          'id="features"',
        );

        expect(
          source(
            "components/cms/public/blocks/FaqBlock.tsx",
          ),
        ).toContain(
          'id="faq"',
        );
      },
    );

    it(
      "ships homepage structured data",
      () => {
        const page =
          source(
            "app/page.tsx",
          );

        expect(
          page,
        ).toContain(
          "buildHomepageStructuredData",
        );

        expect(
          page,
        ).toContain(
          "application/ld+json",
        );
      },
    );

    it(
      "guards the production GPS finalizer",
      () => {
        const script =
          source(
            "scripts/finalize-gps-submission.ts",
          );

        expect(
          script,
        ).toMatch(
          /site\.key\s*!==\s*"gps-maps"/,
        );

        expect(
          script,
        ).toMatch(
          /site\.databaseName\s*!==\s*"gps_maps_website"/,
        );

        expect(
          script,
        ).toContain(
          "FINALIZE_GPS_SUBMISSION",
        );
      },
    );
  },
);

describe(
  "GPS Maps Android app marketing",
  () => {
    it(
      "uses real app marketing content",
      () => {
        const script =
          source(
            "scripts/finalize-gps-submission.ts",
          );

        expect(
          script,
        ).toContain(
          "Navigate smarter. Wherever you go.",
        );

        expect(
          script,
        ).toContain(
          "Get it on Google Play",
        );

        expect(
          script,
        ).toContain(
          "Route Planner",
        );

        expect(
          script,
        ).toContain(
          "Live Location Sharing",
        );

        expect(
          script,
        ).toContain(
          "Offline Maps",
        );

        expect(
          script,
        ).toContain(
          "Nearby Explore",
        );

        expect(
          script,
        ).toContain(
          "Digital Compass",
        );

        expect(
          script,
        ).toContain(
          "Multi-language Support",
        );
      },
    );

    it(
      "removes the generic stats section from production",
      () => {
        const script =
          source(
            "scripts/finalize-gps-submission.ts",
          );

        expect(
          script,
        ).toMatch(
          /type:\s*"stats"/,
        );

        expect(
          script,
        ).toMatch(
          /visible:\s*false/,
        );
      },
    );

    it(
      "describes the Android app to search engines",
      () => {
        const data =
          source(
            "lib/cms/public/structured-data.ts",
          );

        expect(
          data,
        ).toContain(
          "MobileApplication",
        );

        expect(
          data,
        ).toContain(
          "NavigationApplication",
        );

        expect(
          data,
        ).toContain(
          "play.google.com/store/apps/details",
        );
      },
    );
  },
);

describe(
  "GPS Maps screenshot-free marketing",
  () => {
    it(
      "does not depend on app screenshots",
      () => {
        const script =
          source(
            "scripts/finalize-gps-submission.ts",
          );

        expect(
          script,
        ).not.toContain(
          "/app-screens/",
        );

        expect(
          script,
        ).not.toContain(
          "App Screens",
        );

        expect(
          script,
        ).toContain(
          "More Tools",
        );
      },
    );
  },
);
