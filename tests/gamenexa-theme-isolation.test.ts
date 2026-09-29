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
): string {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "GAMENEXA public theme isolation",
  () => {
    it(
      "selects the public theme from the site configuration",
      () => {
        const shell =
          source(
            "components/cms/public/PublicSiteShell.tsx",
          );

        expect(
          shell,
        ).toContain(
          "getSiteConfig",
        );

        expect(
          shell,
        ).toContain(
          "data-site-theme",
        );

        expect(
          shell,
        ).toContain(
          "site.themeKey",
        );

        expect(
          shell,
        ).not.toContain(
          "data-pdf-theme",
        );
      },
    );

    it(
      "uses generic CMS block metadata",
      () => {
        const renderer =
          source(
            "components/cms/public/PublicBlockRenderer.tsx",
          );

        expect(
          renderer,
        ).toContain(
          "data-cms-block",
        );

        expect(
          renderer,
        ).toContain(
          "data-cms-schema-version",
        );

        expect(
          renderer,
        ).not.toContain(
          "data-pdf-block",
        );
      },
    );

    it(
      "does not hardcode PDF as the shared header fallback brand",
      () => {
        const header =
          source(
            "components/cms/public/PublicHeader.tsx",
          );

        expect(
          header,
        ).toContain(
          "identity.shortName",
        );

        expect(
          header,
        ).not.toMatch(
          />\s*PDF\s*</,
        );
      },
    );

    it(
      "scopes PDF Office presentation styles to its configured theme",
      () => {
        const styles =
          source(
            "app/globals.css",
          );

        expect(
          styles,
        ).toContain(
          '[data-site-theme="pdf-office-product-editorial"]',
        );

        expect(
          styles,
        ).not.toMatch(
          /(^|\})\s*\.pdf-shell\s*\{/,
        );
      },
    );

    it(
      "does not hardcode PDF as the shared footer fallback brand",
      () => {
        const footer =
          source(
            "components/cms/public/PublicFooter.tsx",
          );

        expect(
          footer,
        ).toContain(
          "identity.shortName",
        );

        expect(
          footer,
        ).not.toMatch(
          />\s*PDF\s*</,
        );
      },
    );
  },
);
