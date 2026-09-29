import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

const shell =
  readFileSync(
    "components/cms/public/PublicSiteShell.tsx",
    "utf8",
  );

const header =
  readFileSync(
    "components/cms/public/PublicHeader.tsx",
    "utf8",
  );

const renderer =
  readFileSync(
    "components/cms/public/PublicBlockRenderer.tsx",
    "utf8",
  );

const hero =
  readFileSync(
    "components/cms/public/blocks/HeroBlock.tsx",
    "utf8",
  );

const faq =
  readFileSync(
    "components/cms/public/blocks/FaqBlock.tsx",
    "utf8",
  );

const styles =
  readFileSync(
    "app/globals.css",
    "utf8",
  );

describe(
  "PDF Office professional public theme",
  () => {
    it(
      "marks the public site with the configured site theme",
      () => {
        expect(
          shell,
        ).toContain(
          "data-site-theme",
        );

        expect(
          styles,
        ).toContain(
          ".pdf-shell",
        );
      },
    );

    it(
      "uses the redesigned professional site header",
      () => {
        expect(
          header,
        ).toContain(
          "pdf-site-header",
        );

        expect(
          header,
        ).toContain(
          "pdf-brand",
        );
      },
    );

    it(
      "labels public blocks for theme-specific composition",
      () => {
        expect(
          renderer,
        ).toContain(
          "data-cms-block",
        );
      },
    );

    it(
      "uses a product-led hero instead of the generic CMS hero",
      () => {
        expect(
          hero,
        ).toContain(
          "pdf-hero",
        );

        expect(
          hero,
        ).toContain(
          "pdf-product-stage",
        );
      },
    );

    it(
      "uses a structured editorial FAQ treatment",
      () => {
        expect(
          faq,
        ).toContain(
          "pdf-faq",
        );

        expect(
          faq,
        ).toContain(
          "<details",
        );
      },
    );
  },
);
