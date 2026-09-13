import {
  describe,
  expect,
  it,
} from "vitest";

import {
  loginSchema,
} from "../lib/auth/login-schema";

describe(
  "loginSchema",
  () => {
    it(
      "rejects an invalid email",
      () => {
        const result =
          loginSchema.safeParse({
            email: "not-an-email",
            password:
              "strong-password-123",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "rejects a password shorter than 8 characters",
      () => {
        const result =
          loginSchema.safeParse({
            email:
              "admin@example.com",
            password: "1234567",
          });

        expect(
          result.success,
        ).toBe(false);
      },
    );

    it(
      "accepts valid login input",
      () => {
        const result =
          loginSchema.safeParse({
            email:
              "admin@example.com",
            password:
              "strong-password-123",
          });

        expect(
          result.success,
        ).toBe(true);
      },
    );
  },
);