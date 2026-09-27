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
): string {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "GAMENEXA site isolation",
  () => {
    it(
      "does not hardcode the PDF Office database in generic DB infrastructure",
      () => {
        expect(
          source(
            "lib/db/database.ts",
          ),
        ).not.toContain(
          "pdf_office_website",
        );
      },
    );

    it(
      "does not hardcode the PDF Office auth subject",
      () => {
        expect(
          source(
            "lib/auth/session.ts",
          ),
        ).not.toContain(
          "pdf-office-admin",
        );
      },
    );

    it(
      "does not hardcode PDF Office in admin creation infrastructure",
      () => {
        expect(
          source(
            "scripts/create-admin.ts",
          ),
        ).not.toContain(
          "pdf_office_website",
        );
      },
    );

    it(
      "keeps the admin login site-aware",
      () => {
        const login =
          source(
            "app/admin/login/page.tsx",
          );

        expect(
          login,
        ).toContain(
          "getSiteConfig",
        );

        expect(
          login,
        ).not.toContain(
          'src="/app-icon.png"',
        );
      },
    );
  },
);
