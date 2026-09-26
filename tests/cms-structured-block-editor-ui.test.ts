import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createElement,
} from "react";

import {
  renderToStaticMarkup,
} from "react-dom/server";

import StructuredBlockEditor from "../components/admin/blocks/StructuredBlockEditor";

import {
  createCmsStructuredBlockDefault,
} from "../lib/cms/core/structured-block-defaults";

import type {
  CmsBlockType,
} from "../lib/cms/core/types";

const BLOCK_TYPES: CmsBlockType[] = [
  "hero",
  "richText",
  "imageText",
  "featureGrid",
  "cardGrid",
  "stats",
  "gallery",
  "logoGrid",
  "faq",
  "cta",
  "buttonGroup",
  "download",
  "divider",
  "spacer",
];

function renderEditor(
  type:
    CmsBlockType,

  data:
    Record<
      string,
      unknown
    >,
): string {
  return renderToStaticMarkup(
    createElement(
      StructuredBlockEditor,
      {
        type,
        data,
        onChange:
          () => {},
      },
    ),
  );
}

describe(
  "StructuredBlockEditor",
  () => {
    it(
      "renders every supported CMS block type",
      () => {
        for (
          const type of
          BLOCK_TYPES
        ) {
          const data =
            createCmsStructuredBlockDefault(
              type,
            );

          expect(
            () =>
              renderEditor(
                type,
                data,
              ),
          ).not.toThrow();
        }
      },
    );

    it(
      "renders structured hero controls",
      () => {
        const html =
          renderEditor(
            "hero",
            createCmsStructuredBlockDefault(
              "hero",
            ),
          );

        expect(
          html,
        ).toContain(
          "Eyebrow",
        );

        expect(
          html,
        ).toContain(
          "Badge",
        );

        expect(
          html,
        ).toContain(
          "Title",
        );

        expect(
          html,
        ).toContain(
          "Description",
        );

        expect(
          html,
        ).toContain(
          "Hero Image",
        );

        expect(
          html,
        ).toContain(
          "Primary CTA",
        );

        expect(
          html,
        ).toContain(
          "Secondary CTA",
        );
      },
    );

    it(
      "renders structured image and text controls",
      () => {
        const html =
          renderEditor(
            "imageText",
            createCmsStructuredBlockDefault(
              "imageText",
            ),
          );

        expect(
          html,
        ).toContain(
          "Image Position",
        );

        expect(
          html,
        ).toContain(
          "Call to Action",
        );
      },
    );

    it(
      "renders feature repeater controls",
      () => {
        const data = {
          ...createCmsStructuredBlockDefault(
            "featureGrid",
          ),

          items: [
            {
              id:
                "feature-a",

              eyebrow:
                "Feature",

              title:
                "Fast",

              description:
                "Fast processing",

              icon:
                "Zap",

              image:
                "",

              badge:
                "Popular",

              linkLabel:
                "Learn more",

              linkUrl:
                "/learn",
            },
          ],
        };

        const html =
          renderEditor(
            "featureGrid",
            data,
          );

        expect(
          html,
        ).toContain(
          "Add feature",
        );

        expect(
          html,
        ).toContain(
          "Feature 1",
        );

        expect(
          html,
        ).toContain(
          "Move up",
        );

        expect(
          html,
        ).toContain(
          "Move down",
        );

        expect(
          html,
        ).toContain(
          "Delete item",
        );

        expect(
          html,
        ).toContain(
          "Link Label",
        );

        expect(
          html,
        ).toContain(
          "Link URL",
        );
      },
    );

    it(
      "renders card repeater controls",
      () => {
        const html =
          renderEditor(
            "cardGrid",
            createCmsStructuredBlockDefault(
              "cardGrid",
            ),
          );

        expect(
          html,
        ).toContain(
          "Add card",
        );

        expect(
          html,
        ).toContain(
          "Columns",
        );
      },
    );

    it(
      "renders stats repeater controls",
      () => {
        const html =
          renderEditor(
            "stats",
            createCmsStructuredBlockDefault(
              "stats",
            ),
          );

        expect(
          html,
        ).toContain(
          "Add statistic",
        );
      },
    );

    it(
      "renders gallery repeater controls",
      () => {
        const html =
          renderEditor(
            "gallery",
            createCmsStructuredBlockDefault(
              "gallery",
            ),
          );

        expect(
          html,
        ).toContain(
          "Add image",
        );

        expect(
          html,
        ).toContain(
          "Columns",
        );
      },
    );

    it(
      "renders logo grid repeater controls",
      () => {
        const html =
          renderEditor(
            "logoGrid",
            createCmsStructuredBlockDefault(
              "logoGrid",
            ),
          );

        expect(
          html,
        ).toContain(
          "Add logo",
        );
      },
    );

    it(
      "renders FAQ repeater controls",
      () => {
        const data = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "Can I edit this?",

              answer:
                "Yes.",
            },
          ],
        };

        const html =
          renderEditor(
            "faq",
            data,
          );

        expect(
          html,
        ).toContain(
          "Add question",
        );

        expect(
          html,
        ).toContain(
          "Question",
        );

        expect(
          html,
        ).toContain(
          "Answer",
        );
      },
    );

    it(
      "renders CTA controls",
      () => {
        const html =
          renderEditor(
            "cta",
            createCmsStructuredBlockDefault(
              "cta",
            ),
          );

        expect(
          html,
        ).toContain(
          "Primary CTA",
        );

        expect(
          html,
        ).toContain(
          "Secondary CTA",
        );

        expect(
          html,
        ).toContain(
          "CTA Image",
        );
      },
    );

    it(
      "renders button style and target controls",
      () => {
        const data = {
          ...createCmsStructuredBlockDefault(
            "buttonGroup",
          ),

          buttons: [
            {
              id:
                "button-a",

              label:
                "Download",

              url:
                "/download",

              style:
                "primary" as const,

              target:
                "same-tab" as const,
            },
          ],
        };

        const html =
          renderEditor(
            "buttonGroup",
            data,
          );

        expect(
          html,
        ).toContain(
          "Add button",
        );

        expect(
          html,
        ).toContain(
          "Primary",
        );

        expect(
          html,
        ).toContain(
          "Secondary",
        );

        expect(
          html,
        ).toContain(
          "Text",
        );

        expect(
          html,
        ).toContain(
          "Same tab",
        );

        expect(
          html,
        ).toContain(
          "New tab",
        );
      },
    );

    it(
      "renders app download controls",
      () => {
        const html =
          renderEditor(
            "download",
            createCmsStructuredBlockDefault(
              "download",
            ),
          );

        expect(
          html,
        ).toContain(
          "Google Play URL",
        );

        expect(
          html,
        ).toContain(
          "App Store URL",
        );

        expect(
          html,
        ).toContain(
          "QR Image",
        );

        expect(
          html,
        ).toContain(
          "App Image",
        );
      },
    );

    it(
      "renders divider style controls",
      () => {
        const html =
          renderEditor(
            "divider",
            createCmsStructuredBlockDefault(
              "divider",
            ),
          );

        expect(
          html,
        ).toContain(
          "Divider Style",
        );

        expect(
          html,
        ).toContain(
          "Line",
        );

        expect(
          html,
        ).toContain(
          "Subtle",
        );
      },
    );

    it(
      "renders spacer size controls",
      () => {
        const html =
          renderEditor(
            "spacer",
            createCmsStructuredBlockDefault(
              "spacer",
            ),
          );

        expect(
          html,
        ).toContain(
          "Spacer Size",
        );

        expect(
          html,
        ).toContain(
          "Small",
        );

        expect(
          html,
        ).toContain(
          "Medium",
        );

        expect(
          html,
        ).toContain(
          "Large",
        );
      },
    );
  },
);