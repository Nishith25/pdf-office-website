import {
  createElement,
} from "react";

import {
  renderToStaticMarkup,
} from "react-dom/server";

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsBlock,
  CmsBlockType,
} from "../lib/cms/core/types";

import PublicBlockRenderer from "../components/cms/public/PublicBlockRenderer";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
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
  "public CMS block renderer",
  () => {
    it(
      "renders hero content from the registered block fields",
      () => {
        const html =
          render(
            block(
              "hero",
              {
                eyebrow:
                  "Introducing",

                title:
                  "Build Anything",

                description:
                  "A generic CMS hero.",

                image:
                  "https://example.com/hero.jpg",

                buttonLabel:
                  "Get Started",

                buttonUrl:
                  "/start",

                alignment:
                  "center",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Introducing",
        );

        expect(
          html,
        ).toContain(
          "Build Anything",
        );

        expect(
          html,
        ).toContain(
          "A generic CMS hero.",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/hero.jpg",
        );

        expect(
          html,
        ).toContain(
          "Get Started",
        );

        expect(
          html,
        ).toContain(
          'href="/start"',
        );
      },
    );

    it(
      "renders rich text",
      () => {
        const html =
          render(
            block(
              "richText",
              {
                title:
                  "Our Story",

                body:
                  "Long-form content goes here.",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Our Story",
        );

        expect(
          html,
        ).toContain(
          "Long-form content goes here.",
        );
      },
    );

    it(
      "renders image and text",
      () => {
        const html =
          render(
            block(
              "imageText",
              {
                eyebrow:
                  "Overview",

                title:
                  "Image Section",

                description:
                  "Supporting text.",

                image:
                  "https://example.com/section.jpg",

                imagePosition:
                  "left",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Overview",
        );

        expect(
          html,
        ).toContain(
          "Image Section",
        );

        expect(
          html,
        ).toContain(
          "Supporting text.",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/section.jpg",
        );
      },
    );

    it(
      "renders feature-grid line items",
      () => {
        const html =
          render(
            block(
              "featureGrid",
              {
                title:
                  "Features",

                description:
                  "Everything you need.",

                items: [
                  "Fast setup",
                  "Reusable content",
                  "Responsive design",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Features",
        );

        expect(
          html,
        ).toContain(
          "Fast setup",
        );

        expect(
          html,
        ).toContain(
          "Reusable content",
        );

        expect(
          html,
        ).toContain(
          "Responsive design",
        );
      },
    );

    it(
      "renders card-grid lines",
      () => {
        const html =
          render(
            block(
              "cardGrid",
              {
                title:
                  "Explore",

                description:
                  "Grouped content.",

                cards: [
                  "Card One",
                  "Card Two",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Explore",
        );

        expect(
          html,
        ).toContain(
          "Card One",
        );

        expect(
          html,
        ).toContain(
          "Card Two",
        );
      },
    );

    it(
      "renders statistics",
      () => {
        const html =
          render(
            block(
              "stats",
              {
                title:
                  "Numbers",

                items: [
                  "100+ Customers",
                  "25 Countries",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Numbers",
        );

        expect(
          html,
        ).toContain(
          "100+ Customers",
        );

        expect(
          html,
        ).toContain(
          "25 Countries",
        );
      },
    );

    it(
      "renders gallery image URLs",
      () => {
        const html =
          render(
            block(
              "gallery",
              {
                title:
                  "Gallery",

                images: [
                  "https://example.com/a.jpg",
                  "https://example.com/b.jpg",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Gallery",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/a.jpg",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/b.jpg",
        );
      },
    );

    it(
      "renders logo-grid image URLs",
      () => {
        const html =
          render(
            block(
              "logoGrid",
              {
                title:
                  "Trusted By",

                logos: [
                  "https://example.com/logo-a.png",
                  "https://example.com/logo-b.png",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Trusted By",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/logo-a.png",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/logo-b.png",
        );
      },
    );

    it(
      "renders FAQ line items without inventing a data format",
      () => {
        const html =
          render(
            block(
              "faq",
              {
                title:
                  "Frequently Asked Questions",

                items: [
                  "How does this work?",
                  "Can I change this later?",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Frequently Asked Questions",
        );

        expect(
          html,
        ).toContain(
          "How does this work?",
        );

        expect(
          html,
        ).toContain(
          "Can I change this later?",
        );
      },
    );

    it(
      "renders CTA content and destination",
      () => {
        const html =
          render(
            block(
              "cta",
              {
                title:
                  "Ready to begin?",

                description:
                  "Start building today.",

                buttonLabel:
                  "Start Now",

                buttonUrl:
                  "/start",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Ready to begin?",
        );

        expect(
          html,
        ).toContain(
          "Start building today.",
        );

        expect(
          html,
        ).toContain(
          "Start Now",
        );

        expect(
          html,
        ).toContain(
          'href="/start"',
        );
      },
    );

    it(
      "renders button-group lines literally",
      () => {
        const html =
          render(
            block(
              "buttonGroup",
              {
                title:
                  "Choose an Option",

                buttons: [
                  "Option One",
                  "Option Two",
                ],
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Choose an Option",
        );

        expect(
          html,
        ).toContain(
          "Option One",
        );

        expect(
          html,
        ).toContain(
          "Option Two",
        );
      },
    );

    it(
      "renders download content",
      () => {
        const html =
          render(
            block(
              "download",
              {
                title:
                  "Download",

                description:
                  "Get the application.",

                buttonLabel:
                  "Download Now",

                buttonUrl:
                  "https://example.com/download",

                image:
                  "https://example.com/device.png",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Download",
        );

        expect(
          html,
        ).toContain(
          "Get the application.",
        );

        expect(
          html,
        ).toContain(
          "Download Now",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/device.png",
        );

        expect(
          html,
        ).toContain(
          'href="https://example.com/download"',
        );
      },
    );

    it(
      "renders a divider",
      () => {
        const html =
          render(
            block(
              "divider",
              {
                style:
                  "subtle",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "<hr",
        );
      },
    );

    it(
      "renders a spacer with no user content",
      () => {
        const html =
          render(
            block(
              "spacer",
              {
                size:
                  "large",
              },
            ),
          );

        expect(
          html,
        ).toContain(
          'aria-hidden="true"',
        );
      },
    );
  },
);