import {
  describe,
  expect,
  it,
} from "vitest";

import {
  formatAdminActionResult,
} from "../lib/admin/action-result";

describe(
  "formatAdminActionResult",
  () => {
    it(
      "formats a successful admin action",
      () => {
        expect(
          formatAdminActionResult({
            success: true,
            message:
              "Changes saved successfully.",
          }),
        ).toEqual({
          tone: "success",
          message:
            "Changes saved successfully.",
        });
      },
    );

    it(
      "formats a failed admin action",
      () => {
        expect(
          formatAdminActionResult({
            success: false,
            message:
              "Unable to save changes.",
          }),
        ).toEqual({
          tone: "error",
          message:
            "Unable to save changes.",
        });
      },
    );

    it(
      "returns null when there is no result",
      () => {
        expect(
          formatAdminActionResult(
            null,
          ),
        ).toBeNull();
      },
    );
  },
);