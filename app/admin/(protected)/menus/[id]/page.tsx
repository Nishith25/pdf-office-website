import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import DeleteMenuButton from "../../../../../components/admin/menus/DeleteMenuButton";

import MenuEditor from "../../../../../components/admin/menus/MenuEditor";

import {
  getCmsMenuById,
} from "../../../../../lib/repositories/cms-menus";

import {
  listCmsPages,
} from "../../../../../lib/repositories/cms-pages";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      id:
        string;
    }>;
};

export default async function CmsMenuEditorPage({
  params,
}: Props) {
  const {
    id,
  } =
    await params;

  const [
    menu,
    pages,
  ] =
    await Promise.all([
      getCmsMenuById(
        id,
      ),

      listCmsPages(),
    ]);

  if (!menu) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/admin/menus"
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#68717F]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />

        All menus
      </Link>

      <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${
                menu.location ===
                "header"
                  ? "bg-[#EEF2FF] text-[#3157E7]"
                  : menu.location ===
                      "footer"
                    ? "bg-[#EEF8F2] text-[#3F7B55]"
                    : "bg-[#F2F3F5] text-[#707783]"
              }`}
            >
              {
                menu.location
              }
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-[-0.03em]">
            {
              menu.name
            }
          </h1>

          <p className="mt-1 text-[10px] text-[#9298A3]">
            {
              menu.items.length
            }{" "}
            {
              menu.items.length ===
              1
                ? "menu item"
                : "menu items"
            }
          </p>
        </div>

        {menu.location ===
          "custom" && (
          <DeleteMenuButton
            menuId={
              menu.id
            }
            menuName={
              menu.name
            }
          />
        )}
      </div>

      <div className="mt-8">
        <MenuEditor
          menuId={
            menu.id
          }
          menu={{
            name:
              menu.name,

            key:
              menu.key,

            location:
              menu.location,

            items:
              menu.items,

            createdAt:
              menu.createdAt,

            updatedAt:
              menu.updatedAt,
          }}
          pages={
            pages.map(
              (
                page,
              ) => ({
                id:
                  page.id,

                title:
                  page.title,
              }),
            )
          }
        />
      </div>
    </div>
  );
}