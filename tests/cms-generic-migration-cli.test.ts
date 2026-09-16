import {
  describe,
  expect,
  it,
} from "vitest";

import {
  parseGenericCmsMigrationCliArgs,
} from "../lib/cms/migration/cli";

describe(
  "generic CMS migration CLI",
  () => {
    it(
      "defaults to preview mode with no database writes",
      () => {
        const result =
          parseGenericCmsMigrationCliArgs(
            [],
          );

        expect(
          result,
        ).toEqual({
          mode:
            "preview",

          apply:
            false,
        });
      },
    );

    it(
      "enables writes only with the explicit apply flag",
      () => {
        const result =
          parseGenericCmsMigrationCliArgs(
            [
              "--apply",
            ],
          );

        expect(
          result,
        ).toEqual({
          mode:
            "apply",

          apply:
            true,
        });
      },
    );

    it(
      "rejects unknown arguments",
      () => {
        expect(
          () =>
            parseGenericCmsMigrationCliArgs(
              [
                "--force",
              ],
            ),
        ).toThrow(
          "Unknown migration argument: --force",
        );
      },
    );

    it(
      "rejects extra arguments even when apply is present",
      () => {
        expect(
          () =>
            parseGenericCmsMigrationCliArgs(
              [
                "--apply",
                "--force",
              ],
            ),
        ).toThrow(
          "Unknown migration argument: --force",
        );
      },
    );
  },
);