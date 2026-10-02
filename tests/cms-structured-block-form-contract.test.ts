import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

const blockCardSource =
  readFileSync(
    "components/admin/blocks/BlockCard.tsx",
    "utf8",
  );

const actionsSource =
  readFileSync(
    "app/admin/(protected)/pages/actions.ts",
    "utf8",
  );

describe(
  "structured CMS block form contract",
  () => {
    it(
      "renders the structured editor and serializes blockData",
      () => {
        expect(
          blockCardSource,
        ).toContain(
          'import StructuredBlockEditor from "./StructuredBlockEditor";',
        );

        expect(
          blockCardSource,
        ).toContain(
          "JSON.stringify",
        );

        expect(
          blockCardSource,
        ).toContain(
          "structuredData",
        );

        expect(
          blockCardSource,
        ).toContain(
          'name="blockData"',
        );
      },
    );

    it(
      "does not submit the legacy field dot payload",
      () => {
        expect(
          blockCardSource,
        ).not.toMatch(
          /name=\{?`field\./,
        );
      },
    );

    it(
      "server action reads the structured blockData payload",
      () => {
        expect(
          actionsSource,
        ).toContain(
          "readCmsStructuredBlockDataFromFormData",
        );

        expect(
          actionsSource,
        ).toMatch(
          /const data\s*=\s*readCmsStructuredBlockDataFromFormData\(/,
        );
      },
    );
  },
);
