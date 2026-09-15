export type CmsNavigationIcon =
  | "dashboard"
  | "pages"
  | "menus"
  | "media"
  | "appearance"
  | "activity";

export type CmsNavigationItem = {
  label:
    string;

  href:
    string;

  icon:
    CmsNavigationIcon;
};

export type CmsNavigationGroup = {
  label:
    string;

  items:
    CmsNavigationItem[];
};

export const CMS_NAVIGATION:
  CmsNavigationGroup[] = [
    {
      label:
        "Overview",

      items: [
        {
          label:
            "Dashboard",

          href:
            "/admin",

          icon:
            "dashboard",
        },
      ],
    },

    {
      label:
        "Content",

      items: [
        {
          label:
            "Pages",

          href:
            "/admin/pages",

          icon:
            "pages",
        },

        {
          label:
            "Menus",

          href:
            "/admin/menus",

          icon:
            "menus",
        },
      ],
    },

    {
      label:
        "Assets",

      items: [
        {
          label:
            "Media",

          href:
            "/admin/media",

          icon:
            "media",
        },
      ],
    },

    {
      label:
        "Appearance",

      items: [
        {
          label:
            "Appearance",

          href:
            "/admin/appearance",

          icon:
            "appearance",
        },
      ],
    },

    {
      label:
        "System",

      items: [
        {
          label:
            "Activity",

          href:
            "/admin/activity",

          icon:
            "activity",
        },
      ],
    },
  ];

export function isCmsNavigationItemActive(
  pathname:
    string,

  href:
    string,
): boolean {
  if (
    href ===
    "/admin"
  ) {
    return (
      pathname ===
      "/admin"
    );
  }

  return (
    pathname ===
      href ||
    pathname.startsWith(
      `${href}/`,
    )
  );
}