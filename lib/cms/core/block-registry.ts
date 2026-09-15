import {
  cmsBlockSchema,
} from "./schemas";

import type {
  CmsBlock,
  CmsBlockType,
} from "./types";

export type CmsBlockFieldType =
  | "text"
  | "textarea"
  | "url"
  | "media"
  | "select"
  | "lines";

export type CmsBlockFieldDefinition = {
  key:
    string;

  label:
    string;

  type:
    CmsBlockFieldType;

  placeholder?:
    string;

  helpText?:
    string;

  options?:
    Array<{
      label:
        string;

      value:
        string;
    }>;
};

export type CmsBlockDefinition = {
  type:
    CmsBlockType;

  label:
    string;

  description:
    string;

  fields:
    CmsBlockFieldDefinition[];

  defaultData:
    Record<
      string,
      unknown
    >;
};

export const CMS_BLOCK_REGISTRY:
  CmsBlockDefinition[] = [
    {
      type:
        "hero",

      label:
        "Hero",

      description:
        "Large introductory section with heading, text, image and call to action.",

      fields: [
        {
          key:
            "eyebrow",

          label:
            "Eyebrow",

          type:
            "text",

          placeholder:
            "Optional short label",
        },

        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",

          placeholder:
            "Main page heading",
        },

        {
          key:
            "description",

          label:
            "Description",

          type:
            "textarea",
        },

        {
          key:
            "image",

          label:
            "Image",

          type:
            "media",
        },

        {
          key:
            "buttonLabel",

          label:
            "Button Label",

          type:
            "text",
        },

        {
          key:
            "buttonUrl",

          label:
            "Button URL",

          type:
            "url",
        },

        {
          key:
            "alignment",

          label:
            "Alignment",

          type:
            "select",

          options: [
            {
              label:
                "Left",

              value:
                "left",
            },

            {
              label:
                "Center",

              value:
                "center",
            },
          ],
        },
      ],

      defaultData: {
        eyebrow:
          "",

        title:
          "Page heading",

        description:
          "",

        image:
          "",

        buttonLabel:
          "",

        buttonUrl:
          "",

        alignment:
          "left",
      },
    },

    {
      type:
        "richText",

      label:
        "Rich Text",

      description:
        "General heading and long-form text content.",

      fields: [
        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",
        },

        {
          key:
            "body",

          label:
            "Content",

          type:
            "textarea",
        },
      ],

      defaultData: {
        title:
          "",

        body:
          "",
      },
    },

    {
      type:
        "imageText",

      label:
        "Image + Text",

      description:
        "Two-column content combining an image with supporting text.",

      fields: [
        {
          key:
            "eyebrow",

          label:
            "Eyebrow",

          type:
            "text",
        },

        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",
        },

        {
          key:
            "description",

          label:
            "Description",

          type:
            "textarea",
        },

        {
          key:
            "image",

          label:
            "Image",

          type:
            "media",
        },

        {
          key:
            "imagePosition",

          label:
            "Image Position",

          type:
            "select",

          options: [
            {
              label:
                "Left",

              value:
                "left",
            },

            {
              label:
                "Right",

              value:
                "right",
            },
          ],
        },
      ],

      defaultData: {
        eyebrow:
          "",

        title:
          "",

        description:
          "",

        image:
          "",

        imagePosition:
          "right",
      },
    },

    {
      type:
        "featureGrid",

      label:
        "Feature Grid",

      description:
        "Grid of short feature items.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "description",

          label:
            "Section Description",

          type:
            "textarea",
        },

        {
          key:
            "items",

          label:
            "Features",

          type:
            "lines",

          helpText:
            "Enter one feature per line.",
        },
      ],

      defaultData: {
        title:
          "",

        description:
          "",

        items:
          [],
      },
    },

    {
      type:
        "cardGrid",

      label:
        "Card Grid",

      description:
        "Flexible grid of cards for grouped content.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "description",

          label:
            "Description",

          type:
            "textarea",
        },

        {
          key:
            "cards",

          label:
            "Cards",

          type:
            "lines",

          helpText:
            "Enter one card item per line.",
        },
      ],

      defaultData: {
        title:
          "",

        description:
          "",

        cards:
          [],
      },
    },

    {
      type:
        "stats",

      label:
        "Stats",

      description:
        "Display key numbers, achievements or metrics.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "items",

          label:
            "Statistics",

          type:
            "lines",

          helpText:
            "Enter one statistic per line.",
        },
      ],

      defaultData: {
        title:
          "",

        items:
          [],
      },
    },

    {
      type:
        "gallery",

      label:
        "Gallery",

      description:
        "Display a collection of images.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "images",

          label:
            "Images",

          type:
            "lines",

          helpText:
            "Media selection support will enhance this field in the editor.",
        },
      ],

      defaultData: {
        title:
          "",

        images:
          [],
      },
    },

    {
      type:
        "logoGrid",

      label:
        "Logo Grid",

      description:
        "Display partner, customer or brand marks in a structured grid.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "logos",

          label:
            "Logo Items",

          type:
            "lines",
        },
      ],

      defaultData: {
        title:
          "",

        logos:
          [],
      },
    },

    {
      type:
        "faq",

      label:
        "FAQ",

      description:
        "Frequently asked questions and answers.",

      fields: [
        {
          key:
            "title",

          label:
            "Section Title",

          type:
            "text",
        },

        {
          key:
            "items",

          label:
            "Questions",

          type:
            "lines",

          helpText:
            "Enter one item per line. Detailed question and answer controls are handled by the page editor.",
        },
      ],

      defaultData: {
        title:
          "Frequently Asked Questions",

        items:
          [],
      },
    },

    {
      type:
        "cta",

      label:
        "Call to Action",

      description:
        "Focused conversion section with heading and button.",

      fields: [
        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",
        },

        {
          key:
            "description",

          label:
            "Description",

          type:
            "textarea",
        },

        {
          key:
            "buttonLabel",

          label:
            "Button Label",

          type:
            "text",
        },

        {
          key:
            "buttonUrl",

          label:
            "Button URL",

          type:
            "url",
        },
      ],

      defaultData: {
        title:
          "",

        description:
          "",

        buttonLabel:
          "",

        buttonUrl:
          "",
      },
    },

    {
      type:
        "buttonGroup",

      label:
        "Button Group",

      description:
        "Group of actions or destination links.",

      fields: [
        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",
        },

        {
          key:
            "buttons",

          label:
            "Buttons",

          type:
            "lines",

          helpText:
            "Enter one button per line.",
        },
      ],

      defaultData: {
        title:
          "",

        buttons:
          [],
      },
    },

    {
      type:
        "download",

      label:
        "Download",

      description:
        "Promote an external download or application destination.",

      fields: [
        {
          key:
            "title",

          label:
            "Title",

          type:
            "text",
        },

        {
          key:
            "description",

          label:
            "Description",

          type:
            "textarea",
        },

        {
          key:
            "buttonLabel",

          label:
            "Button Label",

          type:
            "text",
        },

        {
          key:
            "buttonUrl",

          label:
            "Download URL",

          type:
            "url",
        },

        {
          key:
            "image",

          label:
            "Image",

          type:
            "media",
        },
      ],

      defaultData: {
        title:
          "",

        description:
          "",

        buttonLabel:
          "",

        buttonUrl:
          "",

        image:
          "",
      },
    },

    {
      type:
        "divider",

      label:
        "Divider",

      description:
        "Visual separation between adjacent content sections.",

      fields: [
        {
          key:
            "style",

          label:
            "Style",

          type:
            "select",

          options: [
            {
              label:
                "Line",

              value:
                "line",
            },

            {
              label:
                "Subtle",

              value:
                "subtle",
            },
          ],
        },
      ],

      defaultData: {
        style:
          "line",
      },
    },

    {
      type:
        "spacer",

      label:
        "Spacer",

      description:
        "Add controlled vertical spacing between blocks.",

      fields: [
        {
          key:
            "size",

          label:
            "Size",

          type:
            "select",

          options: [
            {
              label:
                "Small",

              value:
                "small",
            },

            {
              label:
                "Medium",

              value:
                "medium",
            },

            {
              label:
                "Large",

              value:
                "large",
            },
          ],
        },
      ],

      defaultData: {
        size:
          "medium",
      },
    },
  ];

export function getCmsBlockDefinition(
  type:
    CmsBlockType,
): CmsBlockDefinition {
  const definition =
    CMS_BLOCK_REGISTRY.find(
      (
        block,
      ) =>
        block.type ===
        type,
    );

  if (!definition) {
    throw new Error(
      `Unknown CMS block type: ${type}`,
    );
  }

  return definition;
}

function cloneData(
  value:
    Record<
      string,
      unknown
    >,
): Record<
  string,
  unknown
> {
  return structuredClone(
    value,
  );
}

export function createCmsBlockDraft(
  type:
    CmsBlockType,

  pageId:
    string,

  order:
    number,

  now =
    new Date(),
): CmsBlock {
  const definition =
    getCmsBlockDefinition(
      type,
    );

  return cmsBlockSchema.parse({
    pageId,

    type,

    order,

    visible:
      true,

    data:
      cloneData(
        definition.defaultData,
      ),

    createdAt:
      now,

    updatedAt:
      now,
  });
}