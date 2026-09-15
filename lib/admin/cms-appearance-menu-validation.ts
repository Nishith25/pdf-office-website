import type {
  CmsMenu,
} from "../cms/core/types";

type CmsMenuWithId =
  CmsMenu & {
    id:
      string;
  };

type CmsAppearanceMenuAssignments = {
  headerMenuId:
    string;

  footerMenuId:
    string;
};

function isValidHeaderMenu(
  menu:
    CmsMenuWithId,
): boolean {
  return (
    menu.location ===
      "header" ||
    menu.location ===
      "custom"
  );
}

function isValidFooterMenu(
  menu:
    CmsMenuWithId,
): boolean {
  return (
    menu.location ===
      "footer" ||
    menu.location ===
      "custom"
  );
}

export function areCmsAppearanceMenuAssignmentsValid(
  assignments:
    CmsAppearanceMenuAssignments,

  menus:
    readonly CmsMenuWithId[],
): boolean {
  if (
    assignments.headerMenuId
  ) {
    const headerMenu =
      menus.find(
        (
          menu,
        ) =>
          menu.id ===
          assignments.headerMenuId,
      );

    if (
      !headerMenu ||
      !isValidHeaderMenu(
        headerMenu,
      )
    ) {
      return false;
    }
  }

  if (
    assignments.footerMenuId
  ) {
    const footerMenu =
      menus.find(
        (
          menu,
        ) =>
          menu.id ===
          assignments.footerMenuId,
      );

    if (
      !footerMenu ||
      !isValidFooterMenu(
        footerMenu,
      )
    ) {
      return false;
    }
  }

  return true;
}