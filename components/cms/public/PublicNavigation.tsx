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
      className="pdf-navigation-link"
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
    | "horizontal"
    | "vertical";
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
            ? "pdf-navigation-list-vertical"
            : "pdf-navigation-list"
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
              className="pdf-navigation-item relative"
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
                      ? "mt-3 grid gap-2 border-l border-white/10 pl-4"
                      : "pdf-navigation-children"
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
