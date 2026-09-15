"use client";

import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Link2,
  Trash2,
} from "lucide-react";

import type {
  CmsMenuItem,
} from "../../../lib/cms/core/types";

import {
  moveCmsMenuItemAction,
  removeCmsMenuItemAction,
  setCmsMenuParentAction,
  updateCmsMenuItemAction,
} from "../../../app/admin/(protected)/menus/actions";

type PageOption = {
  id:
    string;

  title:
    string;
};

type Props = {
  menuId:
    string;

  item:
    CmsMenuItem;

  pages:
    PageOption[];

  possibleParents:
    {
      id:
        string;

      label:
        string;
    }[];

  isFirst:
    boolean;

  isLast:
    boolean;
};

export default function MenuItemCard({
  menuId,
  item,
  pages,
  possibleParents,
  isFirst,
  isLast,
}: Props) {
  return (
    <article
      className={`rounded-[14px] border bg-white p-4 ${
        item.parentId
          ? "ml-6 border-[#DCE2F8]"
          : "border-[#E2E5EA]"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-[8px] ${
                item.type ===
                "page"
                  ? "bg-[#EEF2FF] text-[#3157E7]"
                  : "bg-[#F2F4F7] text-[#68717F]"
              }`}
            >
              {item.type ===
              "page" ? (
                <Link2 className="h-3.5 w-3.5" />
              ) : (
                <ExternalLink className="h-3.5 w-3.5" />
              )}
            </div>

            <div>
              <p className="text-[11px] font-bold text-[#272B32]">
                {
                  item.label
                }
              </p>

              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#949AA4]">
                {
                  item.type
                }
                {item.parentId
                  ? " · Child item"
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <form
              action={
                moveCmsMenuItemAction
              }
            >
              <input
                type="hidden"
                name="menuId"
                value={
                  menuId
                }
              />

              <input
                type="hidden"
                name="itemId"
                value={
                  item.id
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
                title="Move up"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E1E4E8] text-[#69717E] transition hover:bg-[#F7F8FA] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </form>

            <form
              action={
                moveCmsMenuItemAction
              }
            >
              <input
                type="hidden"
                name="menuId"
                value={
                  menuId
                }
              />

              <input
                type="hidden"
                name="itemId"
                value={
                  item.id
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
                title="Move down"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E1E4E8] text-[#69717E] transition hover:bg-[#F7F8FA] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </form>

            <form
              action={
                removeCmsMenuItemAction
              }
              onSubmit={(
                event,
              ) => {
                const confirmed =
                  window.confirm(
                    `Remove "${item.label}" from this menu?`,
                  );

                if (
                  !confirmed
                ) {
                  event.preventDefault();
                }
              }}
            >
              <input
                type="hidden"
                name="menuId"
                value={
                  menuId
                }
              />

              <input
                type="hidden"
                name="itemId"
                value={
                  item.id
                }
              />

              <button
                type="submit"
                title="Remove"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#F0D4D4] text-[#B14C4C] transition hover:bg-[#FFF7F7]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <form
          action={
            updateCmsMenuItemAction
          }
          className="grid gap-3 md:grid-cols-2"
        >
          <input
            type="hidden"
            name="menuId"
            value={
              menuId
            }
          />

          <input
            type="hidden"
            name="itemId"
            value={
              item.id
            }
          />

          <label>
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              Label
            </span>

            <input
              name="label"
              defaultValue={
                item.label
              }
              required
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] px-3 text-[10px] outline-none focus:border-[#3157E7]"
            />
          </label>

          <label>
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              Type
            </span>

            <select
              name="type"
              defaultValue={
                item.type
              }
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
            >
              <option value="page">
                Page
              </option>

              <option value="custom">
                Custom Link
              </option>
            </select>
          </label>

          <label>
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              CMS Page
            </span>

            <select
              name="pageId"
              defaultValue={
                item.pageId ??
                ""
              }
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
            >
              <option value="">
                Select page
              </option>

              {pages.map(
                (
                  page,
                ) => (
                  <option
                    key={
                      page.id
                    }
                    value={
                      page.id
                    }
                  >
                    {
                      page.title
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              Custom URL
            </span>

            <input
              name="customUrl"
              defaultValue={
                item.customUrl
              }
              placeholder="https://example.com or /contact"
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] px-3 text-[10px] outline-none focus:border-[#3157E7]"
            />
          </label>

          <label>
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              Link Target
            </span>

            <select
              name="target"
              defaultValue={
                item.target
              }
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
            >
              <option value="same-tab">
                Same tab
              </option>

              <option value="new-tab">
                New tab
              </option>
            </select>
          </label>

          <label className="flex min-h-9 items-center gap-2 self-end rounded-[8px] border border-[#E1E4E8] px-3">
            <input
              type="checkbox"
              name="enabled"
              value="true"
              defaultChecked={
                item.enabled
              }
            />

            <span className="text-[10px] font-semibold text-[#545B66]">
              Enabled
            </span>
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="min-h-9 rounded-[8px] bg-[#252A32] px-4 text-[9px] font-bold text-white transition hover:bg-black"
            >
              Save Item
            </button>
          </div>
        </form>

        <form
          action={
            setCmsMenuParentAction
          }
          className="flex flex-col gap-2 border-t border-[#EFF0F2] pt-3 sm:flex-row sm:items-end"
        >
          <input
            type="hidden"
            name="menuId"
            value={
              menuId
            }
          />

          <input
            type="hidden"
            name="itemId"
            value={
              item.id
            }
          />

          <label className="flex-1">
            <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
              Parent Item
            </span>

            <select
              name="parentId"
              defaultValue={
                item.parentId ??
                ""
              }
              className="min-h-9 w-full rounded-[8px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
            >
              <option value="">
                No parent
              </option>

              {possibleParents.map(
                (
                  parent,
                ) => (
                  <option
                    key={
                      parent.id
                    }
                    value={
                      parent.id
                    }
                  >
                    {
                      parent.label
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <button
            type="submit"
            className="min-h-9 rounded-[8px] border border-[#DDE0E6] bg-white px-4 text-[9px] font-bold"
          >
            Set Parent
          </button>
        </form>
      </div>
    </article>
  );
}