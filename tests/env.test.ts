import {
  describe,
  expect,
  it,
} from "vitest";

import {
  requireServerEnv,
} from "../lib/env";

describe(
  "requireServerEnv",
  () => {
    it(
      "throws when a required environment variable is missing",
      () => {
        expect(() =>
          requireServerEnv(
            "__PDF_OFFICE_MISSING_TEST_ENV__",
          ),
        ).toThrow(
          "Missing required environment variable",
        );
      },
    );
  },
);