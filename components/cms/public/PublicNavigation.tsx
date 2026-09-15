import type {
  CmsPublicNavigationItem,
} from "../../../lib/cms/public/navigation";

function NavigationLink({
  item,
}: {
  item:
    CmsPublicNavigationItem;
}) {
  const external =
    item.target ===
    "new-tab";

  return (
    <a
      href={
        item.href
      }
      target={
        external
          ? "_blank"
          : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="text-sm font-medium opacity-75 transition hover:opacity-100"
    >
      {
        item.label
      }
    </a>
  );
}

export default function PublicNavigation({
  items,
  orientation =
    "horizontal",
}: {
  items:
    readonly CmsPublicNavigationItem[];

  orientation?:
    "horizontal" |
    "vertical";
}) {
  if (
    items.length ===
    0
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Site navigation"
    >
      <ul
        className={
          orientation ===
          "vertical"
            ? "space-y-3"
            : "flex flex-wrap items-center gap-x-6 gap-y-3"
        }
      >
        {items.map(
          (
            item,
          ) => (
            <li
              key={
                item.id
              }
              className="relative"
            >
              <NavigationLink
                item={
                  item
                }
              />

              {item.children
                .length >
                0 && (
                <ul
                  className={
                    orientation ===
                    "vertical"
                      ? "mt-3 space-y-2 border-l border-black/10 pl-4"
                      : "mt-2 flex flex-wrap gap-x-4 gap-y-2 lg:absolute lg:left-0 lg:top-full lg:z-30 lg:min-w-48 lg:flex-col lg:rounded-xl lg:border lg:border-black/10 lg:bg-white lg:p-3 lg:shadow-lg"
                  }
                >
                  {item.children.map(
                    (
                      child,
                    ) => (
                      <li
                        key={
                          child.id
                        }
                      >
                        <NavigationLink
                          item={
                            child
                          }
                        />
                      </li>
                    ),
                  )}
                </ul>
              )}
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}