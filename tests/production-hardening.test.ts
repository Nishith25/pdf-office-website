import {
  existsSync,
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
  "production hardening",
  () => {
    it(
      "configures baseline response security headers",
      () => {
        const config =
          source(
            "next.config.ts",
          );

        expect(
          config,
        ).toContain(
          "poweredByHeader",
        );

        expect(
          config,
        ).toContain(
          "X-Content-Type-Options",
        );

        expect(
          config,
        ).toContain(
          "Referrer-Policy",
        );

        expect(
          config,
        ).toContain(
          "X-Frame-Options",
        );
      },
    );

    it(
      "protects admin and API paths from search crawling",
      () => {
        const robots =
          source(
            "app/robots.ts",
          );

        expect(
          robots,
        ).toContain(
          '"/admin/"',
        );

        expect(
          robots,
        ).toContain(
          '"/api/"',
        );

        expect(
          robots,
        ).toContain(
          "sitemap.xml",
        );
      },
    );

    it(
      "generates the sitemap from published CMS pages",
      () => {
        const sitemap =
          source(
            "app/sitemap.ts",
          );

        expect(
          sitemap,
        ).toContain(
          "listCmsPages",
        );

        expect(
          sitemap,
        ).toContain(
          '"published"',
        );

        expect(
          sitemap,
        ).toContain(
          "noIndex",
        );
      },
    );

    it(
      "provides public not-found and runtime error boundaries",
      () => {
        expect(
          existsSync(
            "app/not-found.tsx",
          ),
        ).toBe(
          true,
        );

        expect(
          existsSync(
            "app/error.tsx",
          ),
        ).toBe(
          true,
        );
      },
    );

    it(
      "has repository CI for tests and production builds",
      () => {
        const workflow =
          source(
            ".github/workflows/ci.yml",
          );

        expect(
          workflow,
        ).toContain(
          "npm test",
        );

        expect(
          workflow,
        ).toContain(
          "npm run build",
        );
      },
    );

    it(
      "documents the GAMENEXA bootstrap safety flow",
      () => {
        const readme =
          source(
            "README.md",
          );

        expect(
          readme,
        ).toContain(
          "GAMENEXA CMS",
        );

        expect(
          readme,
        ).toContain(
          "site:bootstrap:preview",
        );

        expect(
          readme,
        ).toContain(
          "Never run the bootstrap apply command against an existing production website.",
        );
      },
    );
  },
);
