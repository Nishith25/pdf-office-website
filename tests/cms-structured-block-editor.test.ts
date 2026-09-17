import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getCmsStructuredEditorData,
  parseCmsStructuredBlockPayload,
  readCmsStructuredBlockDataFromFormData,
  stringifyCmsStructuredBlockPayload,
} from "../lib/admin/cms-structured-block-editor";

describe(
  "structured CMS block editor codec",
  () => {
    it(
      "normalizes legacy block data before editing",
      () => {
        const result =
          getCmsStructuredEditorData(
            "stats",
            {
              title:
                "Highlights",

              items: [
                "13+ — PDF Tools",
              ],
            },
          );

        expect(
          result,
        ).toMatchObject({
          schemaVersion:
            2,

          title:
            "Highlights",

          items: [
            {
              id:
                "stat-1",

              value:
                "13+",

              label:
                "PDF Tools",
            },
          ],
        });
      },
    );

    it(
      "keeps already structured V2 data stable",
      () => {
        const input = {
          schemaVersion:
            2 as const,

          title:
            "Frequently Asked Questions",

          description:
            "",

          items: [
            {
              id:
                "faq-custom",

              question:
                "Can I edit this?",

              answer:
                "Yes.",
            },
          ],

          presentation: {
            background:
              "default" as const,

            width:
              "standard" as const,

            spacing:
              "normal" as const,

            alignment:
              "left" as const,

            variant:
              "stacked" as const,
          },
        };

        const result =
          getCmsStructuredEditorData(
            "faq",
            input,
          );

        expect(
          result,
        ).toEqual(
          input,
        );

        expect(
          result,
        ).not.toBe(
          input,
        );
      },
    );

    it(
      "rejects malformed structured block JSON",
      () => {
        expect(
          () =>
            parseCmsStructuredBlockPayload(
              "hero",
              "{broken",
            ),
        ).toThrow();
      },
    );

    it(
      "rejects data belonging to the wrong block schema",
      () => {
        expect(
          () =>
            parseCmsStructuredBlockPayload(
              "hero",
              JSON.stringify({
                schemaVersion:
                  2,

                style:
                  "line",
              }),
            ),
        ).toThrow();
      },
    );

    it(
      "round trips valid structured block data",
      () => {
        const data =
          getCmsStructuredEditorData(
            "divider",
            {
              style:
                "subtle",
            },
          );

        const payload =
          stringifyCmsStructuredBlockPayload(
            "divider",
            data,
          );

        expect(
          parseCmsStructuredBlockPayload(
            "divider",
            payload,
          ),
        ).toEqual(
          data,
        );
      },
    );

    it(
      "reads structured block data from FormData",
      () => {
        const data =
          getCmsStructuredEditorData(
            "divider",
            {
              style:
                "subtle",
            },
          );

        const formData =
          new FormData();

        formData.set(
          "blockData",
          JSON.stringify(
            data,
          ),
        );

        expect(
          readCmsStructuredBlockDataFromFormData(
            "divider",
            formData,
          ),
        ).toEqual(
          data,
        );
      },
    );

    it(
      "rejects FormData with no structured block payload",
      () => {
        expect(
          () =>
            readCmsStructuredBlockDataFromFormData(
              "divider",
              new FormData(),
            ),
        ).toThrow(
          "Missing structured CMS block payload.",
        );
      },
    );
  },
);