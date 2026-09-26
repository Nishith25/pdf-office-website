"use client";

import type {
  ReactNode,
} from "react";

import MediaPickerField from "../media/MediaPickerField";

import {
  appendCmsStructuredRepeaterItem,
  createCmsStructuredRepeaterItem,
  moveCmsStructuredRepeaterItem,
  removeCmsStructuredRepeaterItem,
  updateCmsStructuredField,
  updateCmsStructuredRepeaterItemField,
} from "../../../lib/admin/cms-structured-block-mutations";

import {
  getCmsStructuredEditorData,
} from "../../../lib/admin/cms-structured-block-editor";

import type {
  CmsBlockType,
} from "../../../lib/cms/core/types";

type StructuredBlockEditorProps = {
  type:
    CmsBlockType;

  data:
    Record<
      string,
      unknown
    >;

  onChange:
    (
      data:
        Record<
          string,
          unknown
        >,
    ) => void;
};

type StructuredRepeaterType =
  | "featureGrid"
  | "cardGrid"
  | "stats"
  | "gallery"
  | "logoGrid"
  | "faq"
  | "buttonGroup";

type SelectOption = {
  label:
    string;

  value:
    string;
};

function isRecord(
  value:
    unknown,
): value is Record<
  string,
  unknown
> {
  return (
    typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value,
    )
  );
}

function asRecord(
  value:
    unknown,
): Record<
  string,
  unknown
> {
  return isRecord(
    value,
  )
    ? value
    : {};
}

function asArray(
  value:
    unknown,
): unknown[] {
  return Array.isArray(
    value,
  )
    ? value
    : [];
}

function asString(
  value:
    unknown,
): string {
  return typeof value ===
    "string"
    ? value
    : "";
}

function asNumber(
  value:
    unknown,

  fallback:
    number,
): number {
  return typeof value ===
    "number"
    ? value
    : fallback;
}

function createStableItemId(
  prefix:
    string,
): string {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function EditorSection({
  title,
  children,
}: {
  title:
    string;

  children:
    ReactNode;
}) {
  return (
    <section className="rounded-[14px] border border-[#E1E4E9] bg-white p-4">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#505763]">
        {title}
      </h4>

      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label:
    string;

  value:
    string;

  onChange:
    (
      value:
        string,
    ) => void;

  multiline?:
    boolean;

  placeholder?:
    string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-[#343A46]">
        {label}
      </span>

      {multiline ? (
        <textarea
          value={
            value
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target.value,
            )
          }
          placeholder={
            placeholder
          }
          rows={
            4
          }
          className="mt-2 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3 py-2.5 text-[11px] text-[#343A46] outline-none transition focus:border-[#3157E7]"
        />
      ) : (
        <input
          type="text"
          value={
            value
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target.value,
            )
          }
          placeholder={
            placeholder
          }
          className="mt-2 h-10 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3 text-[11px] text-[#343A46] outline-none transition focus:border-[#3157E7]"
        />
      )}
    </label>
  );
}

