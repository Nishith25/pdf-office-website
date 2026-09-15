import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildCmsPageFromEditor,
  cmsPageEditorInputSchema,
  parseCmsKeywords,
} from "../lib/admin/cms-page-editor";

const NOW =
  new Date(
    "2026-09-15T09:00:00.000Z",
  );

describe(
  "CMS page editor",
  () => {
    it(
      "parses and deduplicates keywords",
      () => {
        expect(
          parseCmsKeywords(
            "Documents, Scanner\nOCR, documents, Mobile",
          ),
        ).toEqual([
          "Documents",
          "Scanner",
          "OCR",
          "Mobile",
        ]);
      },
    );

    it(
      "validates a generic page editor payload",
      () => {
        const result =
          cmsPageEditorInputSchema.safeParse({
            title:
              "About Us",

            slug:
              "about-us",

            status:
              "draft",

            isHomepage:
              false,

            seoTitle:
              "About Us",

            seoDescription:
              "About our company.",

            seoKeywords:
              "company, about",

            canonicalUrl:
              "",

            ogTitle:
              "About Us",

            ogDescription:
              "About our company.",

            ogImage:
              "",

            noIndex:
              false,
          });

        expect(
          result.success,
        ).toBe(true);
      },
    );

    it(
      "rejects a reserved slug",
      () => {
        const result =
          cmsPageEditorInputSchema.safeParse({
            title:
              "Admin",

            slug:
              "admin",

            status:
              "draft",

            isHomepage:
              false,

            seoTitle:
              "",

            seoDescription:
              "",

            seoKeywords:
              "",

            canonicalUrl:
              "",

            ogTitle:
              "",

            ogDescription:
              "",

            ogImage:
              "",

            noIndex:
              true,
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "builds a new CMS page from editor input",
      () => {
        const page =
          buildCmsPageFromEditor(
            {
              title:
                " About Us ",

              slug:
                " About Us ",

              status:
                "draft",

              isHomepage:
                false,

              seoTitle:
                "About",

              seoDescription:
                "About the website.",

              seoKeywords:
                "Company, Team, company",

              canonicalUrl:
                "",

              ogTitle:
                "",

              ogDescription:
                "",

              ogImage:
                "",

              noIndex:
                false,
            },

            null,
            NOW,
          );

        expect(
          page.title,
        ).toBe(
          "About Us",
        );

        expect(
          page.slug,
        ).toBe(
          "about-us",
        );

        expect(
          page.seo.keywords,
        ).toEqual([
          "Company",
          "Team",
        ]);

        expect(
          page.createdAt,
        ).toEqual(
          NOW,
        );

        expect(
          page.updatedAt,
        ).toEqual(
          NOW,
        );

        expect(
          page.publishedAt,
        ).toBeNull();
      },
    );
  },
);