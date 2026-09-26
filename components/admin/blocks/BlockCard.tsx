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

import StructuredBlockEditor from "./StructuredBlockEditor";

import {
  getCmsStructuredEditorData,
  stringifyCmsStructuredBlockPayload,
} from "../../../lib/admin/cms-structured-block-editor";

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

  const [
    structuredData,
    setStructuredData,
  ] =
    useState<
      Record<
        string,
        unknown
      >
    >(() => {
      const normalized =
        getCmsStructuredEditorData(
          block.type,
          block.data,
        );

      return normalized as unknown as Record<
        string,
        unknown
      >;
    });

  const blockPayload =
    stringifyCmsStructuredBlockPayload(
      block.type,
      structuredData,
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

          <p className="mt-1 max-w-xl text-[9px] leading-relaxed text-[#9298A3]">
            {
              definition.description
            }
          </p>
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
              type="submit"
              disabled={
                isFirst
              }
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7] disabled:cursor-not-allowed disabled:opacity-30"
              title="Move up"
              aria-label="Move block up"
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
              type="submit"
              disabled={
                isLast
              }
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7] disabled:cursor-not-allowed disabled:opacity-30"
              title="Move down"
              aria-label="Move block down"
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
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
              title="Duplicate block"
              aria-label="Duplicate block"
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
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
              title={
                block.visible
                  ? "Hide block"
                  : "Show block"
              }
              aria-label={
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
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#F0D5D5] text-[#B84E4E]"
              title="Delete block"
              aria-label="Delete block"
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

        <input
          type="hidden"
          name="blockData"
          value={
            blockPayload
          }
        />

        <StructuredBlockEditor
          type={
            block.type
          }
          data={
            structuredData
          }
          onChange={(
            nextData,
          ) =>
            setStructuredData(
              nextData,
            )
          }
        />

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#ECEEF1] pt-5">
          <p className="text-[9px] leading-relaxed text-[#9298A3]">
            Save this block after making changes.
          </p>

          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[11px] font-semibold text-white transition hover:bg-[#294BC8]"
          >
            <Save className="h-3.5 w-3.5" />

            Save block
          </button>
        </div>
      </form>
    </section>
  );
}
