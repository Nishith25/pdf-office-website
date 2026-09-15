import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsBlock,
  CmsMenu,
  CmsPage,
} from "../lib/cms/core/types";

import {
  createDefaultCmsSettings,
} from "../lib/cms/core/settings";

import {
  buildCmsPublicSiteModel,
} from "../lib/cms/public/site-model";

const NOW =
  new Date(
    "2026-09-15T12:00:00.000Z",
  );

type PageRecord =
  CmsPage & {
    id:
      string;
  };

type MenuRecord =
  CmsMenu & {
    id:
      string;
  };

function page(
  id:
    string,

  title:
    string,

  slug:
    string,

  options?: {
    homepage?:
      boolean;

    status?:
      "draft" |
      "published";
  },
): PageRecord {
  const status =
    options?.status ??
    "published";

  return {
    id,

    title,

    slug,

    status,

    isHomepage:
      options?.homepage ??
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
      status ===
      "published"
        ? NOW
        : null,
  };
}

function block(
  type:
    CmsBlock["type"],

  order:
    number,

  visible:
    boolean,

  title:
    string,
): CmsBlock {
  return {
    pageId:
      "home",

    type,

    order,

    visible,

    data: {
      title,
    },

    createdAt:
      NOW,

    updatedAt:
      NOW,
  };
}

describe(
  "CMS public site model",
  () => {
    it(
      "builds visible ordered blocks and assigned navigation",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.footer.headerMenuId =
          "header-menu";

        settings.footer.footerMenuId =
          "footer-menu";

        const pages: PageRecord[] = [
          page(
            "home",
            "Home",
            "home",
            {
              homepage:
                true,
            },
          ),

          page(
            "about",
            "About",
            "about",
          ),

          page(
            "draft",
            "Draft",
            "draft",
            {
              status:
                "draft",
            },
          ),
        ];

        const menus: MenuRecord[] = [
          {
            id:
              "header-menu",

            name:
              "Header",

            key:
              "header",

            location:
              "header",

            items: [
              {
                id:
                  "home-link",

                label:
                  "Home",

                type:
                  "page",

                pageId:
                  "home",

                customUrl:
                  "",

                target:
                  "same-tab",

                parentId:
                  null,

                order:
                  1,

                enabled:
                  true,
              },

              {
                id:
                  "about-link",

                label:
                  "About",

                type:
                  "page",

                pageId:
                  "about",

                customUrl:
                  "",

                target:
                  "same-tab",

                parentId:
                  null,

                order:
                  2,

                enabled:
                  true,
              },

              {
                id:
                  "draft-link",

                label:
                  "Draft",

                type:
                  "page",

                pageId:
                  "draft",

                customUrl:
                  "",

                target:
                  "same-tab",

                parentId:
                  null,

                order:
                  3,

                enabled:
                  true,
              },
            ],

            createdAt:
              NOW,

            updatedAt:
              NOW,
          },

          {
            id:
              "footer-menu",

            name:
              "Footer",

            key:
              "footer",

            location:
              "footer",

            items: [
              {
                id:
                  "external",

                label:
                  "External",

                type:
                  "custom",

                pageId:
                  null,

                customUrl:
                  "https://example.com",

                target:
                  "new-tab",

                parentId:
                  null,

                order:
                  1,

                enabled:
                  true,
              },
            ],

            createdAt:
              NOW,

            updatedAt:
              NOW,
          },
        ];

        const currentPage =
          pages[0];

        const model =
          buildCmsPublicSiteModel({
            page:
              currentPage,

            blocks: [
              block(
                "cta",
                3,
                true,
                "Third",
              ),

              block(
                "hero",
                1,
                true,
                "First",
              ),

              block(
                "richText",
                2,
                false,
                "Hidden",
              ),
            ],

            settings,

            menus,

            pages,
          });

        expect(
          model.page.id,
        ).toBe(
          "home",
        );

        expect(
          model.blocks.map(
            (
              item,
            ) =>
              item.data.title,
          ),
        ).toEqual([
          "First",
          "Third",
        ]);

        expect(
          model.headerNavigation.map(
            (
              item,
            ) =>
              item.label,
          ),
        ).toEqual([
          "Home",
          "About",
        ]);

        expect(
          model.headerNavigation[0]
            ?.href,
        ).toBe("/");

        expect(
          model.headerNavigation[1]
            ?.href,
        ).toBe(
          "/about",
        );

        expect(
          model.footerNavigation,
        ).toEqual([
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
        ]);
      },
    );

    it(
      "returns empty navigation when assigned menus no longer exist",
      () => {
        const settings =
          createDefaultCmsSettings();

        settings.footer.headerMenuId =
          "missing-header";

        settings.footer.footerMenuId =
          "missing-footer";

        const currentPage =
          page(
            "home",
            "Home",
            "home",
            {
              homepage:
                true,
            },
          );

        const model =
          buildCmsPublicSiteModel({
            page:
              currentPage,

            blocks:
              [],

            settings,

            menus:
              [],

            pages: [
              currentPage,
            ],
          });

        expect(
          model.headerNavigation,
        ).toEqual([]);

        expect(
          model.footerNavigation,
        ).toEqual([]);
      },
    );
  },
);