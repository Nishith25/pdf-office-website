import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  hashPassword,
  verifyPassword,
} from "../lib/auth/password";

import {
  createSessionToken,
  verifySessionToken,
} from "../lib/auth/session";

describe(
  "admin auth primitives",
  () => {
    beforeEach(() => {
      process.env.ADMIN_SESSION_SECRET =
        "0123456789abcdef0123456789abcdef";
    });

    it(
      "hashes and verifies a password",
      async () => {
        const password =
          "correct-horse-battery-staple";

        const hash =
          await hashPassword(
            password,
          );

        expect(
          hash,
        ).not.toContain(
          password,
        );

        await expect(
          verifyPassword(
            password,
            hash,
          ),
        ).resolves.toBe(
          true,
        );

        await expect(
          verifyPassword(
            "wrong-password",
            hash,
          ),
        ).resolves.toBe(
          false,
        );
      },
    );

    it(
      "signs and verifies an admin session",
      async () => {
        const token =
          await createSessionToken(
            "admin@example.com",
          );

        await expect(
          verifySessionToken(
            token,
          ),
        ).resolves.toEqual({
          email:
            "admin@example.com",
        });
      },
    );

    it(
      "rejects a tampered token",
      async () => {
        const token =
          await createSessionToken(
            "admin@example.com",
          );

        const tampered =
          `${token}tampered`;

        await expect(
          verifySessionToken(
            tampered,
          ),
        ).resolves.toBeNull();
      },
    );
  },
);