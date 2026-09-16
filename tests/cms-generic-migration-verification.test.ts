import {
  describe,
  expect,
  it,
} from "vitest";

import {
  verifyGenericCmsState,
} from "../lib/cms/migration/verification";

const validState = {
  homepageCount:
    1,

  homepage: {
    id:
      "68c91f4e1f1234567890abcd",

    status:
      "published",
  },

  blocks: [
    {
      pageId:
        "68c91f4e1f1234567890abcd",

      order:
        1,
    },

    {
      pageId:
        "68c91f4e1f1234567890abcd",

      order:
        2,
    },
  ],

  settingsPresent:
    true,

  headerMenuPresent:
    true,

  footerMenuPresent:
    true,

  invalidPageReferences:
    [],

  draftPageReferences:
    [],

  legacyCollectionsReadable:
    true,
};

describe(
  "generic CMS migration verification",
  () => {
    it(
      "accepts a valid migrated CMS state",
      () => {
        expect(
          verifyGenericCmsState(
            validState,
          ),
        ).toEqual({
          valid:
            true,

          errors:
            [],
        });
      },
    );

    it(
      "requires exactly one homepage",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            homepageCount:
              2,
          });

        expect(
          result.valid,
        ).toBe(
          false,
        );

        expect(
          result.errors,
        ).toContain(
          "Expected exactly one CMS homepage, found 2.",
        );
      },
    );

    it(
      "requires the homepage to be published",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            homepage: {
              ...validState.homepage,

              status:
                "draft",
            },
          });

        expect(
          result.errors,
        ).toContain(
          "CMS homepage must be published.",
        );
      },
    );

    it(
      "requires at least one homepage block",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            blocks:
              [],
          });

        expect(
          result.errors,
        ).toContain(
          "CMS homepage must contain at least one block.",
        );
      },
    );

    it(
      "requires contiguous block order",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            blocks: [
              {
                pageId:
                  "68c91f4e1f1234567890abcd",

                order:
                  1,
              },

              {
                pageId:
                  "68c91f4e1f1234567890abcd",

                order:
                  3,
              },
            ],
          });

        expect(
          result.errors,
        ).toContain(
          "CMS homepage block order is not contiguous.",
        );
      },
    );

    it(
      "requires assigned menus and global settings",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            settingsPresent:
              false,

            headerMenuPresent:
              false,

            footerMenuPresent:
              false,
          });

        expect(
          result.errors,
        ).toContain(
          "Global CMS settings are missing.",
        );

        expect(
          result.errors,
        ).toContain(
          "Assigned header menu is missing.",
        );

        expect(
          result.errors,
        ).toContain(
          "Assigned footer menu is missing.",
        );
      },
    );

    it(
      "rejects broken and draft menu page references",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            invalidPageReferences: [
              "missing-page",
            ],

            draftPageReferences: [
              "draft-page",
            ],
          });

        expect(
          result.errors,
        ).toContain(
          "Menu contains missing page references.",
        );

        expect(
          result.errors,
        ).toContain(
          "Menu contains draft page references.",
        );
      },
    );

    it(
      "requires legacy collections to remain readable",
      () => {
        const result =
          verifyGenericCmsState({
            ...validState,

            legacyCollectionsReadable:
              false,
          });

        expect(
          result.errors,
        ).toContain(
          "Legacy collections could not be verified.",
        );
      },
    );
  },
);