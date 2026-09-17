import {
  isCmsStructuredBlockData,
} from "../core/block-data-schemas";

import {
  normalizeCmsBlockData,
} from "../core/block-data-normalizer";

import type {
  CmsBlockType,
} from "../core/types";

function pair(
  first:
    string,

  second:
    string,
): string {
  return [
    first.trim(),
    second.trim(),
  ]
    .filter(
      Boolean,
    )
    .join(
      " — ",
    );
}

function readLegacyText(
  input:
    unknown,

  key:
    string,
): string {
  if (
    typeof input !==
      "object" ||
    input ===
      null ||
    Array.isArray(
      input,
    )
  ) {
    return "";
  }

  const value =
    (
      input as Record<
        string,
        unknown
      >
    )[key];

  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

export function projectCmsBlockDataForLegacyRenderer(
  type:
    CmsBlockType,

  input:
    unknown,
): Record<
  string,
  unknown
> {
  switch (
    type
  ) {
    case "hero": {
      const data =
        normalizeCmsBlockData(
          "hero",
          input,
        );

      return {
        eyebrow:
          data.eyebrow,

        title:
          data.title,

        description:
          data.description,

        image:
          data.image,

        buttonLabel:
          data.primaryCta.label,

        buttonUrl:
          data.primaryCta.url,

        alignment:
          data.presentation.alignment,
      };
    }

    case "richText": {
      const data =
        normalizeCmsBlockData(
          "richText",
          input,
        );

      return {
        title:
          data.title,

        body:
          data.body,
      };
    }

    case "imageText": {
      const data =
        normalizeCmsBlockData(
          "imageText",
          input,
        );

      return {
        eyebrow:
          data.eyebrow,

        title:
          data.title,

        description:
          data.description,

        image:
          data.image,

        imagePosition:
          data.imagePosition,
      };
    }

    case "featureGrid": {
      const data =
        normalizeCmsBlockData(
          "featureGrid",
          input,
        );

      return {
        title:
          data.title,

        description:
          data.description,

        items:
          data.items.map(
            (
              item,
            ) =>
              pair(
                item.title,
                item.description,
              ),
          ),
      };
    }

    case "cardGrid": {
      const data =
        normalizeCmsBlockData(
          "cardGrid",
          input,
        );

      return {
        title:
          data.title,

        description:
          data.description,

        cards:
          data.cards.map(
            (
              card,
            ) =>
              pair(
                card.title,
                card.description,
              ),
          ),
      };
    }

    case "stats": {
      const data =
        normalizeCmsBlockData(
          "stats",
          input,
        );

      return {
        title:
          data.title,

        items:
          data.items.map(
            (
              item,
            ) =>
              pair(
                item.value,
                item.label,
              ),
          ),
      };
    }

    case "gallery": {
      const data =
        normalizeCmsBlockData(
          "gallery",
          input,
        );

      return {
        title:
          data.title,

        images:
          data.images
            .map(
              (
                item,
              ) =>
                item.image,
            )
            .filter(
              Boolean,
            ),
      };
    }

    case "logoGrid": {
      const data =
        normalizeCmsBlockData(
          "logoGrid",
          input,
        );

      return {
        title:
          data.title,

        logos:
          data.logos
            .map(
              (
                item,
              ) =>
                item.image ||
                item.name,
            )
            .filter(
              Boolean,
            ),
      };
    }

    case "faq": {
      const data =
        normalizeCmsBlockData(
          "faq",
          input,
        );

      return {
        title:
          data.title,

        items:
          data.items.map(
            (
              item,
            ) =>
              pair(
                item.question,
                item.answer,
              ),
          ),
      };
    }

    case "cta": {
      const data =
        normalizeCmsBlockData(
          "cta",
          input,
        );

      return {
        title:
          data.title,

        description:
          data.description,

        buttonLabel:
          data.primaryCta.label,

        buttonUrl:
          data.primaryCta.url,
      };
    }

    case "buttonGroup": {
      const data =
        normalizeCmsBlockData(
          "buttonGroup",
          input,
        );

      return {
        title:
          data.title,

        buttons:
          data.buttons.map(
            (
              button,
            ) =>
              button.label,
          ),
      };
    }

    case "download": {
      const wasStructured =
        isCmsStructuredBlockData(
          "download",
          input,
        );

      const data =
        normalizeCmsBlockData(
          "download",
          input,
        );

      const legacyButtonLabel =
        readLegacyText(
          input,
          "buttonLabel",
        );

      return {
        title:
          data.title,

        description:
          data.description,

        buttonLabel:
          wasStructured
            ? data.googlePlayUrl
              ? "Get it on Google Play"
              : data.appStoreUrl
                ? "Download on the App Store"
                : ""
            : legacyButtonLabel,

        buttonUrl:
          data.googlePlayUrl ||
          data.appStoreUrl,

        image:
          data.image,
      };
    }

    case "divider": {
      const data =
        normalizeCmsBlockData(
          "divider",
          input,
        );

      return {
        style:
          data.style,
      };
    }

    case "spacer": {
      const data =
        normalizeCmsBlockData(
          "spacer",
          input,
        );

      return {
        size:
          data.size,
      };
    }
  }

  const exhaustiveCheck:
    never =
      type;

  throw new Error(
    `Unsupported CMS block type: ${exhaustiveCheck}`,
  );
}