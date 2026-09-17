import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildStructuredCmsBlockMigrationPlan,
  verifyStructuredCmsBlockRecords,
} from "../lib/cms/migration/structured-blocks";

describe(
  "structured CMS block migration",
  () => {
    const source = [
      {
        id:
          "block-1",

        type:
          "stats" as const,

        data: {
          title:
            "Highlights",

          items: [
            "13+ — PDF Tools",
          ],
        },
      },

      {
        id:
          "block-2",

        type:
          "faq" as const,

        data: {
          title:
            "FAQ",

          items: [
            "Question — Answer",
          ],
        },
      },
    ];

    it(
      "creates a deterministic migration plan",
      () => {
        const first =
          buildStructuredCmsBlockMigrationPlan(
            source,
          );

        const second =
          buildStructuredCmsBlockMigrationPlan(
            source,
          );

        expect(
          second,
        ).toEqual(
          first,
        );

        expect(
          first.changedCount,
        ).toBe(
          2,
        );
      },
    );

    it(
      "does not mutate migration input",
      () => {
        const original =
          structuredClone(
            source,
          );

        buildStructuredCmsBlockMigrationPlan(
          source,
        );

        expect(
          source,
        ).toEqual(
          original,
        );
      },
    );

    it(
      "is idempotent after the first migration",
      () => {
        const first =
          buildStructuredCmsBlockMigrationPlan(
            source,
          );

        const migrated =
          first.entries.map(
            (
              entry,
            ) => ({
              id:
                entry.id,

              type:
                entry.type,

              data:
                entry.after,
            }),
          );

        const second =
          buildStructuredCmsBlockMigrationPlan(
            migrated,
          );

        expect(
          second.changedCount,
        ).toBe(
          0,
        );
      },
    );

    it(
      "verifies all migrated records against V2 schemas",
      () => {
        const plan =
          buildStructuredCmsBlockMigrationPlan(
            source,
          );

        const result =
          verifyStructuredCmsBlockRecords(
            plan.entries.map(
              (
                entry,
              ) => ({
                id:
                  entry.id,

                type:
                  entry.type,

                data:
                  entry.after,
              }),
            ),
          );

        expect(
          result,
        ).toEqual({
          valid:
            true,

          invalidIds:
            [],
        });
      },
    );
  },
);