import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildHomePageFromSeo,
  parseSeoKeywords,
  seoEditorSchema,
} from "../lib/admin/seo-editor";

import {
  siteSettingsEditorSchema,
} from "../lib/admin/settings-editor";

import {
  passwordChangeSchema,
} from "../lib/admin/password-editor";

describe(
  "admin global editors",
  () => {
    it(
      "normalizes and removes duplicate SEO keywords",
      () => {
        expect(
          parseSeoKeywords(
            "PDF scanner, OCR, pdf scanner, eSign,  OCR ",
          ),
        ).toEqual([
          "PDF scanner",
          "OCR",
          "eSign",
        ]);
      },
    );

    it(
      "builds the home page SEO document",
      () => {
        const input =
          seoEditorSchema.parse({
            title:
              "PDF Office – Doc Scanner",

            description:
              "Scan, convert, sign and organize PDF documents.",

            keywordsText:
              "PDF scanner, OCR, eSign",

            ogTitle:
              "PDF Office",

            ogDescription:
              "Mobile PDF tools and document scanner.",

            ogImage: "",

            canonicalUrl:
              "https://pdf-office-website.vercel.app",
          });

        const page =
          buildHomePageFromSeo(
            input,
          );

        expect(
          page.slug,
        ).toBe("home");

        expect(
          page.seo.keywords,
        ).toEqual([
          "PDF scanner",
          "OCR",
          "eSign",
        ]);
      },
    );

    it(
      "rejects an invalid Play Store URL",
      () => {
        const result =
          siteSettingsEditorSchema.safeParse({
            brandName:
              "PDF Office",

            shortName:
              "PDF Office",

            playStoreUrl:
              "not-a-url",

            siteUrl:
              "https://pdf-office-website.vercel.app",

            appIconUrl: "",

            footerText:
              "PDF Office",

            privacyUrl: "",

            termsUrl: "",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "rejects mismatched new passwords",
      () => {
        const result =
          passwordChangeSchema.safeParse({
            currentPassword:
              "current-password-123",

            newPassword:
              "new-secure-password-123",

            confirmPassword:
              "different-password-123",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );
  },
);