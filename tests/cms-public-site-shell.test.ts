import React from "react";

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
  CmsPage,
} from "../lib/cms/core/types";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

import type {
  CmsPublicNavigationItem,
} from "../lib/cms/public/navigation";

import PublicCmsPage from "../components/cms/public/PublicCmsPage";

import PublicSiteShell from "../components/cms/public/PublicSiteShell";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
  );

describe(
  "public CMS site shell",
  () => {
    it(
      "renders site identity, navigation, nested links and theme variables",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.identity.siteName =
          "Example Website";

        settings.identity.shortName =
          "Example";

        settings.identity.tagline =
          "Built with the generic CMS.";

        settings.identity.logoUrl =
          "https://example.com/logo.png";

        settings.theme.primaryColor =
          "#112233";

        settings.theme.backgroundColor =
          "#FAFAFA";

        settings.theme.textColor =
          "#101010";

        const headerNavigation:
          CmsPublicNavigationItem[] = [
            {
              id:
                "about",

              label:
                "About",

              href:
                "/about",

              target:
                "same-tab",

              children: [
                {
                  id:
                    "external",

                  label:
                    "External",

                  href:
                    "https://example.com",

                  target:
                    "new-tab",

                  children:
                    [],
                },
              ],
            },
          ];

        const footerNavigation:
          CmsPublicNavigationItem[] = [
            {
              id:
                "privacy",

              label:
                "Privacy",

              href:
                "/privacy",

              target:
                "same-tab",

              children:
                [],
            },
          ];

        const html =
          renderToStaticMarkup(
            React.createElement(
              PublicSiteShell,
              {
                settings,

                headerNavigation,

                footerNavigation,

                children:
                  React.createElement(
                    "main",
                    null,
                    "Page content",
                  ),
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "Example Website",
        );

        expect(
          html,
        ).toContain(
          "Built with the generic CMS.",
        );

        expect(
          html,
        ).toContain(
          "https://example.com/logo.png",
        );

        expect(
          html,
        ).toContain(
          'href="/about"',
        );

        expect(
          html,
        ).toContain(
          'href="https://example.com"',
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
          'href="/privacy"',
        );

        expect(
          html,
        ).toContain(
          "--cms-primary:#112233",
        );

        expect(
          html,
        ).toContain(
          "--cms-background:#FAFAFA",
        );

        expect(
          html,
        ).toContain(
          "Page content",
        );
      },
    );

    it(
      "renders a CMS page through the shared block renderer",
      () => {
        const page:
          CmsPage = {
            title:
              "About Us",

            slug:
              "about-us",

            status:
              "published",

            isHomepage:
              false,

            seo: {
              title:
                "",

              description:
                "",

              keywords:
                [],

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

            createdAt:
              NOW,

            updatedAt:
              NOW,

            publishedAt:
              NOW,
          };

        const blocks:
          CmsBlock[] = [
            {
              pageId:
                "page-1",

              type:
                "hero",

              order:
                1,

              visible:
                true,

              data: {
                eyebrow:
                  "Company",

                title:
                  "About Example",

                description:
                  "Generic CMS content.",

                image:
                  "",

                buttonLabel:
                  "",

                buttonUrl:
                  "",

                alignment:
                  "left",
              },

              createdAt:
                NOW,

              updatedAt:
                NOW,
            },
          ];

        const html =
          renderToStaticMarkup(
            React.createElement(
              PublicCmsPage,
              {
                page,

                blocks,
              },
            ),
          );

        expect(
          html,
        ).toContain(
          "About Example",
        );

        expect(
          html,
        ).toContain(
          "Generic CMS content.",
        );
      },
    );
  },
);