"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  buildCmsSettingsFromAppearance,
  cmsAppearanceEditorSchema,
  readCmsAppearanceFromFormData,
} from "../../../../lib/admin/cms-appearance-editor";

import {
  areCmsAppearanceMenuAssignmentsValid,
} from "../../../../lib/admin/cms-appearance-menu-validation";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeCmsActivity,
} from "../../../../lib/repositories/cms-activity";

import {
  listCmsMenus,
} from "../../../../lib/repositories/cms-menus";

import {
  getCmsSettings,
  saveCmsSettings,
} from "../../../../lib/repositories/cms-settings";

export async function saveCmsAppearanceAction(
  formData:
    FormData,
) {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }

  const input =
    readCmsAppearanceFromFormData(
      formData,
    );

  const parsed =
    cmsAppearanceEditorSchema.safeParse(
      input,
    );

  if (
    !parsed.success
  ) {
    redirect(
      "/admin/appearance?error=invalid",
    );
  }

  const [
    existing,
    menus,
  ] =
    await Promise.all([
      getCmsSettings(),

      listCmsMenus(),
    ]);

  const menuAssignmentsValid =
    areCmsAppearanceMenuAssignmentsValid(
      {
        headerMenuId:
          parsed.data
            .headerMenuId,

        footerMenuId:
          parsed.data
            .footerMenuId,
      },

      menus,
    );

  if (
    !menuAssignmentsValid
  ) {
    redirect(
      "/admin/appearance?error=menu",
    );
  }

  const settings =
    buildCmsSettingsFromAppearance(
      parsed.data,

      existing,
    );

  await saveCmsSettings(
    settings,
  );

  try {
    await writeCmsActivity({
      action:
        "Updated appearance",

      entityType:
        "settings",

      entityId:
        "global",

      entityName:
        settings.identity
          .siteName,

      createdAt:
        new Date(),
    });
  } catch (
    error
  ) {
    console.error(
      "Appearance activity log failed:",
      error,
    );
  }

  revalidatePath(
    "/admin",
  );

  revalidatePath(
    "/admin/appearance",
  );

  revalidatePath(
    "/admin/menus",
  );

  redirect(
    "/admin/appearance?saved=1",
  );
}