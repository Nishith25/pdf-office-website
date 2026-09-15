"use server";

import {
  randomUUID,
} from "node:crypto";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  readCmsMenuItemFromFormData,
} from "../../../../lib/admin/cms-menu-form";

import {
  addCmsMenuItem,
  moveCmsMenuItem,
  removeCmsMenuItem,
  setCmsMenuItemParent,
  updateCmsMenuItem,
} from "../../../../lib/cms/core/menu-operations";

import type {
  CmsMenuLocation,
} from "../../../../lib/cms/core/types";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeCmsActivity,
} from "../../../../lib/repositories/cms-activity";

import {
  deleteCmsMenuById,
  findAvailableCmsMenuKey,
  getCmsMenuById,
  insertCmsMenu,
  replaceCmsMenu,
} from "../../../../lib/repositories/cms-menus";

import {
  getCmsPageById,
} from "../../../../lib/repositories/cms-pages";

import {
  getCmsSettings,
} from "../../../../lib/repositories/cms-settings";

async function requireAdmin() {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }

  return admin;
}

function readText(
  formData:
    FormData,

  name:
    string,
): string {
  const value =
    formData.get(
      name,
    );

  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readMenuLocation(
  value:
    string,
): CmsMenuLocation {
  if (
    value ===
      "header" ||
    value ===
      "footer"
  ) {
    return value;
  }

  return "custom";
}

function refreshMenu(
  menuId:
    string,
) {
  revalidatePath(
    "/admin",
  );

  revalidatePath(
    "/admin/menus",
  );

  revalidatePath(
    `/admin/menus/${menuId}`,
  );

  revalidatePath(
    "/admin/appearance",
  );
}

async function logMenuActivity(
  action:
    string,

  entityId:
    string,

  entityName:
    string,
) {
  try {
    await writeCmsActivity({
      action,

      entityType:
        "menu",

      entityId,

      entityName,

      createdAt:
        new Date(),
    });
  } catch (
    error
  ) {
    console.error(
      "Menu activity log failed:",
      error,
    );
  }
}

export async function createCmsMenuAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const name =
    readText(
      formData,
      "name",
    );

  if (!name) {
    redirect(
      "/admin/menus?error=name",
    );
  }

  const location =
    readMenuLocation(
      readText(
        formData,
        "location",
      ),
    );

  const key =
    await findAvailableCmsMenuKey(
      name,
    );

  const now =
    new Date();

  const menu =
    await insertCmsMenu({
      name,

      key,

      location,

      items:
        [],

      createdAt:
        now,

      updatedAt:
        now,
    });

  await logMenuActivity(
    "Created menu",

    menu.id,

    menu.name,
  );

  redirect(
    `/admin/menus/${menu.id}`,
  );
}

export async function saveCmsMenuAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    redirect(
      "/admin/menus?error=missing",
    );
  }

  const name =
    readText(
      formData,
      "name",
    );

  if (!name) {
    return;
  }

  await replaceCmsMenu(
    menu.id,

    {
      name,

      key:
        menu.key,

      location:
        menu.location,

      items:
        menu.items,

      createdAt:
        menu.createdAt,

      updatedAt:
        new Date(),
    },
  );

  await logMenuActivity(
    "Updated menu",

    menu.id,

    name,
  );

  refreshMenu(
    menu.id,
  );
}

export async function deleteCmsMenuAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  /*
   * Header/footer menus are retained as stable
   * structural menus. Only custom menus can be
   * deleted from this action.
   */
  if (
    menu.location !==
    "custom"
  ) {
    return;
  }

  const settings =
    await getCmsSettings();

  if (
    settings.footer
      .headerMenuId ===
      menu.id ||
    settings.footer
      .footerMenuId ===
      menu.id
  ) {
    return;
  }

  const deleted =
    await deleteCmsMenuById(
      menu.id,
    );

  if (deleted) {
    await logMenuActivity(
      "Deleted menu",

      menu.id,

      menu.name,
    );
  }

  revalidatePath(
    "/admin/menus",
  );

  redirect(
    "/admin/menus",
  );
}

