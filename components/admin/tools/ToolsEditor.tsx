"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Star,
} from "lucide-react";

import {
  saveToolsAction,
} from "../../../app/admin/(protected)/tools/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import {
  moveArrayItem,
} from "../../../lib/admin/list-editor";

import {
  normalizeToolOrders,
} from "../../../lib/admin/tools-editor";

import type {
  ToolItem,
} from "../../../lib/cms/types";

import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";

type ToolsEditorProps = {
  initialTools:
    ToolItem[];
};

export default function ToolsEditor({
  initialTools,
}: ToolsEditorProps) {
  const [
    tools,
    setTools,
  ] =
    useState(
      normalizeToolOrders(
        initialTools,
      ),
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveToolsAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

  function updateTool(
    index: number,
    changes:
      Partial<ToolItem>,
  ) {
    setTools(
      (current) =>
        normalizeToolOrders(
          current.map(
            (
              tool,
              currentIndex,
            ) =>
              currentIndex ===
              index
                ? {
                    ...tool,
                    ...changes,
                  }
                : tool,
          ),
        ),
    );
  }

  function moveTool(
    index: number,
    direction:
      -1 | 1,
  ) {
    const destination =
      index +
      direction;

    setTools(
      (current) =>
        normalizeToolOrders(
          moveArrayItem(
            current,
            index,
            destination,
          ),
        ),
    );
  }

  return (
    <form
      action={
        formAction
      }
    >
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify(
          normalizeToolOrders(
            tools,
          ),
        )}
      />

      {notice && (
        <div className="mb-5">
          <AdminNotice
            tone={
              notice.tone
            }
            message={
              notice.message
            }
          />
        </div>
      )}

      <div className="overflow-hidden rounded-[16px] border border-[#E2E4E8] bg-white">
        <div className="hidden grid-cols-[40px_60px_minmax(150px,0.8fr)_minmax(220px,1.5fr)_110px_110px] gap-3 border-b border-[#E7E9ED] bg-[#F8F9FA] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8C929E] lg:grid">
          <span />
          <span>
            Order
          </span>
          <span>
            Tool
          </span>
          <span>
            Description
          </span>
          <span>
            Visibility
          </span>
          <span>
            Featured
          </span>
        </div>

        <div className="divide-y divide-[#ECEEF1]">
          {tools.map(
            (
              tool,
              index,
            ) => (
              <div
                key={
                  tool.type
                }
                className="grid gap-4 px-4 py-4 lg:grid-cols-[40px_60px_minmax(150px,0.8fr)_minmax(220px,1.5fr)_110px_110px] lg:items-center lg:gap-3"
              >
                <div className="hidden justify-center lg:flex">
                  <GripVertical className="h-4 w-4 text-[#B0B5BE]" />
                </div>

                <div className="flex items-center gap-1">
                  <span className="mr-2 min-w-5 text-[10px] font-semibold text-[#737A87]">
                    {index +
                      1}
                  </span>

                  <button
                    type="button"
                    disabled={
                      index ===
                      0
                    }
                    onClick={() =>
                      moveTool(
                        index,
                        -1,
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#E0E3E8] disabled:opacity-30"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>

                  <button
                    type="button"
                    disabled={
                      index ===
                      tools.length -
                        1
                    }
                    onClick={() =>
                      moveTool(
                        index,
                        1,
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#E0E3E8] disabled:opacity-30"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold text-[#8C929E] lg:hidden">
                    Tool name
                  </label>

                  <input
                    value={
                      tool.name
                    }
                    onChange={(
                      event,
                    ) =>
                      updateTool(
                        index,
                        {
                          name:
                            event
                              .target
                              .value,
                        },
                      )
                    }
                    className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-xs font-semibold text-[#2B303A] outline-none focus:border-[#637DE1]"
                  />

                  <p className="mt-1 text-[8px] text-[#A0A5AE]">
                    {
                      tool.type
                    }
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold text-[#8C929E] lg:hidden">
                    Description
                  </label>

                  <input
                    value={
                      tool.description
                    }
                    placeholder="Short tool description"
                    onChange={(
                      event,
                    ) =>
                      updateTool(
                        index,
                        {
                          description:
                            event
                              .target
                              .value,
                        },
                      )
                    }
                    className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[11px] text-[#555C68] outline-none focus:border-[#637DE1]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateTool(
                      index,
                      {
                        visible:
                          !tool.visible,
                      },
                    )
                  }
                  className={`flex min-h-9 items-center justify-center gap-1.5 rounded-[8px] border px-2 text-[9px] font-semibold ${
                    tool.visible
                      ? "border-[#CFE2D5] bg-[#F2FAF4] text-[#3D7750]"
                      : "border-[#E0E2E6] bg-[#F7F8F9] text-[#858B95]"
                  }`}
                >
                  {tool.visible
                    ? (
                      <Eye className="h-3 w-3" />
                    )
                    : (
                      <EyeOff className="h-3 w-3" />
                    )}

                  {tool.visible
                    ? "Visible"
                    : "Hidden"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateTool(
                      index,
                      {
                        featured:
                          !tool.featured,
                      },
                    )
                  }
                  className={`flex min-h-9 items-center justify-center gap-1.5 rounded-[8px] border px-2 text-[9px] font-semibold ${
                    tool.featured
                      ? "border-[#E7D9A8] bg-[#FFF9E7] text-[#876D20]"
                      : "border-[#E0E2E6] bg-white text-[#858B95]"
                  }`}
                >
                  <Star className="h-3 w-3" />

                  {tool.featured
                    ? "Featured"
                    : "Standard"}
                </button>
              </div>
            ),
          )}
        </div>
      </div>

      <AdminSaveBar
        saving={
          saving
        }
      />
    </form>
  );
}