import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CMS_BLOCK_REGISTRY,
  createCmsBlockDraft,
  getCmsBlockDefinition,
} from "../lib/cms/core/block-registry";

describe(
  "CMS block registry",
  () => {
    it(
      "contains the complete generic block library",
      () => {
        expect(
          CMS_BLOCK_REGISTRY.map(
            (
              block,
            ) =>
              block.type,
          ),
        ).toEqual([
          "hero",
          "richText",
          "imageText",
          "featureGrid",
          "cardGrid",
          "stats",
          "gallery",
          "logoGrid",
          "faq",
          "cta",
          "buttonGroup",
          "download",
          "divider",
          "spacer",
        ]);
      },
    );

    it(
      "contains no project-specific CMS block names",
      () => {
        const content =
          JSON.stringify(
            CMS_BLOCK_REGISTRY,
          );

        expect(
          content,
        ).not.toMatch(
          /PDF Office|GPS Maps|Scanner|OCR|eSign/i,
        );
      },
    );

    it(
      "finds a registered block definition",
      () => {
        const hero =
          getCmsBlockDefinition(
            "hero",
          );

        expect(
          hero.type,
        ).toBe(
          "hero",
        );

        expect(
          hero.label,
        ).toBe(
          "Hero",
        );

        expect(
          hero.fields.length,
        ).toBeGreaterThan(
          0,
        );
      },
    );

    it(
      "creates a valid generic block draft",
      () => {
        const now =
          new Date(
            "2026-09-15T09:00:00.000Z",
          );

        const block =
          createCmsBlockDraft(
            "hero",
            "page-123",
            3,
            now,
          );

        expect(
          block.pageId,
        ).toBe(
          "page-123",
        );

        expect(
          block.type,
        ).toBe(
          "hero",
        );

        expect(
          block.order,
        ).toBe(3);

        expect(
          block.visible,
        ).toBe(true);

        expect(
          block.createdAt,
        ).toEqual(
          now,
        );

        expect(
          block.updatedAt,
        ).toEqual(
          now,
        );

        expect(
          block.data,
        ).toHaveProperty(
          "title",
        );
      },
    );
  },
);