import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildCmsBlockDataFromFormData,
  parseCmsLines,
} from "../lib/admin/cms-block-editor";

describe(
  "CMS block editor",
  () => {
    it(
      "parses line-list fields",
      () => {
        expect(
          parseCmsLines(
            "First item\n\n Second item \nThird item",
          ),
        ).toEqual([
          "First item",
          "Second item",
          "Third item",
        ]);
      },
    );

    it(
      "builds hero block data from registry fields",
      () => {
        const formData =
          new FormData();

        formData.set(
          "field.eyebrow",
          " Welcome ",
        );

        formData.set(
          "field.title",
          " Build Anything ",
        );

        formData.set(
          "field.description",
          "A flexible website.",
        );

        formData.set(
          "field.image",
          "https://example.com/hero.jpg",
        );

        formData.set(
          "field.buttonLabel",
          "Learn More",
        );

        formData.set(
          "field.buttonUrl",
          "/about",
        );

        formData.set(
          "field.alignment",
          "center",
        );

        const result =
          buildCmsBlockDataFromFormData(
            "hero",
            formData,
          );

        expect(
          result,
        ).toEqual({
          eyebrow:
            "Welcome",

          title:
            "Build Anything",

          description:
            "A flexible website.",

          image:
            "https://example.com/hero.jpg",

          buttonLabel:
            "Learn More",

          buttonUrl:
            "/about",

          alignment:
            "center",
        });
      },
    );

    it(
      "converts lines fields into arrays",
      () => {
        const formData =
          new FormData();

        formData.set(
          "field.title",
          "Features",
        );

        formData.set(
          "field.description",
          "What we offer",
        );

        formData.set(
          "field.items",
          "Fast\nSecure\n\nFlexible",
        );

        const result =
          buildCmsBlockDataFromFormData(
            "featureGrid",
            formData,
          );

        expect(
          result.items,
        ).toEqual([
          "Fast",
          "Secure",
          "Flexible",
        ]);
      },
    );

    it(
      "falls back to the registry default for an invalid select option",
      () => {
        const formData =
          new FormData();

        formData.set(
          "field.style",
          "invalid-style",
        );

        const result =
          buildCmsBlockDataFromFormData(
            "divider",
            formData,
          );

        expect(
          result.style,
        ).toBe(
          "line",
        );
      },
    );
  },
);