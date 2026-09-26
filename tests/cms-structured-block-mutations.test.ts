import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createCmsStructuredBlockDefault,
} from "../lib/cms/core/structured-block-defaults";

import {
  appendCmsStructuredRepeaterItem,
  createCmsStructuredRepeaterItem,
  moveCmsStructuredRepeaterItem,
  removeCmsStructuredRepeaterItem,
  updateCmsStructuredField,
  updateCmsStructuredRepeaterItemField,
} from "../lib/admin/cms-structured-block-mutations";

describe(
  "structured CMS block mutations",
  () => {
    it(
      "updates one top-level field without deleting unrelated structured data",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "hero",
          ),

          badge:
            "Featured",

          image:
            "/hero.png",

          primaryCta: {
            label:
              "Get started",

            url:
              "/start",
          },

          secondaryCta: {
            label:
              "Learn more",

            url:
              "/about",
          },
        };

        const result =
          updateCmsStructuredField(
            source,
            [
              "title",
            ],
            "Changed title",
          );

        expect(
          result.title,
        ).toBe(
          "Changed title",
        );

        expect(
          result.badge,
        ).toBe(
          "Featured",
        );

        expect(
          result.image,
        ).toBe(
          "/hero.png",
        );

        expect(
          result.primaryCta,
        ).toEqual({
          label:
            "Get started",

          url:
            "/start",
        });

        expect(
          result.secondaryCta,
        ).toEqual({
          label:
            "Learn more",

          url:
            "/about",
        });

        expect(
          source.title,
        ).not.toBe(
          "Changed title",
        );
      },
    );

    it(
      "updates a nested structured field immutably",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "hero",
          ),

          primaryCta: {
            label:
              "Old label",

            url:
              "/start",
          },
        };

        const result =
          updateCmsStructuredField(
            source,
            [
              "primaryCta",
              "label",
            ],
            "New label",
          );

        expect(
          result.primaryCta,
        ).toEqual({
          label:
            "New label",

          url:
            "/start",
        });

        expect(
          source.primaryCta,
        ).toEqual({
          label:
            "Old label",

          url:
            "/start",
        });
      },
    );

    it(
      "removes a repeater item by stable ID",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },

            {
              id:
                "faq-c",

              question:
                "C?",

              answer:
                "C.",
            },
          ],
        };

        const result =
          removeCmsStructuredRepeaterItem(
            source,
            "items",
            "faq-b",
          );

        expect(
          result.items.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "faq-a",
          "faq-c",
        ]);

        expect(
          source.items.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "faq-a",
          "faq-b",
          "faq-c",
        ]);
      },
    );

    it(
      "moves a repeater item up while preserving IDs and content",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },

            {
              id:
                "faq-c",

              question:
                "C?",

              answer:
                "C.",
            },
          ],
        };

        const result =
          moveCmsStructuredRepeaterItem(
            source,
            "items",
            "faq-c",
            "up",
          );

        expect(
          result.items.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "faq-a",
          "faq-c",
          "faq-b",
        ]);

        expect(
          result.items[
            1
          ],
        ).toEqual({
          id:
            "faq-c",

          question:
            "C?",

          answer:
            "C.",
        });
      },
    );

    it(
      "moves a repeater item down",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },

            {
              id:
                "faq-c",

              question:
                "C?",

              answer:
                "C.",
            },
          ],
        };

        const result =
          moveCmsStructuredRepeaterItem(
            source,
            "items",
            "faq-a",
            "down",
          );

        expect(
          result.items.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "faq-b",
          "faq-a",
          "faq-c",
        ]);
      },
    );

    it(
      "does nothing when moving the first item up",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },
          ],
        };

        const result =
          moveCmsStructuredRepeaterItem(
            source,
            "items",
            "faq-a",
            "up",
          );

        expect(
          result.items,
        ).toEqual(
          source.items,
        );

        expect(
          result,
        ).not.toBe(
          source,
        );
      },
    );

    it(
      "does nothing when moving the last item down",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },
          ],
        };

        const result =
          moveCmsStructuredRepeaterItem(
            source,
            "items",
            "faq-b",
            "down",
          );

        expect(
          result.items,
        ).toEqual(
          source.items,
        );
      },
    );

    it(
      "does not mutate the original repeater array while moving",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "A?",

              answer:
                "A.",
            },

            {
              id:
                "faq-b",

              question:
                "B?",

              answer:
                "B.",
            },
          ],
        };

        moveCmsStructuredRepeaterItem(
          source,
          "items",
          "faq-b",
          "up",
        );

        expect(
          source.items.map(
            (
              item,
            ) =>
              item.id,
          ),
        ).toEqual([
          "faq-a",
          "faq-b",
        ]);
      },
    );

    it(
      "creates a feature grid repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "featureGrid",
            "feature-123",
          ),
        ).toEqual({
          id:
            "feature-123",

          eyebrow:
            "",

          title:
            "",

          description:
            "",

          icon:
            "",

          image:
            "",

          badge:
            "",

          linkLabel:
            "",

          linkUrl:
            "",
        });
      },
    );

    it(
      "creates a card grid repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "cardGrid",
            "card-123",
          ),
        ).toEqual({
          id:
            "card-123",

          title:
            "",

          description:
            "",

          image:
            "",

          icon:
            "",

          badge:
            "",

          linkLabel:
            "",

          linkUrl:
            "",
        });
      },
    );

    it(
      "creates a stats repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "stats",
            "stat-123",
          ),
        ).toEqual({
          id:
            "stat-123",

          value:
            "",

          label:
            "",

          description:
            "",
        });
      },
    );

    it(
      "creates a gallery repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "gallery",
            "gallery-123",
          ),
        ).toEqual({
          id:
            "gallery-123",

          image:
            "",

          altText:
            "",

          caption:
            "",
        });
      },
    );

    it(
      "creates a logo grid repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "logoGrid",
            "logo-123",
          ),
        ).toEqual({
          id:
            "logo-123",

          image:
            "",

          name:
            "",

          url:
            "",
        });
      },
    );

    it(
      "creates an FAQ repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "faq",
            "faq-123",
          ),
        ).toEqual({
          id:
            "faq-123",

          question:
            "",

          answer:
            "",
        });
      },
    );

    it(
      "creates a button group repeater item",
      () => {
        expect(
          createCmsStructuredRepeaterItem(
            "buttonGroup",
            "button-123",
          ),
        ).toEqual({
          id:
            "button-123",

          label:
            "",

          url:
            "",

          style:
            "primary",

          target:
            "same-tab",
        });
      },
    );

    it(
      "appends a repeater item without mutating the source",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "Existing?",

              answer:
                "Existing.",
            },
          ],
        };

        const item =
          createCmsStructuredRepeaterItem(
            "faq",
            "faq-b",
          );

        const result =
          appendCmsStructuredRepeaterItem(
            source,
            "items",
            item,
          );

        expect(
          result.items,
        ).toEqual([
          {
            id:
              "faq-a",

            question:
              "Existing?",

            answer:
              "Existing.",
          },

          {
            id:
              "faq-b",

            question:
              "",

            answer:
              "",
          },
        ]);

        expect(
          source.items,
        ).toHaveLength(
          1,
        );

        expect(
          result,
        ).not.toBe(
          source,
        );
      },
    );

    it(
      "updates a field on a repeater item by stable ID",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "Old question",

              answer:
                "Old answer",
            },

            {
              id:
                "faq-b",

              question:
                "Keep me",

              answer:
                "Untouched",
            },
          ],
        };

        const result =
          updateCmsStructuredRepeaterItemField(
            source,
            "items",
            "faq-a",
            [
              "question",
            ],
            "New question",
          );

        expect(
          result.items[
            0
          ],
        ).toEqual({
          id:
            "faq-a",

          question:
            "New question",

          answer:
            "Old answer",
        });

        expect(
          result.items[
            1
          ],
        ).toEqual({
          id:
            "faq-b",

          question:
            "Keep me",

          answer:
            "Untouched",
        });

        expect(
          source.items[
            0
          ].question,
        ).toBe(
          "Old question",
        );
      },
    );

    it(
      "updates a field on a feature item by stable ID",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "featureGrid",
          ),

          items: [
            {
              id:
                "feature-a",

              eyebrow:
                "",

              title:
                "Feature",

              description:
                "",

              icon:
                "",

              image:
                "",

              badge:
                "",

              linkLabel:
                "Old label",

              linkUrl:
                "/old",
            },
          ],
        };

        const result =
          updateCmsStructuredRepeaterItemField(
            source,
            "items",
            "feature-a",
            [
              "linkUrl",
            ],
            "/new",
          );

        expect(
          result.items[
            0
          ].linkUrl,
        ).toBe(
          "/new",
        );

        expect(
          result.items[
            0
          ].linkLabel,
        ).toBe(
          "Old label",
        );

        expect(
          source.items[
            0
          ].linkUrl,
        ).toBe(
          "/old",
        );
      },
    );

    it(
      "leaves repeater content unchanged when the stable ID does not exist",
      () => {
        const source = {
          ...createCmsStructuredBlockDefault(
            "faq",
          ),

          items: [
            {
              id:
                "faq-a",

              question:
                "Question",

              answer:
                "Answer",
            },
          ],
        };

        const result =
          updateCmsStructuredRepeaterItemField(
            source,
            "items",
            "missing-id",
            [
              "question",
            ],
            "Should not appear",
          );

        expect(
          result.items,
        ).toEqual(
          source.items,
        );

        expect(
          result,
        ).not.toBe(
          source,
        );
      },
    );
  },
);