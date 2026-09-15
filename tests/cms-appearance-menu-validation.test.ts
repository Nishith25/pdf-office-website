import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  CmsMenu,
} from "../lib/cms/core/types";

import {
  areCmsAppearanceMenuAssignmentsValid,
} from "../lib/admin/cms-appearance-menu-validation";

const NOW =
  new Date(
    "2026-09-15T11:00:00.000Z",
  );

function menu(
  key:
    string,

  location:
    "header" |
    "footer" |
    "custom",
): CmsMenu & {
  id:
    string;
} {
  return {
    id:
      `${key}-id`,

    name:
      key,

    key,

    location,

    items:
      [],

    createdAt:
      NOW,

    updatedAt:
      NOW,
  };
}

describe(
  "CMS appearance menu assignment validation",
  () => {
    const menus = [
      menu(
        "main-navigation",
        "header",
      ),

      menu(
        "footer-navigation",
        "footer",
      ),

      menu(
        "utility-links",
        "custom",
      ),
    ];

    it(
      "allows empty menu assignments",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "",

              footerMenuId:
                "",
            },

            menus,
          ),
        ).toBe(true);
      },
    );

    it(
      "accepts matching header and footer menus",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "main-navigation-id",

              footerMenuId:
                "footer-navigation-id",
            },

            menus,
          ),
        ).toBe(true);
      },
    );

    it(
      "allows custom menus in either assignment",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "utility-links-id",

              footerMenuId:
                "utility-links-id",
            },

            menus,
          ),
        ).toBe(true);
      },
    );

    it(
      "rejects a footer-only menu assigned as the header",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "footer-navigation-id",

              footerMenuId:
                "",
            },

            menus,
          ),
        ).toBe(false);
      },
    );

    it(
      "rejects a header-only menu assigned as the footer",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "",

              footerMenuId:
                "main-navigation-id",
            },

            menus,
          ),
        ).toBe(false);
      },
    );

    it(
      "rejects references to missing menus",
      () => {
        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "missing-menu",

              footerMenuId:
                "",
            },

            menus,
          ),
        ).toBe(false);

        expect(
          areCmsAppearanceMenuAssignmentsValid(
            {
              headerMenuId:
                "",

              footerMenuId:
                "missing-menu",
            },

            menus,
          ),
        ).toBe(false);
      },
    );
  },
);