function UrlField({
  label,
  value,
  onChange,
}: {
  label:
    string;

  value:
    string;

  onChange:
    (
      value:
        string,
    ) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-[#343A46]">
        {label}
      </span>

      <input
        type="text"
        value={
          value
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        placeholder="/page or https://example.com"
        className="mt-2 h-10 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3 text-[11px] text-[#343A46] outline-none transition focus:border-[#3157E7]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label:
    string;

  value:
    string;

  options:
    SelectOption[];

  onChange:
    (
      value:
        string,
    ) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-[#343A46]">
        {label}
      </span>

      <select
        value={
          value
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        className="mt-2 h-10 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3 text-[11px] text-[#343A46] outline-none transition focus:border-[#3157E7]"
      >
        {options.map(
          (
            option,
          ) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {
                option.label
              }
            </option>
          ),
        )}
      </select>
    </label>
  );
}

function RepeaterActions({
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  onMoveUp:
    () => void;

  onMoveDown:
    () => void;

  onDelete:
    () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={
          onMoveUp
        }
        className="rounded-[8px] border border-[#DDE0E6] bg-white px-3 py-2 text-[9px] font-semibold text-[#555C68]"
      >
        Move up
      </button>

      <button
        type="button"
        onClick={
          onMoveDown
        }
        className="rounded-[8px] border border-[#DDE0E6] bg-white px-3 py-2 text-[9px] font-semibold text-[#555C68]"
      >
        Move down
      </button>

      <button
        type="button"
        onClick={
          onDelete
        }
        className="rounded-[8px] border border-[#E7CCCC] bg-white px-3 py-2 text-[9px] font-semibold text-[#A14B4B]"
      >
        Delete item
      </button>
    </div>
  );
}

const BACKGROUND_OPTIONS:
  SelectOption[] = [
    {
      label:
        "Default",

      value:
        "default",
    },

    {
      label:
        "Muted",

      value:
        "muted",
    },

    {
      label:
        "Contrast",

      value:
        "contrast",
    },

    {
      label:
        "Accent",

      value:
        "accent",
    },
  ];

const WIDTH_OPTIONS:
  SelectOption[] = [
    {
      label:
        "Narrow",

      value:
        "narrow",
    },

    {
      label:
        "Standard",

      value:
        "standard",
    },

    {
      label:
        "Wide",

      value:
        "wide",
    },

    {
      label:
        "Full",

      value:
        "full",
    },
  ];

const SPACING_OPTIONS:
  SelectOption[] = [
    {
      label:
        "Compact",

      value:
        "compact",
    },

    {
      label:
        "Normal",

      value:
        "normal",
    },

    {
      label:
        "Spacious",

      value:
        "spacious",
    },
  ];

const ALIGNMENT_OPTIONS:
  SelectOption[] = [
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
  ];

const COLUMN_OPTIONS:
  SelectOption[] = [
    {
      label:
        "2",

      value:
        "2",
    },

    {
      label:
        "3",

      value:
        "3",
    },

    {
      label:
        "4",

      value:
        "4",
    },
  ];

const VARIANT_OPTIONS:
  Partial<
    Record<
      CmsBlockType,
      SelectOption[]
    >
  > = {
    hero: [
      {
        label:
          "Editorial",

        value:
          "editorial",
      },

      {
        label:
          "Split",

        value:
          "split",
      },

      {
        label:
          "Centered",

        value:
          "centered",
      },

      {
        label:
          "Product",

        value:
          "product",
      },

      {
        label:
          "Immersive",

        value:
          "immersive",
      },

      {
        label:
          "App Showcase",

        value:
          "app-showcase",
      },
    ],

    richText: [
      {
        label:
          "Editorial",

        value:
          "editorial",
      },

      {
        label:
          "Minimal",

        value:
          "minimal",
      },
    ],

    imageText: [
      {
        label:
          "Split",

        value:
          "split",
      },

      {
        label:
          "Editorial",

        value:
          "editorial",
      },

      {
        label:
          "Showcase",

        value:
          "showcase",
      },
    ],

    featureGrid: [
      {
        label:
          "Minimal",

        value:
          "minimal",
      },

      {
        label:
          "Icon Grid",

        value:
          "icon-grid",
      },

      {
        label:
          "Editorial",

        value:
          "editorial",
      },

      {
        label:
          "Bento",

        value:
          "bento",
      },

      {
        label:
          "Alternating",

        value:
          "alternating",
      },

      {
        label:
          "Showcase",

        value:
          "showcase",
      },
    ],

    cardGrid: [
      {
        label:
          "Minimal",

        value:
          "minimal",
      },

      {
        label:
          "Editorial",

        value:
          "editorial",
      },

      {
        label:
          "Bento",

        value:
          "bento",
      },

      {
        label:
          "Showcase",

        value:
          "showcase",
      },
    ],

    stats: [
      {
        label:
          "Minimal",

        value:
          "minimal",
      },

      {
        label:
          "Cards",

        value:
          "cards",
      },

      {
        label:
          "Strip",

        value:
          "strip",
      },
    ],

    gallery: [
      {
        label:
          "Grid",

        value:
          "grid",
      },

      {
        label:
          "Masonry",

        value:
          "masonry",
      },

      {
        label:
          "Showcase",

        value:
          "showcase",
      },
    ],

    logoGrid: [
      {
        label:
          "Grid",

        value:
          "grid",
      },

      {
        label:
          "Strip",

        value:
          "strip",
      },

      {
        label:
          "Monochrome",

        value:
          "monochrome",
      },
    ],

    faq: [
      {
        label:
          "Stacked",

        value:
          "stacked",
      },

      {
        label:
          "Accordion",

        value:
          "accordion",
      },

      {
        label:
          "Two Column",

        value:
          "two-column",
      },
    ],

    cta: [
      {
        label:
          "Centered",

        value:
          "centered",
      },

      {
        label:
          "Split",

        value:
          "split",
      },

      {
        label:
          "Banner",

        value:
          "banner",
      },
    ],

    buttonGroup: [
      {
        label:
          "Inline",

        value:
          "inline",
      },

      {
        label:
          "Stacked",

        value:
          "stacked",
      },
    ],

    download: [
      {
        label:
          "Split",

        value:
          "split",
      },

      {
        label:
          "Centered",

        value:
          "centered",
      },

      {
        label:
          "Device",

        value:
          "device",
      },
    ],
  };

export default function StructuredBlockEditor({
  type,
  data,
  onChange,
}: StructuredBlockEditorProps) {
  const normalized =
    getCmsStructuredEditorData(
      type,
      data,
    );

  const editorData =
    normalized as unknown as Record<
      string,
      unknown
    >;

  function update(
    path:
      readonly (
        | string
        | number
      )[],

    value:
      unknown,
  ) {
    onChange(
      updateCmsStructuredField(
        editorData,
        path,
        value,
      ),
    );
  }

  function updateRepeater(
    collectionKey:
      string,

    itemId:
      string,

    path:
      readonly (
        | string
        | number
      )[],

    value:
      unknown,
  ) {
    onChange(
      updateCmsStructuredRepeaterItemField(
        editorData,
        collectionKey,
        itemId,
        path,
        value,
      ),
    );
  }

  function addRepeater(
    repeaterType:
      StructuredRepeaterType,

    collectionKey:
      string,

    prefix:
      string,
  ) {
    const item =
      createCmsStructuredRepeaterItem(
        repeaterType,
        createStableItemId(
          prefix,
        ),
      );

    onChange(
      appendCmsStructuredRepeaterItem(
        editorData,
        collectionKey,
        item,
      ),
    );
  }

  function removeRepeater(
    collectionKey:
      string,

    itemId:
      string,
  ) {
    onChange(
      removeCmsStructuredRepeaterItem(
        editorData,
        collectionKey,
        itemId,
      ),
    );
  }

  function moveRepeater(
    collectionKey:
      string,

    itemId:
      string,

    direction:
      | "up"
      | "down",
  ) {
    onChange(
      moveCmsStructuredRepeaterItem(
        editorData,
        collectionKey,
        itemId,
        direction,
      ),
    );
  }

  function presentationEditor() {
    const presentation =
      asRecord(
        editorData.presentation,
      );

    const variants =
      VARIANT_OPTIONS[
        type
      ] ??
      [];

    return (
      <EditorSection title="Presentation">
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="Background"
            value={
              asString(
                presentation.background,
              )
            }
            options={
              BACKGROUND_OPTIONS
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  "presentation",
                  "background",
                ],
                value,
              )
            }
          />

          <SelectField
            label="Width"
            value={
              asString(
                presentation.width,
              )
            }
            options={
              WIDTH_OPTIONS
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  "presentation",
                  "width",
                ],
                value,
              )
            }
          />

          <SelectField
            label="Spacing"
            value={
              asString(
                presentation.spacing,
              )
            }
            options={
              SPACING_OPTIONS
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  "presentation",
                  "spacing",
                ],
                value,
              )
            }
          />

          <SelectField
            label="Alignment"
            value={
              asString(
                presentation.alignment,
              )
            }
            options={
              ALIGNMENT_OPTIONS
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  "presentation",
                  "alignment",
                ],
                value,
              )
            }
          />

          {variants.length >
            0 && (
            <SelectField
              label="Variant"
              value={
                asString(
                  presentation.variant,
                )
              }
              options={
                variants
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "presentation",
                    "variant",
                  ],
                  value,
                )
              }
            />
          )}
        </div>
      </EditorSection>
    );
  }

  function ctaFields(
    heading:
      string,

    path:
      string,
  ) {
    const cta =
      asRecord(
        editorData[
          path
        ],
      );

    return (
      <EditorSection title={heading}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Label"
            value={
              asString(
                cta.label,
              )
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  path,
                  "label",
                ],
                value,
              )
            }
          />

          <UrlField
            label="URL"
            value={
              asString(
                cta.url,
              )
            }
            onChange={(
              value,
            ) =>
              update(
                [
                  path,
                  "url",
                ],
                value,
              )
            }
          />
        </div>
      </EditorSection>
    );
  }

  switch (
    type
  ) {
    case "hero": {
      return (
        <div className="space-y-4">
          <EditorSection title="Hero Content">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Eyebrow"
                value={
                  asString(
                    editorData.eyebrow,
                  )
                }
                onChange={(
                  value,
                ) =>
                  update(
                    [
                      "eyebrow",
                    ],
                    value,
                  )
                }
              />

              <TextField
                label="Badge"
                value={
                  asString(
                    editorData.badge,
                  )
                }
                onChange={(
                  value,
                ) =>
                  update(
                    [
                      "badge",
                    ],
                    value,
                  )
                }
              />
            </div>

            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <MediaPickerField
              label="Hero Image"
              value={
                asString(
                  editorData.image,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "image",
                  ],
                  value,
                )
              }
            />
          </EditorSection>

          {ctaFields(
            "Primary CTA",
            "primaryCta",
          )}

          {ctaFields(
            "Secondary CTA",
            "secondaryCta",
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "richText": {
      return (
        <div className="space-y-4">
          <EditorSection title="Rich Text">
            <TextField
              label="Eyebrow"
              value={
                asString(
                  editorData.eyebrow,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "eyebrow",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Content"
              value={
                asString(
                  editorData.body,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "body",
                  ],
                  value,
                )
              }
            />
          </EditorSection>

          {presentationEditor()}
        </div>
      );
    }

    case "imageText": {
      const cta =
        asRecord(
          editorData.cta,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Image + Text">
            <TextField
              label="Eyebrow"
              value={
                asString(
                  editorData.eyebrow,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "eyebrow",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <MediaPickerField
              label="Image"
              value={
                asString(
                  editorData.image,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "image",
                  ],
                  value,
                )
              }
            />

            <SelectField
              label="Image Position"
              value={
                asString(
                  editorData.imagePosition,
                )
              }
              options={[
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
              ]}
              onChange={(
                value,
              ) =>
                update(
                  [
                    "imagePosition",
                  ],
                  value,
                )
              }
            />
          </EditorSection>

          <EditorSection title="Call to Action">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Label"
                value={
                  asString(
                    cta.label,
                  )
                }
                onChange={(
                  value,
                ) =>
                  update(
                    [
                      "cta",
                      "label",
                    ],
                    value,
                  )
                }
              />

              <UrlField
                label="URL"
                value={
                  asString(
                    cta.url,
                  )
                }
                onChange={(
                  value,
                ) =>
                  update(
                    [
                      "cta",
                      "url",
                    ],
                    value,
                  )
                }
              />
            </div>
          </EditorSection>

          {presentationEditor()}
        </div>
      );
    }

    case "featureGrid": {
      const items =
        asArray(
          editorData.items,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Feature Grid">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Section Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <SelectField
              label="Columns"
              value={String(
                asNumber(
                  editorData.columns,
                  3,
                ),
              )}
              options={
                COLUMN_OPTIONS
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "columns",
                  ],
                  Number(
                    value,
                  ),
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "featureGrid",
                  "items",
                  "feature",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add feature
            </button>
          </EditorSection>

          {items.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Feature ${index + 1}`}
                >
                  <TextField
                    label="Eyebrow"
                    value={
                      asString(
                        item.eyebrow,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "eyebrow",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Title"
                    value={
                      asString(
                        item.title,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "title",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Description"
                    value={
                      asString(
                        item.description,
                      )
                    }
                    multiline
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "description",
                        ],
                        value,
                      )
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Icon"
                      value={
                        asString(
                          item.icon,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "icon",
                          ],
                          value,
                        )
                      }
                    />

                    <TextField
                      label="Badge"
                      value={
                        asString(
                          item.badge,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "badge",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <MediaPickerField
                    label="Feature Image"
                    value={
                      asString(
                        item.image,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "image",
                        ],
                        value,
                      )
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Link Label"
                      value={
                        asString(
                          item.linkLabel,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "linkLabel",
                          ],
                          value,
                        )
                      }
                    />

                    <UrlField
                      label="Link URL"
                      value={
                        asString(
                          item.linkUrl,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "linkUrl",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "items",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "items",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "items",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "cardGrid": {
      const cards =
        asArray(
          editorData.cards,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Card Grid">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <SelectField
              label="Columns"
              value={String(
                asNumber(
                  editorData.columns,
                  3,
                ),
              )}
              options={
                COLUMN_OPTIONS
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "columns",
                  ],
                  Number(
                    value,
                  ),
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "cardGrid",
                  "cards",
                  "card",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add card
            </button>
          </EditorSection>

          {cards.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Card ${index + 1}`}
                >
                  <TextField
                    label="Title"
                    value={
                      asString(
                        item.title,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "cards",
                        id,
                        [
                          "title",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Description"
                    value={
                      asString(
                        item.description,
                      )
                    }
                    multiline
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "cards",
                        id,
                        [
                          "description",
                        ],
                        value,
                      )
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Icon"
                      value={
                        asString(
                          item.icon,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "cards",
                          id,
                          [
                            "icon",
                          ],
                          value,
                        )
                      }
                    />

                    <TextField
                      label="Badge"
                      value={
                        asString(
                          item.badge,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "cards",
                          id,
                          [
                            "badge",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <MediaPickerField
                    label="Card Image"
                    value={
                      asString(
                        item.image,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "cards",
                        id,
                        [
                          "image",
                        ],
                        value,
                      )
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Link Label"
                      value={
                        asString(
                          item.linkLabel,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "cards",
                          id,
                          [
                            "linkLabel",
                          ],
                          value,
                        )
                      }
                    />

                    <UrlField
                      label="Link URL"
                      value={
                        asString(
                          item.linkUrl,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "cards",
                          id,
                          [
                            "linkUrl",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "cards",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "cards",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "cards",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "stats": {
      const items =
        asArray(
          editorData.items,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Statistics">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "stats",
                  "items",
                  "stat",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add statistic
            </button>
          </EditorSection>

          {items.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Statistic ${index + 1}`}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Value"
                      value={
                        asString(
                          item.value,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "value",
                          ],
                          value,
                        )
                      }
                    />

                    <TextField
                      label="Label"
                      value={
                        asString(
                          item.label,
                        )
                      }
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "items",
                          id,
                          [
                            "label",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <TextField
                    label="Description"
                    value={
                      asString(
                        item.description,
                      )
                    }
                    multiline
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "description",
                        ],
                        value,
                      )
                    }
                  />

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "items",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "items",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "items",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "gallery": {
      const images =
        asArray(
          editorData.images,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Gallery">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <SelectField
              label="Columns"
              value={String(
                asNumber(
                  editorData.columns,
                  3,
                ),
              )}
              options={
                COLUMN_OPTIONS
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "columns",
                  ],
                  Number(
                    value,
                  ),
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "gallery",
                  "images",
                  "image",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add image
            </button>
          </EditorSection>

          {images.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Image ${index + 1}`}
                >
                  <MediaPickerField
                    label="Image"
                    value={
                      asString(
                        item.image,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "images",
                        id,
                        [
                          "image",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Alt Text"
                    value={
                      asString(
                        item.altText,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "images",
                        id,
                        [
                          "altText",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Caption"
                    value={
                      asString(
                        item.caption,
                      )
                    }
                    multiline
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "images",
                        id,
                        [
                          "caption",
                        ],
                        value,
                      )
                    }
                  />

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "images",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "images",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "images",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "logoGrid": {
      const logos =
        asArray(
          editorData.logos,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Logo Grid">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "logoGrid",
                  "logos",
                  "logo",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add logo
            </button>
          </EditorSection>

          {logos.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Logo ${index + 1}`}
                >
                  <MediaPickerField
                    label="Logo Image"
                    value={
                      asString(
                        item.image,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "logos",
                        id,
                        [
                          "image",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Name"
                    value={
                      asString(
                        item.name,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "logos",
                        id,
                        [
                          "name",
                        ],
                        value,
                      )
                    }
                  />

                  <UrlField
                    label="URL"
                    value={
                      asString(
                        item.url,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "logos",
                        id,
                        [
                          "url",
                        ],
                        value,
                      )
                    }
                  />

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "logos",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "logos",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "logos",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "faq": {
      const items =
        asArray(
          editorData.items,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="FAQ">
            <TextField
              label="Section Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "faq",
                  "items",
                  "faq",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add question
            </button>
          </EditorSection>

          {items.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Question ${index + 1}`}
                >
                  <TextField
                    label="Question"
                    value={
                      asString(
                        item.question,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "question",
                        ],
                        value,
                      )
                    }
                  />

                  <TextField
                    label="Answer"
                    value={
                      asString(
                        item.answer,
                      )
                    }
                    multiline
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "items",
                        id,
                        [
                          "answer",
                        ],
                        value,
                      )
                    }
                  />

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "items",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "items",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "items",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "cta": {
      return (
        <div className="space-y-4">
          <EditorSection title="CTA Content">
            <TextField
              label="Eyebrow"
              value={
                asString(
                  editorData.eyebrow,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "eyebrow",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <MediaPickerField
              label="CTA Image"
              value={
                asString(
                  editorData.image,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "image",
                  ],
                  value,
                )
              }
            />
          </EditorSection>

          {ctaFields(
            "Primary CTA",
            "primaryCta",
          )}

          {ctaFields(
            "Secondary CTA",
            "secondaryCta",
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "buttonGroup": {
      const buttons =
        asArray(
          editorData.buttons,
        );

      return (
        <div className="space-y-4">
          <EditorSection title="Button Group">
            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                addRepeater(
                  "buttonGroup",
                  "buttons",
                  "button",
                )
              }
              className="rounded-[9px] bg-[#3157E7] px-4 py-2.5 text-[10px] font-semibold text-white"
            >
              Add button
            </button>
          </EditorSection>

          {buttons.map(
            (
              rawItem,
              index,
            ) => {
              const item =
                asRecord(
                  rawItem,
                );

              const id =
                asString(
                  item.id,
                );

              return (
                <EditorSection
                  key={
                    id ||
                    index
                  }
                  title={`Button ${index + 1}`}
                >
                  <TextField
                    label="Label"
                    value={
                      asString(
                        item.label,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "buttons",
                        id,
                        [
                          "label",
                        ],
                        value,
                      )
                    }
                  />

                  <UrlField
                    label="URL"
                    value={
                      asString(
                        item.url,
                      )
                    }
                    onChange={(
                      value,
                    ) =>
                      updateRepeater(
                        "buttons",
                        id,
                        [
                          "url",
                        ],
                        value,
                      )
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                      label="Style"
                      value={
                        asString(
                          item.style,
                        )
                      }
                      options={[
                        {
                          label:
                            "Primary",

                          value:
                            "primary",
                        },

                        {
                          label:
                            "Secondary",

                          value:
                            "secondary",
                        },

                        {
                          label:
                            "Text",

                          value:
                            "text",
                        },
                      ]}
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "buttons",
                          id,
                          [
                            "style",
                          ],
                          value,
                        )
                      }
                    />

                    <SelectField
                      label="Target"
                      value={
                        asString(
                          item.target,
                        )
                      }
                      options={[
                        {
                          label:
                            "Same tab",

                          value:
                            "same-tab",
                        },

                        {
                          label:
                            "New tab",

                          value:
                            "new-tab",
                        },
                      ]}
                      onChange={(
                        value,
                      ) =>
                        updateRepeater(
                          "buttons",
                          id,
                          [
                            "target",
                          ],
                          value,
                        )
                      }
                    />
                  </div>

                  <RepeaterActions
                    onMoveUp={() =>
                      moveRepeater(
                        "buttons",
                        id,
                        "up",
                      )
                    }
                    onMoveDown={() =>
                      moveRepeater(
                        "buttons",
                        id,
                        "down",
                      )
                    }
                    onDelete={() =>
                      removeRepeater(
                        "buttons",
                        id,
                      )
                    }
                  />
                </EditorSection>
              );
            },
          )}

          {presentationEditor()}
        </div>
      );
    }

    case "download": {
      return (
        <div className="space-y-4">
          <EditorSection title="App Download">
            <TextField
              label="Eyebrow"
              value={
                asString(
                  editorData.eyebrow,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "eyebrow",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Title"
              value={
                asString(
                  editorData.title,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "title",
                  ],
                  value,
                )
              }
            />

            <TextField
              label="Description"
              value={
                asString(
                  editorData.description,
                )
              }
              multiline
              onChange={(
                value,
              ) =>
                update(
                  [
                    "description",
                  ],
                  value,
                )
              }
            />

            <MediaPickerField
              label="App Image"
              value={
                asString(
                  editorData.image,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "image",
                  ],
                  value,
                )
              }
            />

            <UrlField
              label="Google Play URL"
              value={
                asString(
                  editorData.googlePlayUrl,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "googlePlayUrl",
                  ],
                  value,
                )
              }
            />

            <UrlField
              label="App Store URL"
              value={
                asString(
                  editorData.appStoreUrl,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "appStoreUrl",
                  ],
                  value,
                )
              }
            />

            <MediaPickerField
              label="QR Image"
              value={
                asString(
                  editorData.qrImage,
                )
              }
              onChange={(
                value,
              ) =>
                update(
                  [
                    "qrImage",
                  ],
                  value,
                )
              }
            />
          </EditorSection>

          {presentationEditor()}
        </div>
      );
    }

    case "divider": {
      return (
        <EditorSection title="Divider">
          <SelectField
            label="Divider Style"
            value={
              asString(
                editorData.style,
              )
            }
            options={[
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
            ]}
            onChange={(
              value,
            ) =>
              update(
                [
                  "style",
                ],
                value,
              )
            }
          />
        </EditorSection>
      );
    }

    case "spacer": {
      return (
        <EditorSection title="Spacer">
          <SelectField
            label="Spacer Size"
            value={
              asString(
                editorData.size,
              )
            }
            options={[
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
            ]}
            onChange={(
              value,
            ) =>
              update(
                [
                  "size",
                ],
                value,
              )
            }
          />
        </EditorSection>
      );
    }
  }

  return null;
}
