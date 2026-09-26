import {
  createElement,
} from "react";

import {
  renderToStaticMarkup,
} from "react-dom/server";

import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

import PublicBlockRenderer from "../components/cms/public/PublicBlockRenderer";

import type {
  CmsBlock,
  CmsBlockType,
} from "../lib/cms/core/types";

const NOW =
  new Date(
    "2026-09-26T12:00:00.000Z",
  );

function block(
  type:
    CmsBlockType,

  data:
    Record<
      string,
      unknown
    >,
): CmsBlock {
  return {
    pageId:
      "page-1",

    type,

    order:
      1,

    visible:
      true,

    data,

    createdAt:
      NOW,

    updatedAt:
      NOW,
  };
}

function render(
  value:
    CmsBlock,
): string {
  return renderToStaticMarkup(
    createElement(
      PublicBlockRenderer,
      {
        block:
          value,
      },
    ),
  );
}

describe(
  "V2 CMS public controls",
  () => {
    it(
      "does not use the legacy public projection anymore",
      () => {
        const source =
          readFileSync(
            "components/cms/public/PublicBlockRenderer.tsx",
            "utf8",
          );

        expect(
          source,
        ).toContain(
          "normalizeCmsBlockData",
        );

        expect(
          source,
        ).not.toContain(
          "projectCmsBlockDataForLegacyRenderer",
        );
      },
    );

    it(
      "renders structured hero badge and both CTAs",
      () => {
        const html =
          render(
            block(
              "hero",
              {
                schemaVersion:
                  2,

                eyebrow:
                  "PDF Office",

                badge:
                  "All-in-one",

                title:
                  "Work with PDFs.",

                description:
                  "Everything in one place.",

                image:
                  "",

                primaryCta: {
                  label:
                    "Get the app",

                  url:
                    "/download",
                },

                secondaryCta: {
                  label:
                    "Explore tools",

                  url:
                    "/tools",
                },

                presentation: {
                  background:
                    "accent",

                  width:
                    "wide",

                  spacing:
                    "spacious",

                  alignment:
                    "center",

                  variant:
                    "centered",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "All-in-one",
        );

        expect(
          html,
        ).toContain(
          'href="/download"',
        );

        expect(
          html,
        ).toContain(
          'href="/tools"',
        );

        expect(
          html,
        ).toContain(
          "pdf-bg-accent",
        );

        expect(
          html,
        ).toContain(
          "pdf-width-wide",
        );

        expect(
          html,
        ).toContain(
          "pdf-spacing-spacious",
        );

        expect(
          html,
        ).toContain(
          "pdf-align-center",
        );

        expect(
          html,
        ).toContain(
          "pdf-variant-centered",
        );
      },
    );

    it(
      "renders full structured card fields",
      () => {
        const html =
          render(
            block(
              "cardGrid",
              {
                schemaVersion:
                  2,

                title:
                  "Tools",

                description:
                  "Choose a workflow.",

                columns:
                  3,

                cards: [
                  {
                    id:
                      "card-1",

                    title:
                      "Merge PDF",

                    description:
                      "Combine documents.",

                    image:
                      "https://example.com/merge.png",

                    icon:
                      "merge",

                    badge:
                      "Popular",

                    linkLabel:
                      "Open tool",

                    linkUrl:
                      "/merge",
                  },
                ],

                presentation: {
                  background:
                    "muted",

                  width:
                    "standard",

                  spacing:
                    "normal",

                  alignment:
                    "left",

                  variant:
                    "showcase",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Merge PDF",
        );

        expect(
          html,
        ).toContain(
          "Combine documents.",
        );

        expect(
          html,
        ).toContain(
          "Popular",
        );

        expect(
          html,
        ).toContain(
          "merge",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/merge.png",
        );

        expect(
          html,
        ).toContain(
          'href="/merge"',
        );

        expect(
          html,
        ).toContain(
          "Open tool",
        );
      },
    );

    it(
      "renders statistic descriptions",
      () => {
        const html =
          render(
            block(
              "stats",
              {
                schemaVersion:
                  2,

                title:
                  "Highlights",

                items: [
                  {
                    id:
                      "stat-1",

                    value:
                      "13+",

                    label:
                      "PDF tools",

                    description:
                      "One mobile workspace.",
                  },
                ],

                presentation: {
                  background:
                    "default",

                  width:
                    "standard",

                  spacing:
                    "normal",

                  alignment:
                    "center",

                  variant:
                    "cards",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "13+",
        );

        expect(
          html,
        ).toContain(
          "PDF tools",
        );

        expect(
          html,
        ).toContain(
          "One mobile workspace.",
        );
      },
    );

    it(
      "renders gallery accessibility and captions",
      () => {
        const html =
          render(
            block(
              "gallery",
              {
                schemaVersion:
                  2,

                title:
                  "Gallery",

                columns:
                  2,

                images: [
                  {
                    id:
                      "image-1",

                    image:
                      "https://example.com/screen.png",

                    altText:
                      "PDF Office scanner screen",

                    caption:
                      "Scan documents quickly.",
                  },
                ],

                presentation: {
                  background:
                    "default",

                  width:
                    "wide",

                  spacing:
                    "normal",

                  alignment:
                    "left",

                  variant:
                    "showcase",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          'alt="PDF Office scanner screen"',
        );

        expect(
          html,
        ).toContain(
          "Scan documents quickly.",
        );
      },
    );

    it(
      "renders logo links",
      () => {
        const html =
          render(
            block(
              "logoGrid",
              {
                schemaVersion:
                  2,

                title:
                  "Trusted by",

                logos: [
                  {
                    id:
                      "logo-1",

                    image:
                      "https://example.com/logo.png",

                    name:
                      "Example",

                    url:
                      "https://example.com",
                  },
                ],

                presentation: {
                  background:
                    "default",

                  width:
                    "standard",

                  spacing:
                    "normal",

                  alignment:
                    "center",

                  variant:
                    "grid",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          'href="https://example.com"',
        );

        expect(
          html,
        ).toContain(
          'alt="Example"',
        );
      },
    );

    it(
      "renders real button group links with style and target",
      () => {
        const html =
          render(
            block(
              "buttonGroup",
              {
                schemaVersion:
                  2,

                title:
                  "Actions",

                buttons: [
                  {
                    id:
                      "button-1",

                    label:
                      "Open docs",

                    url:
                      "https://example.com/docs",

                    style:
                      "secondary",

                    target:
                      "new-tab",
                  },
                ],

                presentation: {
                  background:
                    "default",

                  width:
                    "standard",

                  spacing:
                    "compact",

                  alignment:
                    "left",

                  variant:
                    "inline",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          'href="https://example.com/docs"',
        );

        expect(
          html,
        ).toContain(
          'target="_blank"',
        );

        expect(
          html,
        ).toContain(
          'rel="noopener noreferrer"',
        );

        expect(
          html,
        ).toContain(
          "pdf-button-secondary",
        );
      },
    );

    it(
      "renders both app store destinations and QR artwork",
      () => {
        const html =
          render(
            block(
              "download",
              {
                schemaVersion:
                  2,

                eyebrow:
                  "Download",

                title:
                  "Take PDF Office anywhere.",

                description:
                  "Available on mobile.",

                image:
                  "",

                googlePlayUrl:
                  "https://play.google.com/example",

                appStoreUrl:
                  "https://apps.apple.com/example",

                qrImage:
                  "https://example.com/qr.png",

                presentation: {
                  background:
                    "contrast",

                  width:
                    "wide",

                  spacing:
                    "spacious",

                  alignment:
                    "left",

                  variant:
                    "device",
                },
              },
            ),
          );

        expect(
          html,
        ).toContain(
          'href="https://play.google.com/example"',
        );

        expect(
          html,
        ).toContain(
          'href="https://apps.apple.com/example"',
        );

        expect(
          html,
        ).toContain(
          "https://example.com/qr.png",
        );
      },
    );
  },
);
