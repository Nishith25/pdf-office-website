import {
  isCmsStructuredBlockData,
  parseCmsStructuredBlockData,
} from "./block-data-schemas";

import type {
  CmsStructuredBlockDataByType,
} from "./block-data-schemas";

import type {
  CmsBlockType,
} from "./types";

function record(
  value:
    unknown,
): Record<
  string,
  unknown
> {
  return typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value,
    )
    ? value as Record<
        string,
        unknown
      >
    : {};
}

function text(
  value:
    unknown,
): string {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function lines(
  value:
    unknown,
): string[] {
  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value
    .map(
      (
        item,
      ) =>
        text(
          item,
        ),
    )
    .filter(
      Boolean,
    );
}

function stableId(
  prefix:
    string,

  index:
    number,
): string {
  return `${prefix}-${index + 1}`;
}

function splitLegacyPair(
  value:
    string,
): [
  string,
  string,
] {
  const separator =
    " — ";

  const index =
    value.indexOf(
      separator,
    );

  if (
    index ===
    -1
  ) {
    return [
      value.trim(),
      "",
    ];
  }

  return [
    value
      .slice(
        0,
        index,
      )
      .trim(),

    value
      .slice(
        index +
          separator.length,
      )
      .trim(),
  ];
}

const defaultPresentation = {
  background:
    "default" as const,

  width:
    "standard" as const,

  spacing:
    "normal" as const,

  alignment:
    "left" as const,
};

export function normalizeCmsBlockData<
  T extends CmsBlockType,
>(
  type:
    T,

  input:
    unknown,
): CmsStructuredBlockDataByType[T];

export function normalizeCmsBlockData(
  type:
    CmsBlockType,

  input:
    unknown,
): CmsStructuredBlockDataByType[CmsBlockType] {
  if (
    isCmsStructuredBlockData(
      type,
      input,
    )
  ) {
    return parseCmsStructuredBlockData(
      type,
      structuredClone(
        input,
      ),
    );
  }

  /*
   * Some early structured CMS records were saved
   * before schemaVersion was written explicitly.
   *
   * If the data already matches the current V2
   * structure after adding only schemaVersion,
   * preserve it instead of treating object arrays
   * as legacy string arrays.
   */
  const candidate =
    record(
      input,
    );

  if (
    !(
      "schemaVersion"
      in candidate
    )
  ) {
    const versionedCandidate = {
      schemaVersion:
        2,

      ...candidate,
    };

    if (
      isCmsStructuredBlockData(
        type,
        versionedCandidate,
      )
    ) {
      return parseCmsStructuredBlockData(
        type,
        versionedCandidate,
      );
    }
  }

  const data =
    candidate;

  switch (
    type
  ) {
    case "hero":
      return parseCmsStructuredBlockData(
        "hero",
        {
          schemaVersion:
            2,

          eyebrow:
            text(
              data.eyebrow,
            ),

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          image:
            text(
              data.image,
            ),

          primaryCta: {
            label:
              text(
                data.buttonLabel,
              ),

            url:
              text(
                data.buttonUrl,
              ),
          },

          secondaryCta: {
            label:
              "",

            url:
              "",
          },

          badge:
            "",

          presentation: {
            ...defaultPresentation,

            alignment:
              data.alignment ===
                "center"
                ? "center"
                : "left",

            spacing:
              "spacious",

            width:
              "wide",

            variant:
              "editorial",
          },
        },
      );

    case "richText":
      return parseCmsStructuredBlockData(
        "richText",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            text(
              data.title,
            ),

          body:
            text(
              data.body,
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "editorial",
          },
        },
      );

    case "imageText":
      return parseCmsStructuredBlockData(
        "imageText",
        {
          schemaVersion:
            2,

          eyebrow:
            text(
              data.eyebrow,
            ),

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          image:
            text(
              data.image,
            ),

          imagePosition:
            data.imagePosition ===
              "left"
              ? "left"
              : "right",

          cta: {
            label:
              "",

            url:
              "",
          },

          presentation: {
            ...defaultPresentation,

            spacing:
              "spacious",

            variant:
              "split",
          },
        },
      );

    case "featureGrid":
      return parseCmsStructuredBlockData(
        "featureGrid",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          columns:
            3,

          items:
            lines(
              data.items,
            ).map(
              (
                item,
                index,
              ) => {
                const [
                  title,
                  description,
                ] =
                  splitLegacyPair(
                    item,
                  );

                return {
                  id:
                    stableId(
                      "feature",
                      index,
                    ),

                  eyebrow:
                    "",

                  title,

                  description,

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
                };
              },
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "minimal",
          },
        },
      );

    case "cardGrid":
      return parseCmsStructuredBlockData(
        "cardGrid",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          columns:
            3,

          cards:
            lines(
              data.cards,
            ).map(
              (
                item,
                index,
              ) => {
                const [
                  title,
                  description,
                ] =
                  splitLegacyPair(
                    item,
                  );

                return {
                  id:
                    stableId(
                      "card",
                      index,
                    ),

                  title,

                  description,

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
                };
              },
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "editorial",
          },
        },
      );

    case "stats":
      return parseCmsStructuredBlockData(
        "stats",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          items:
            lines(
              data.items,
            ).map(
              (
                item,
                index,
              ) => {
                const [
                  value,
                  label,
                ] =
                  splitLegacyPair(
                    item,
                  );

                return {
                  id:
                    stableId(
                      "stat",
                      index,
                    ),

                  value,

                  label,

                  description:
                    "",
                };
              },
            ),

          presentation: {
            ...defaultPresentation,

            alignment:
              "center",

            variant:
              "cards",
          },
        },
      );

    case "gallery":
      return parseCmsStructuredBlockData(
        "gallery",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          columns:
            3,

          images:
            lines(
              data.images,
            ).map(
              (
                image,
                index,
              ) => ({
                id:
                  stableId(
                    "image",
                    index,
                  ),

                image,

                altText:
                  "",

                caption:
                  "",
              }),
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "grid",
          },
        },
      );

    case "logoGrid":
      return parseCmsStructuredBlockData(
        "logoGrid",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          logos:
            lines(
              data.logos,
            ).map(
              (
                value,
                index,
              ) => {
                const looksLikeImage =
                  /^https?:\/\//i.test(
                    value,
                  ) ||
                  value.startsWith(
                    "/",
                  );

                return {
                  id:
                    stableId(
                      "logo",
                      index,
                    ),

                  image:
                    looksLikeImage
                      ? value
                      : "",

                  name:
                    looksLikeImage
                      ? ""
                      : value,

                  url:
                    "",
                };
              },
            ),

          presentation: {
            ...defaultPresentation,

            alignment:
              "center",

            variant:
              "grid",
          },
        },
      );

    case "faq":
      return parseCmsStructuredBlockData(
        "faq",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          description:
            "",

          items:
            lines(
              data.items,
            ).map(
              (
                item,
                index,
              ) => {
                const [
                  question,
                  answer,
                ] =
                  splitLegacyPair(
                    item,
                  );

                return {
                  id:
                    stableId(
                      "faq",
                      index,
                    ),

                  question,

                  answer,
                };
              },
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "stacked",
          },
        },
      );

    case "cta":
      return parseCmsStructuredBlockData(
        "cta",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          primaryCta: {
            label:
              text(
                data.buttonLabel,
              ),

            url:
              text(
                data.buttonUrl,
              ),
          },

          secondaryCta: {
            label:
              "",

            url:
              "",
          },

          image:
            "",

          presentation: {
            ...defaultPresentation,

            alignment:
              "center",

            variant:
              "centered",
          },
        },
      );

    case "buttonGroup":
      return parseCmsStructuredBlockData(
        "buttonGroup",
        {
          schemaVersion:
            2,

          title:
            text(
              data.title,
            ),

          buttons:
            lines(
              data.buttons,
            ).map(
              (
                label,
                index,
              ) => ({
                id:
                  stableId(
                    "button",
                    index,
                  ),

                label,

                url:
                  "",

                style:
                  "primary",

                target:
                  "same-tab",
              }),
            ),

          presentation: {
            ...defaultPresentation,

            variant:
              "inline",
          },
        },
      );

    case "download":
      return parseCmsStructuredBlockData(
        "download",
        {
          schemaVersion:
            2,

          eyebrow:
            "",

          title:
            text(
              data.title,
            ),

          description:
            text(
              data.description,
            ),

          image:
            text(
              data.image,
            ),

          googlePlayUrl:
            text(
              data.buttonUrl,
            ),

          appStoreUrl:
            "",

          qrImage:
            "",

          presentation: {
            ...defaultPresentation,

            alignment:
              "center",

            spacing:
              "spacious",

            width:
              "wide",

            variant:
              "split",
          },
        },
      );

    case "divider":
      return parseCmsStructuredBlockData(
        "divider",
        {
          schemaVersion:
            2,

          style:
            data.style ===
              "subtle"
              ? "subtle"
              : "line",
        },
      );

    case "spacer":
      return parseCmsStructuredBlockData(
        "spacer",
        {
          schemaVersion:
            2,

          size:
            data.size ===
              "small" ||
            data.size ===
              "large"
              ? data.size
              : "medium",
        },
      );
  }

  const exhaustiveCheck:
    never =
      type;

  throw new Error(
    `Unsupported CMS block type: ${exhaustiveCheck}`,
  );
}