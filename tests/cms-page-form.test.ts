import {
  describe,
  expect,
  it,
} from "vitest";

import {
  readCmsPageEditorInputFromFormData,
} from "../lib/admin/cms-page-form";

describe(
  "CMS page form",
  () => {
    it(
      "reads a complete page editor payload from FormData",
      () => {
        const formData =
          new FormData();

        formData.set(
          "title",
          " About Us ",
        );

        formData.set(
          "slug",
          " about-us ",
        );

        formData.set(
          "status",
          "published",
        );

        formData.set(
          "isHomepage",
          "true",
        );

        formData.set(
          "seoTitle",
          "About Us",
        );

        formData.set(
          "seoDescription",
          "Learn more about us.",
        );

        formData.set(
          "seoKeywords",
          "company, team",
        );

        formData.set(
          "canonicalUrl",
          "https://example.com/about-us",
        );

        formData.set(
          "ogTitle",
          "About Us",
        );

        formData.set(
          "ogDescription",
          "Learn more about us.",
        );

        formData.set(
          "ogImage",
          "https://example.com/about.jpg",
        );

        formData.set(
          "noIndex",
          "true",
        );

        const result =
          readCmsPageEditorInputFromFormData(
            formData,
          );

        expect(
          result,
        ).toEqual({
          title:
            "About Us",

          slug:
            "about-us",

          status:
            "published",

          isHomepage:
            true,

          seoTitle:
            "About Us",

          seoDescription:
            "Learn more about us.",

          seoKeywords:
            "company, team",

          canonicalUrl:
            "https://example.com/about-us",

          ogTitle:
            "About Us",

          ogDescription:
            "Learn more about us.",

          ogImage:
            "https://example.com/about.jpg",

          noIndex:
            true,
        });
      },
    );

    it(
      "uses safe defaults for absent checkbox fields",
      () => {
        const formData =
          new FormData();

        formData.set(
          "title",
          "Contact",
        );

        formData.set(
          "slug",
          "contact",
        );

        formData.set(
          "status",
          "draft",
        );

        const result =
          readCmsPageEditorInputFromFormData(
            formData,
          );

        expect(
          result.isHomepage,
        ).toBe(false);

        expect(
          result.noIndex,
        ).toBe(false);

        expect(
          result.status,
        ).toBe(
          "draft",
        );
      },
    );
  },
);