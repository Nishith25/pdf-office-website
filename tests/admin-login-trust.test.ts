import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  path:
    string,
) {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "admin login trust signals",
  () => {
    it(
      "marks the administrator login as non-indexable",
      () => {
        const page =
          source(
            "app/admin/login/page.tsx",
          );

        expect(
          page,
        ).toMatch(
          /index:\s*false/,
        );

        expect(
          page,
        ).toMatch(
          /follow:\s*false/,
        );
      },
    );

    it(
      "clearly identifies the login as a first-party administrator portal",
      () => {
        const page =
          source(
            "app/admin/login/page.tsx",
          );

        expect(
          page,
        ).toContain(
          "Official",
        );

        expect(
          page,
        ).toContain(
          "administrator portal",
        );

        expect(
          page,
        ).toContain(
          "third-party",
        );
      },
    );

    it(
      "does not use a generic example.com login placeholder",
      () => {
        const form =
          source(
            "app/admin/login/LoginForm.tsx",
          );

        expect(
          form,
        ).not.toContain(
          "admin@example.com",
        );

        expect(
          form,
        ).toContain(
          'autoComplete="username"',
        );
      },
    );
  },
);
