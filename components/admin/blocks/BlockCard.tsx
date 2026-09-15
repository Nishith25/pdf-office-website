"use client";

import {
  useState,
} from "react";

import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Save,
  Trash2,
} from "lucide-react";

import MediaPickerField from "../media/MediaPickerField";

import {
  getCmsBlockDefinition,
} from "../../../lib/cms/core/block-registry";

import type {
  CmsBlockType,
} from "../../../lib/cms/core/types";

import {
  deleteCmsBlockAction,
  duplicateCmsBlockAction,
  moveCmsBlockAction,
  toggleCmsBlockAction,
  updateCmsBlockAction,
} from "../../../app/admin/(protected)/pages/actions";

type Props = {
  pageId:
    string;

  block: {
    id:
      string;

    type:
      CmsBlockType;

    order:
      number;

    visible:
      boolean;

    data:
      Record<
        string,
        unknown
      >;
  };

  isFirst:
    boolean;

  isLast:
    boolean;
};

function stringValue(
  value:
    unknown,
): string {
  return typeof value ===
    "string"
    ? value
    : "";
}

function linesValue(
  value:
    unknown,
): string {
  return Array.isArray(
    value,
  )
    ? value
        .map(String)
        .join("\n")
    : "";
}

export default function BlockCard({
  pageId,
  block,
  isFirst,
  isLast,
}: Props) {
  const definition =
    getCmsBlockDefinition(
      block.type,
    );

  const initialMedia =
    Object.fromEntries(
      definition.fields
        .filter(
          (field) =>
            field.type ===
            "media",
        )
        .map(
          (field) => [
            field.key,
            stringValue(
              block.data[
                field.key
              ],
            ),
          ],
        ),
    );

  const [
    mediaValues,
    setMediaValues,
  ] =
    useState<
      Record<
        string,
        string
      >
    >(
      initialMedia,
    );

  return (
    <section
      className={`rounded-[16px] border bg-white ${
        block.visible
          ? "border-[#E1E4E9]"
          : "border-dashed border-[#C9CED7] opacity-70"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEEF1] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#EEF1FF] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#3157E7]">
              Block {
                block.order
              }
            </span>

            {!block.visible && (
              <span className="rounded-full bg-[#F0F1F3] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#858B96]">
                Hidden
              </span>
            )}
          </div>

          <h3 className="mt-2 text-sm font-bold text-[#282D37]">
            {
              definition.label
            }
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <form
            action={
              moveCmsBlockAction
            }
          >
            <input
              type="hidden"
              name="pageId"
              value={
                pageId
              }
            />

            <input
              type="hidden"
              name="blockId"
              value={
                block.id
              }
            />

            <input
              type="hidden"
              name="direction"
              value="up"
            />

            <button
              disabled={
                isFirst
              }
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7] disabled:opacity-30"
              title="Move up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </form>

          <form
            action={
              moveCmsBlockAction
            }
          >
            <input
              type="hidden"
              name="pageId"
              value={
                pageId
              }
            />

            <input
              type="hidden"
              name="blockId"
              value={
                block.id
              }
            />

            <input
              type="hidden"
              name="direction"
              value="down"
            />

            <button
              disabled={
                isLast
              }
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7] disabled:opacity-30"
              title="Move down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </form>

          <form
            action={
              duplicateCmsBlockAction
            }
          >
            <input
              type="hidden"
              name="pageId"
              value={
                pageId
              }
            />

            <input
              type="hidden"
              name="blockId"
              value={
                block.id
              }
            />

            <button
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
              title="Duplicate block"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </form>

          <form
            action={
              toggleCmsBlockAction
            }
          >
            <input
              type="hidden"
              name="pageId"
              value={
                pageId
              }
            />

            <input
              type="hidden"
              name="blockId"
              value={
                block.id
              }
            />

            <button
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
              title={
                block.visible
                  ? "Hide block"
                  : "Show block"
              }
            >
              {block.visible ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
            </button>
          </form>

          <form
            action={
              deleteCmsBlockAction
            }
          >
            <input
              type="hidden"
              name="pageId"
              value={
                pageId
              }
            />

            <input
              type="hidden"
              name="blockId"
              value={
                block.id
              }
            />

            <button
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#F0D5D5] text-[#B84E4E]"
              title="Delete block"
              onClick={(
                event,
              ) => {
                if (
                  !window.confirm(
                    "Delete this block?",
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      <form
        action={
          updateCmsBlockAction
        }
        className="p-5"
      >
        <input
          type="hidden"
          name="pageId"
          value={
            pageId
          }
        />

        <input
          type="hidden"
          name="blockId"
          value={
            block.id
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {definition.fields.map(
            (
              field,
            ) => {
              const value =
                block.data[
                  field.key
                ];

              if (
                field.type ===
                "media"
              ) {
                return (
                  <MediaPickerField
                    key={
                      field.key
                    }
                    label={
                      field.label
                    }
                    hint={
                      field.helpText
                    }
                    name={`field.${field.key}`}
                    value={
                      mediaValues[
                        field.key
                      ] ??
                      ""
                    }
                    onChange={(
                      nextValue,
                    ) =>
                      setMediaValues(
                        (
                          current,
                        ) => ({
                          ...current,

                          [field.key]:
                            nextValue,
                        }),
                      )
                    }
                  />
                );
              }

              if (
                field.type ===
                "textarea" ||
                field.type ===
                "lines"
              ) {
                return (
                  <label
                    key={
                      field.key
                    }
                    className="md:col-span-2"
                  >
                    <span className="text-[11px] font-semibold text-[#343A46]">
                      {
                        field.label
                      }
                    </span>

                    <textarea
                      name={`field.${field.key}`}
                      defaultValue={
                        field.type ===
                        "lines"
                          ? linesValue(
                              value,
                            )
                          : stringValue(
                              value,
                            )
                      }
                      rows={
                        field.type ===
                        "lines"
                          ? 6
                          : 5
                      }
                      className="mt-2 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#617CE4] focus:ring-4 focus:ring-[#3157E7]/[0.07]"
                    />

                    {field.helpText && (
                      <span className="mt-1 block text-[9px] text-[#9298A3]">
                        {
                          field.helpText
                        }
                      </span>
                    )}
                  </label>
                );
              }

              if (
                field.type ===
                "select"
              ) {
                return (
                  <label
                    key={
                      field.key
                    }
                  >
                    <span className="text-[11px] font-semibold text-[#343A46]">
                      {
                        field.label
                      }
                    </span>

                    <select
                      name={`field.${field.key}`}
                      defaultValue={
                        stringValue(
                          value,
                        )
                      }
                      className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 text-sm outline-none"
                    >
                      {field.options?.map(
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

              return (
                <label
                  key={
                    field.key
                  }
                >
                  <span className="text-[11px] font-semibold text-[#343A46]">
                    {
                      field.label
                    }
                  </span>

                  <input
                    name={`field.${field.key}`}
                    type={
                      field.type ===
                      "url"
                        ? "text"
                        : "text"
                    }
                    defaultValue={
                      stringValue(
                        value,
                      )
                    }
                    placeholder={
                      field.placeholder
                    }
                    className="mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 text-sm outline-none focus:border-[#617CE4] focus:ring-4 focus:ring-[#3157E7]/[0.07]"
                  />
                </label>
              );
            },
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[11px] font-semibold text-white"
          >
            <Save className="h-3.5 w-3.5" />

            Save block
          </button>
        </div>
      </form>
    </section>
  );
}