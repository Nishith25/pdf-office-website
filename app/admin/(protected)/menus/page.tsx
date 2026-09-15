import Link from "next/link";

import {
  ChevronRight,
  Menu,
  Plus,
} from "lucide-react";

import {
  createCmsMenuAction,
} from "./actions";

import {
  listCmsMenus,
} from "../../../../lib/repositories/cms-menus";

export const dynamic =
  "force-dynamic";

function locationLabel(
  location:
    "header" |
    "footer" |
    "custom",
) {
  if (
    location ===
    "header"
  ) {
    return "Header";
  }

  if (
    location ===
    "footer"
  ) {
    return "Footer";
  }

  return "Custom";
}

export default async function CmsMenusPage() {
  const menus =
    await listCmsMenus();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9AA0AA]">
            Navigation
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
            Menus
          </h1>

          <p className="mt-2 max-w-xl text-[11px] leading-5 text-[#7C8490]">
            Build reusable navigation menus for your website header,
            footer, or other locations.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          {menus.length ===
          0 ? (
            <div className="rounded-[18px] border border-dashed border-[#CCD1DA] bg-white p-10 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F4FF]">
                <Menu className="h-5 w-5 text-[#3157E7]" />
              </div>

              <h2 className="mt-4 text-sm font-bold">
                No menus yet
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-[10px] leading-5 text-[#8C929D]">
                Create your first navigation menu and then add CMS
                pages or custom links.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[18px] border border-[#E3E5E9] bg-white">
              {menus.map(
                (
                  menu,
                  index,
                ) => (
                  <Link
                    key={
                      menu.id
                    }
                    href={`/admin/menus/${menu.id}`}
                    className={`flex items-center justify-between gap-4 p-5 transition hover:bg-[#F8F9FB] ${
                      index !==
                      menus.length -
                        1
                        ? "border-b border-[#ECEEF1]"
                        : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-[13px] font-bold text-[#20242B]">
                          {
                            menu.name
                          }
                        </h2>

                        <span
                          className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${
                            menu.location ===
                            "header"
                              ? "bg-[#EEF2FF] text-[#3157E7]"
                              : menu.location ===
                                  "footer"
                                ? "bg-[#EEF8F2] text-[#3F7B55]"
                                : "bg-[#F2F3F5] text-[#707783]"
                          }`}
                        >
                          {locationLabel(
                            menu.location,
                          )}
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] text-[#9096A0]">
                        {
                          menu.items.length
                        }{" "}
                        {
                          menu.items.length ===
                          1
                            ? "item"
                            : "items"
                        }
                        {" · "}
                        {
                          menu.key
                        }
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-[#A1A6AF]" />
                  </Link>
                ),
              )}
            </div>
          )}
        </section>

        <aside>
          <div className="rounded-[18px] border border-[#E3E5E9] bg-white p-5">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#3157E7]" />

              <h2 className="text-[13px] font-bold">
                Create Menu
              </h2>
            </div>

            <form
              action={
                createCmsMenuAction
              }
              className="mt-5 space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#777F8B]">
                  Menu Name
                </span>

                <input
                  name="name"
                  required
                  placeholder="Main Navigation"
                  className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[11px] outline-none transition focus:border-[#3157E7]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#777F8B]">
                  Location
                </span>

                <select
                  name="location"
                  defaultValue="custom"
                  className="min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[11px] outline-none"
                >
                  <option value="header">
                    Header
                  </option>

                  <option value="footer">
                    Footer
                  </option>

                  <option value="custom">
                    Custom
                  </option>
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[10px] font-bold text-white transition hover:bg-[#294CCB]"
              >
                <Plus className="h-3.5 w-3.5" />

                Create Menu
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}