export async function addCmsPageMenuItemAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const pageId =
    readText(
      formData,
      "pageId",
    );

  const [
    menu,
    page,
  ] =
    await Promise.all([
      getCmsMenuById(
        menuId,
      ),

      getCmsPageById(
        pageId,
      ),
    ]);

  if (
    !menu ||
    !page
  ) {
    return;
  }

  const label =
    readText(
      formData,
      "label",
    ) ||
    page.title;

  const items =
    addCmsMenuItem(
      menu.items,

      {
        id:
          randomUUID(),

        label,

        type:
          "page",

        pageId:
          page.id,

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          menu.items.length +
          1,

        enabled:
          true,
      },
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  await logMenuActivity(
    "Added page link",

    menu.id,

    menu.name,
  );

  refreshMenu(
    menu.id,
  );
}

export async function addCmsCustomMenuItemAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  const input =
    readCmsMenuItemFromFormData(
      formData,
    );

  if (
    !input.label ||
    !input.customUrl
  ) {
    return;
  }

  const items =
    addCmsMenuItem(
      menu.items,

      {
        id:
          randomUUID(),

        label:
          input.label,

        type:
          "custom",

        pageId:
          null,

        customUrl:
          input.customUrl,

        target:
          input.target,

        parentId:
          null,

        order:
          menu.items.length +
          1,

        enabled:
          true,
      },
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  await logMenuActivity(
    "Added custom link",

    menu.id,

    menu.name,
  );

  refreshMenu(
    menu.id,
  );
}

export async function updateCmsMenuItemAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const itemId =
    readText(
      formData,
      "itemId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  const existing =
    menu.items.find(
      (
        item,
      ) =>
        item.id ===
        itemId,
    );

  if (!existing) {
    return;
  }

  const input =
    readCmsMenuItemFromFormData(
      formData,
    );

  if (!input.label) {
    return;
  }

  if (
    input.type ===
      "page"
  ) {
    if (
      !input.pageId
    ) {
      return;
    }

    const page =
      await getCmsPageById(
        input.pageId,
      );

    if (!page) {
      return;
    }
  } else if (
    !input.customUrl
  ) {
    return;
  }

  const items =
    updateCmsMenuItem(
      menu.items,

      itemId,

      {
        label:
          input.label,

        type:
          input.type,

        pageId:
          input.type ===
          "page"
            ? input.pageId
            : null,

        customUrl:
          input.type ===
          "custom"
            ? input.customUrl
            : "",

        target:
          input.target,

        enabled:
          input.enabled,
      },
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  refreshMenu(
    menu.id,
  );
}

export async function moveCmsMenuItemAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const itemId =
    readText(
      formData,
      "itemId",
    );

  const direction =
    readText(
      formData,
      "direction",
    );

  if (
    direction !==
      "up" &&
    direction !==
      "down"
  ) {
    return;
  }

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  if (
    !menu.items.some(
      (
        item,
      ) =>
        item.id ===
        itemId,
    )
  ) {
    return;
  }

  const items =
    moveCmsMenuItem(
      menu.items,

      itemId,

      direction,
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  refreshMenu(
    menu.id,
  );
}

export async function setCmsMenuParentAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const itemId =
    readText(
      formData,
      "itemId",
    );

  const parent =
    readText(
      formData,
      "parentId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  const items =
    setCmsMenuItemParent(
      menu.items,

      itemId,

      parent ||
        null,
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  refreshMenu(
    menu.id,
  );
}

export async function removeCmsMenuItemAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const menuId =
    readText(
      formData,
      "menuId",
    );

  const itemId =
    readText(
      formData,
      "itemId",
    );

  const menu =
    await getCmsMenuById(
      menuId,
    );

  if (!menu) {
    return;
  }

  const items =
    removeCmsMenuItem(
      menu.items,

      itemId,
    );

  await replaceCmsMenu(
    menu.id,

    {
      ...menu,

      items,

      updatedAt:
        new Date(),
    },
  );

  await logMenuActivity(
    "Removed menu link",

    menu.id,

    menu.name,
  );

  refreshMenu(
    menu.id,
  );
}