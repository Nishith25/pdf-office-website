"use client";

import Link from "next/link";

import {
  Activity,
  FileText,
  ImageIcon,
  LayoutDashboard,
  Menu as MenuIcon,
  Palette,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  CMS_NAVIGATION,
  isCmsNavigationItemActive,
  type CmsNavigationIcon,
} from "../../lib/admin/cms-navigation";

function getNavigationIcon(
  icon:
    CmsNavigationIcon,
) {
  switch (
    icon
  ) {
    case "pages":
      return FileText;

    case "menus":
      return MenuIcon;

    case "media":
      return ImageIcon;

    case "appearance":
      return Palette;

    case "activity":
      return Activity;

    case "dashboard":
    default:
      return LayoutDashboard;
  }
}

export default function AdminSidebarNavigation() {
  const pathname =
    usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <div className="space-y-6">
        {CMS_NAVIGATION.map(
          (
            group,
          ) => (
            <section
              key={
                group.label
              }
            >
              <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#A1A6B0]">
                {
                  group.label
                }
              </p>

              <div className="space-y-1">
                {group.items.map(
                  (
                    item,
                  ) => {
                    const Icon =
                      getNavigationIcon(
                        item.icon,
                      );

                    const active =
                      isCmsNavigationItemActive(
                        pathname,
                        item.href,
                      );

                    return (
                      <Link
                        key={
                          item.href
                        }
                        href={
                          item.href
                        }
                        aria-current={
                          active
                            ? "page"
                            : undefined
                        }
                        className={`group flex min-h-10 items-center gap-3 rounded-[9px] px-3 text-[12px] font-medium transition ${
                          active
                            ? "bg-[#EEF2FF] text-[#3157E7]"
                            : "text-[#5C6370] hover:bg-[#F1F3F7] hover:text-[#3157E7]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 transition ${
                            active
                              ? "text-[#3157E7]"
                              : "text-[#8A909D] group-hover:text-[#3157E7]"
                          }`}
                        />

                        <span>
                          {
                            item.label
                          }
                        </span>
                      </Link>
                    );
                  },
                )}
              </div>
            </section>
          ),
        )}
      </div>
    </nav>
  );
}