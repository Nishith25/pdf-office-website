import {
  Link2,
  Plus,
} from "lucide-react";

import type {
  CmsMenu,
} from "../../../lib/cms/core/types";

import MenuItemCard from "./MenuItemCard";

import {
  addCmsCustomMenuItemAction,
  addCmsPageMenuItemAction,
  saveCmsMenuAction,
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

  menu:
    CmsMenu;

  pages:
    PageOption[];
};

export default function MenuEditor({
  menuId,
  menu,
  pages,
}: Props) {
  const orderedItems = [
    ...menu.items,
  ].sort(
    (
      a,
      b,
    ) =>
      a.order -
      b.order,
  );

  return (
    <div className="space-y-7">
      <section className="rounded-[18px] border border-[#E2E5E9] bg-white p-5">
        <h2 className="text-[13px] font-bold">
          Menu Settings
        </h2>

        <form
          action={
            saveCmsMenuAction
          }
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <input
            type="hidden"
            name="menuId"
            value={
              menuId
            }
          />

          <label className="flex-1">
            <span className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#848B96]">
              Menu Name
            </span>

            <input
              name="name"
              defaultValue={
                menu.name
              }
              required
              className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] px-3 text-[11px] outline-none focus:border-[#3157E7]"
            />
          </label>

          <button
            type="submit"
            className="min-h-10 rounded-[9px] bg-[#252A32] px-5 text-[10px] font-bold text-white"
          >
            Save Menu
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 text-[9px]">
          <span className="rounded-full bg-[#F2F3F5] px-2.5 py-1 font-semibold text-[#69717D]">
            Key: {
              menu.key
            }
          </span>

          <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 font-semibold capitalize text-[#3157E7]">
            {
              menu.location
            }
          </span>
        </div>
      </section>

      <section>
        <div>
          <h2 className="text-[14px] font-bold">
            Menu Items
          </h2>

          <p className="mt-1 text-[10px] text-[#8A919C]">
            Reorder links, create one level of nesting, rename
            labels, and choose where each link opens.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {orderedItems.length ===
          0 ? (
            <div className="rounded-[16px] border border-dashed border-[#CDD2DA] bg-white p-10 text-center">
              <Link2 className="mx-auto h-5 w-5 text-[#9BA1AA]" />

              <p className="mt-3 text-[11px] font-bold">
                This menu is empty
              </p>

              <p className="mt-1 text-[9px] text-[#9298A3]">
                Add a page or custom link below.
              </p>
            </div>
          ) : (
            orderedItems.map(
              (
                item,
                index,
              ) => {
                const possibleParents =
                  orderedItems
                    .filter(
                      (
                        candidate,
                      ) =>
                        candidate.id !==
                          item.id &&
                        candidate.parentId ===
                          null &&
                        !orderedItems.some(
                          (
                            child,
                          ) =>
                            child.parentId ===
                            item.id,
                        ),
                    )
                    .map(
                      (
                        candidate,
                      ) => ({
                        id:
                          candidate.id,

                        label:
                          candidate.label,
                      }),
                    );

                const siblings =
                  orderedItems.filter(
                    (
                      candidate,
                    ) =>
                      candidate.parentId ===
                      item.parentId,
                  );

                const siblingIndex =
                  siblings.findIndex(
                    (
                      candidate,
                    ) =>
                      candidate.id ===
                      item.id,
                  );

                return (
                  <MenuItemCard
                    key={
                      item.id
                    }
                    menuId={
                      menuId
                    }
                    item={
                      item
                    }
                    pages={
                      pages
                    }
                    possibleParents={
                      possibleParents
                    }
                    isFirst={
                      siblingIndex ===
                      0
                    }
                    isLast={
                      siblingIndex ===
                      siblings.length -
                        1
                    }
                  />
                );
              },
            )
          )}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[18px] border border-[#E2E5E9] bg-white p-5">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#3157E7]" />

            <h2 className="text-[12px] font-bold">
              Add CMS Page
            </h2>
          </div>

          <form
            action={
              addCmsPageMenuItemAction
            }
            className="mt-4 space-y-3"
          >
            <input
              type="hidden"
              name="menuId"
              value={
                menuId
              }
            />

            <label className="block">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
                Page
              </span>

              <select
                name="pageId"
                required
                defaultValue=""
                className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
              >
                <option
                  value=""
                  disabled
                >
                  Select a page
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

            <label className="block">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
                Custom Label — optional
              </span>

              <input
                name="label"
                placeholder="Uses page title by default"
                className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] px-3 text-[10px]"
              />
            </label>

            <button
              type="submit"
              className="min-h-9 rounded-[8px] bg-[#3157E7] px-4 text-[9px] font-bold text-white"
            >
              Add Page
            </button>
          </form>
        </div>

        <div className="rounded-[18px] border border-[#E2E5E9] bg-white p-5">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#3157E7]" />

            <h2 className="text-[12px] font-bold">
              Add Custom Link
            </h2>
          </div>

          <form
            action={
              addCmsCustomMenuItemAction
            }
            className="mt-4 space-y-3"
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
              name="type"
              value="custom"
            />

            <label className="block">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
                Label
              </span>

              <input
                name="label"
                required
                placeholder="Community"
                className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] px-3 text-[10px]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
                URL
              </span>

              <input
                name="customUrl"
                required
                placeholder="https://example.com or /contact"
                className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] px-3 text-[10px]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#898F99]">
                Open In
              </span>

              <select
                name="target"
                defaultValue="same-tab"
                className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px]"
              >
                <option value="same-tab">
                  Same tab
                </option>

                <option value="new-tab">
                  New tab
                </option>
              </select>
            </label>

            <input
              type="hidden"
              name="enabled"
              value="true"
            />

            <button
              type="submit"
              className="min-h-9 rounded-[8px] bg-[#3157E7] px-4 text-[9px] font-bold text-white"
            >
              Add Custom Link
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}