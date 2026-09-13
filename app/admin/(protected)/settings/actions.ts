"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  passwordChangeSchema,
} from "../../../../lib/admin/password-editor";

import {
  siteSettingsEditorSchema,
} from "../../../../lib/admin/settings-editor";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  hashPassword,
  verifyPassword,
} from "../../../../lib/auth/password";

import {
  findAdminByEmail,
  updateAdminPassword,
} from "../../../../lib/repositories/admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  saveSiteSettings,
} from "../../../../lib/repositories/site-content";

function readText(
  formData:
    FormData,
  key:
    string,
): string {
  const value =
    formData.get(
      key,
    );

  return typeof value ===
    "string"
    ? value
    : "";
}

export async function saveSiteSettingsAction(
  _previousState:
    AdminActionResult | null,

  formData:
    FormData,
): Promise<AdminActionResult> {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    return {
      success: false,

      message:
        "Your administrator session has expired.",
    };
  }

  const parsed =
    siteSettingsEditorSchema.safeParse({
      brandName:
        readText(
          formData,
          "brandName",
        ),

      shortName:
        readText(
          formData,
          "shortName",
        ),

      playStoreUrl:
        readText(
          formData,
          "playStoreUrl",
        ),

      siteUrl:
        readText(
          formData,
          "siteUrl",
        ),

      appIconUrl:
        readText(
          formData,
          "appIconUrl",
        ),

      footerText:
        readText(
          formData,
          "footerText",
        ),

      privacyUrl:
        readText(
          formData,
          "privacyUrl",
        ),

      termsUrl:
        readText(
          formData,
          "termsUrl",
        ),
    });

  if (
    !parsed.success
  ) {
    return {
      success: false,

      message:
        "Please check the website settings and URLs.",
    };
  }

  try {
    await saveSiteSettings(
      parsed.data,
    );

    await writeActivity(
      "Updated site settings",
      "settings",
      "Global Settings",
    );

    revalidatePath(
      "/",
    );

    revalidatePath(
      "/admin",
    );

    revalidatePath(
      "/admin/settings",
    );

    return {
      success: true,

      message:
        "Website settings saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "Settings save failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to save website settings.",
    };
  }
}

export async function changeAdminPasswordAction(
  _previousState:
    AdminActionResult | null,

  formData:
    FormData,
): Promise<AdminActionResult> {
  const currentAdmin =
    await getCurrentAdmin();

  if (
    !currentAdmin
  ) {
    return {
      success: false,

      message:
        "Your administrator session has expired.",
    };
  }

  const parsed =
    passwordChangeSchema.safeParse({
      currentPassword:
        readText(
          formData,
          "currentPassword",
        ),

      newPassword:
        readText(
          formData,
          "newPassword",
        ),

      confirmPassword:
        readText(
          formData,
          "confirmPassword",
        ),
    });

  if (
    !parsed.success
  ) {
    return {
      success: false,

      message:
        "Check the password fields. The new password must be at least 12 characters and both new password fields must match.",
    };
  }

  try {
    const admin =
      await findAdminByEmail(
        currentAdmin.email,
      );

    if (!admin) {
      return {
        success: false,

        message:
          "Administrator account could not be found.",
      };
    }

    const currentPasswordValid =
      await verifyPassword(
        parsed.data
          .currentPassword,

        admin.passwordHash,
      );

    if (
      !currentPasswordValid
    ) {
      return {
        success: false,

        message:
          "Current password is incorrect.",
      };
    }

    const sameAsCurrent =
      await verifyPassword(
        parsed.data
          .newPassword,

        admin.passwordHash,
      );

    if (
      sameAsCurrent
    ) {
      return {
        success: false,

        message:
          "Choose a new password that is different from your current password.",
      };
    }

    const passwordHash =
      await hashPassword(
        parsed.data
          .newPassword,
      );

    const updated =
      await updateAdminPassword(
        admin.email,
        passwordHash,
      );

    if (!updated) {
      return {
        success: false,

        message:
          "Unable to update the administrator password.",
      };
    }

    await writeActivity(
      "Changed admin password",
      "auth",
      "Administrator",
    );

    return {
      success: true,

      message:
        "Administrator password changed successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "Password change failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to change the administrator password.",
    };
  }
}