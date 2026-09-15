import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CMS_NAVIGATION,
  isCmsNavigationItemActive,
} from "../lib/admin/cms-navigation";

describe(
  "generic CMS navigation",
  () => {
    it(
      "contains all generic CMS workspaces",
      () => {
        const serialized =
          JSON.stringify(
            CMS_NAVIGATION,
          );

        expect(
          serialized,
        ).toContain(
          "Pages",
        );

        expect(
          serialized,
        ).toContain(
          "Menus",
        );

        expect(
          serialized,
        ).toContain(
          "Media",
        );

        expect(
          serialized,
        ).toContain(
          "Appearance",
        );

        expect(
          serialized,
        ).toContain(
          "Activity",
        );
      },
    );

    it(
      "contains no application-specific navigation",
      () => {
        const serialized =
          JSON.stringify(
            CMS_NAVIGATION,
          );

        expect(
          serialized,
        ).not.toMatch(
          /PDF Tools|Scanner|OCR|eSign|GPS/i,
        );
      },
    );

    it(
      "matches nested admin routes correctly",
      () => {
        expect(
          isCmsNavigationItemActive(
            "/admin",
            "/admin",
          ),
        ).toBe(true);

        expect(
          isCmsNavigationItemActive(
            "/admin/pages/123",
            "/admin/pages",
          ),
        ).toBe(true);

        expect(
          isCmsNavigationItemActive(
            "/admin/menus/123",
            "/admin/menus",
          ),
        ).toBe(true);

        expect(
          isCmsNavigationItemActive(
            "/admin/appearance",
            "/admin/appearance",
          ),
        ).toBe(true);

        expect(
          isCmsNavigationItemActive(
            "/admin/media",
            "/admin/pages",
          ),
        ).toBe(false);

        expect(
          isCmsNavigationItemActive(
            "/admin/pages",
            "/admin",
          ),
        ).toBe(false);
      },
    );
  },
);