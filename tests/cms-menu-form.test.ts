import {
  describe,
  expect,
  it,
} from "vitest";

import {
  readCmsMenuItemFromFormData,
} from "../lib/admin/cms-menu-form";

describe(
  "CMS menu form",
  () => {
    it(
      "reads a page menu item",
      () => {
        const formData =
          new FormData();

        formData.set(
          "label",
          "About Us",
        );

        formData.set(
          "type",
          "page",
        );

        formData.set(
          "pageId",
          "page-123",
        );

        formData.set(
          "target",
          "same-tab",
        );

        formData.set(
          "enabled",
          "true",
        );

        const result =
          readCmsMenuItemFromFormData(
            formData,
          );

        expect(
          result,
        ).toEqual({
          label:
            "About Us",

          type:
            "page",

          pageId:
            "page-123",

          customUrl:
            "",

          target:
            "same-tab",

          enabled:
            true,
        });
      },
    );

    it(
      "reads a custom external menu item",
      () => {
        const formData =
          new FormData();

        formData.set(
          "label",
          "Community",
        );

        formData.set(
          "type",
          "custom",
        );

        formData.set(
          "customUrl",
          "https://example.com/community",
        );

        formData.set(
          "target",
          "new-tab",
        );

        const result =
          readCmsMenuItemFromFormData(
            formData,
          );

        expect(
          result.type,
        ).toBe(
          "custom",
        );

        expect(
          result.pageId,
        ).toBeNull();

        expect(
          result.customUrl,
        ).toBe(
          "https://example.com/community",
        );

        expect(
          result.target,
        ).toBe(
          "new-tab",
        );
      },
    );

    it(
      "defaults invalid item choices safely",
      () => {
        const formData =
          new FormData();

        formData.set(
          "label",
          "Link",
        );

        formData.set(
          "type",
          "something-else",
        );

        formData.set(
          "target",
          "popup",
        );

        const result =
          readCmsMenuItemFromFormData(
            formData,
          );

        expect(
          result.type,
        ).toBe(
          "custom",
        );

        expect(
          result.target,
        ).toBe(
          "same-tab",
        );

        expect(
          result.enabled,
        ).toBe(false);
      },
    );
  },
);