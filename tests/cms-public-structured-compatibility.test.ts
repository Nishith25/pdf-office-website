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

import PublicBlockRenderer from "../components/cms/public/PublicBlockRenderer";

import type {
  CmsBlock,
} from "../lib/cms/core/types";

const NOW =
  new Date(
    "2026-09-16T10:00:00.000Z",
  );

function renderBlock(
  block:
    CmsBlock,
): string {
  return renderToStaticMarkup(
    createElement(
      PublicBlockRenderer,
      {
        block,
      },
    ),
  );
}

describe(
  "structured CMS public compatibility",
  () => {
    it(
      "renders structured stats through the current public component",
      () => {
        const html =
          renderBlock({
            pageId:
              "page-1",

            type:
              "stats",

            order:
              1,

            visible:
              true,

            data: {
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
                    "PDF Tools",

                  description:
                    "",
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

            createdAt:
              NOW,

            updatedAt:
              NOW,
          });

        expect(
          html,
        ).toContain(
          "13+ — PDF Tools",
        );
      },
    );

    it(
      "renders structured FAQ question and answer without losing either value",
      () => {
        const html =
          renderBlock({
            pageId:
              "page-1",

            type:
              "faq",

            order:
              1,

            visible:
              true,

            data: {
              schemaVersion:
                2,

              title:
                "FAQ",

              description:
                "",

              items: [
                {
                  id:
                    "faq-1",

                  question:
                    "Can I edit this?",

                  answer:
                    "Yes.",
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
                  "left",

                variant:
                  "stacked",
              },
            },

            createdAt:
              NOW,

            updatedAt:
              NOW,
          });

        expect(
          html,
        ).toContain(
          "Can I edit this? — Yes.",
        );
      },
    );

    it(
      "still renders legacy hero input",
      () => {
        const html =
          renderBlock({
            pageId:
              "page-1",

            type:
              "hero",

            order:
              1,

            visible:
              true,

            data: {
              title:
                "Legacy Hero",

              description:
                "Still supported.",

              buttonLabel:
                "Open",

              buttonUrl:
                "/open",

              alignment:
                "left",

              eyebrow:
                "",

              image:
                "",
            },

            createdAt:
              NOW,

            updatedAt:
              NOW,
          });

        expect(
          html,
        ).toContain(
          "Legacy Hero",
        );

        expect(
          html,
        ).toContain(
          'href="/open"',
        );
      },
    );
  },
);