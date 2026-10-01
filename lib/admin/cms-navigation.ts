export type CmsNavigationIcon =
  | "dashboard"
  | "pages"
  | "blog"
  | "menus"
  | "media"
  | "appearance"
  | "activity"
  | "homepage"
  | "seo"
  | "settings";

export type CmsNavigationItem = {
  label: string;
  href: string;
  icon: CmsNavigationIcon;
};

export type CmsNavigationGroup = {
  label: string;
  items: CmsNavigationItem[];
};

export const CMS_NAVIGATION:
  CmsNavigationGroup[] = [
    {
      label: "Overview",

      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: "dashboard",
        },
      ],
    },

    {
      label: "Website",

      items: [
        {
          label: "Homepage",
          href: "/admin/homepage",
          icon: "homepage",
        },

        {
          label: "Pages",
          href: "/admin/pages",
          icon: "pages",
        },

        {
          label: "Blog",
          href: "/admin/blog",
          icon: "blog",
        },

        {
          label: "Menus",
          href: "/admin/menus",
          icon: "menus",
        },
      ],
    },

    {
      label: "Assets",

      items: [
        {
          label: "Media",
          href: "/admin/media",
          icon: "media",
        },
      ],
    },

    {
      label: "Website Settings",

      items: [
        {
          label: "SEO",
          href: "/admin/seo",
          icon: "seo",
        },

        {
          label: "Appearance",
          href: "/admin/appearance",
          icon: "appearance",
        },
      ],
    },

    {
      label: "System",

      items: [
        {
          label: "Admin Security",
          href: "/admin/settings",
          icon: "settings",
        },

        {
          label: "Activity",
          href: "/admin/activity",
          icon: "activity",
        },
      ],
    },
  ];

export function isCmsNavigationItemActive(
  pathname: string,
  href: string,
): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}
