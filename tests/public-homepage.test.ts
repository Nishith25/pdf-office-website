import React from "react";
import {
  renderToStaticMarkup,
} from "react-dom/server";
import {
  describe,
  expect,
  it,
} from "vitest";

import PublicHomepage from "../components/site/PublicHomepage";

import {
  buildPublicHomepageModel,
} from "../lib/public/homepage-model";

import type {
  FAQItem,
  SiteSection,
  SiteSettings,
  ToolItem,
} from "../lib/cms/types";

import type {
  MediaItem,
} from "../lib/media/validation";

describe(
  "public homepage",
  () => {
    it(
      "builds public content from CMS records",
      () => {
        const settings: SiteSettings = {
          brandName:
            "PDF Office – Doc Scanner",

          shortName:
            "PDF Office",

          playStoreUrl:
            "https://play.google.com/store/apps/details?id=test",

          siteUrl:
            "https://example.com",

          appIconUrl: "",

          footerText:
            "Scan. Convert. Sign.",

          privacyUrl: "",

          termsUrl: "",
        };

        const sections: SiteSection[] = [
          {
            key:
              "hero",

            eyebrow:
              "PDF Office",

            title:
              "Documents without friction.",

            description:
              "Work with PDFs from your phone.",

            visible: true,

            order: 1,

            mediaId:
              "media-1",

            data: {
              titleTop:
                "Your document",

              titleBottom:
                "workspace, simplified.",

              primaryCta:
                "Get PDF Office",
            },
          },
        ];

        const tools: ToolItem[] = [
          {
            name:
              "Merge PDF",

            type:
              "merge",

            description:
              "Combine PDF files.",

            visible: true,

            featured: true,

            order: 1,
          },

          {
            name:
              "Hidden",

            type:
              "hidden",

            description:
              "Hidden tool",

            visible: false,

            featured: false,

            order: 2,
          },
        ];

        const faqs: FAQItem[] = [
          {
            question:
              "Can I scan documents?",

            answer:
              "Yes.",

            visible: true,

            order: 1,
          },
        ];

        const media: MediaItem[] = [
          {
            id:
              "media-1",

            name:
              "scanner.png",

            url:
              "https://example.com/scanner.png",

            publicId:
              "pdf-office/scanner",

            mimeType:
              "image/png",

            width: 1000,

            height: 1600,

            size: 1000,

            uploadedAt:
              new Date(),
          },
        ];

        const model =
          buildPublicHomepageModel({
            page: null,
            settings,
            sections,
            tools,
            faqs,
            media,
          });

        expect(
          model.hero.titleTop,
        ).toBe(
          "Your document",
        );

        expect(
          model.hero.mediaUrl,
        ).toBe(
          "https://example.com/scanner.png",
        );

        expect(
          model.tools,
        ).toHaveLength(1);
      },
    );

    it(
      "renders CMS content into the public homepage",
      () => {
        const model =
          buildPublicHomepageModel({
            page: null,

            settings: null,

            sections: [],

            tools: [
              {
                name:
                  "Merge PDF",

                type:
                  "merge",

                description:
                  "Combine documents.",

                visible: true,

                featured: true,

                order: 1,
              },
            ],

            faqs: [
              {
                question:
                  "Is PDF Office free?",

                answer:
                  "Core tools are available in the app.",

                visible: true,

                order: 1,
              },
            ],

            media: [],
          });

        const html =
          renderToStaticMarkup(
            React.createElement(
              PublicHomepage,
              {
                model,
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "PDF Office",
        );

        expect(
          html,
        ).toContain(
          "Merge PDF",
        );

        expect(
          html,
        ).toContain(
          "Is PDF Office free?",
        );
      },
    );
  },
);