import {
  describe,
  expect,
  it,
} from "vitest";

import {
  normalizeAdminEmail,
} from "../lib/repositories/admin";

describe(
  "normalizeAdminEmail",
  () => {
    it(
      "trims and lowercases the admin email",
      () => {
        expect(
          normalizeAdminEmail(
            " Admin@Example.COM ",
          ),
        ).toBe(
          "admin@example.com",
        );
      },
    );
  },
);