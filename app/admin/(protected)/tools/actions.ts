"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  normalizeToolOrders,
  toolEditorSchema,
} from "../../../../lib/admin/tools-editor";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  saveTools,
} from "../../../../lib/repositories/site-content";

export async function saveToolsAction(
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

  const rawPayload =
    formData.get(
      "payload",
    );

  if (
    typeof rawPayload !==
    "string"
  ) {
    return {
      success: false,

      message:
        "Tool data was not received.",
    };
  }

  let payload:
    unknown;

  try {
    payload =
      JSON.parse(
        rawPayload,
      );
  } catch {
    return {
      success: false,

      message:
        "Tool data is invalid.",
    };
  }

  const parsed =
    toolEditorSchema.safeParse(
      payload,
    );

  if (
    !parsed.success
  ) {
    return {
      success: false,

      message:
        "Please check the PDF tool fields.",
    };
  }

  try {
    const tools =
      normalizeToolOrders(
        parsed.data,
      );

    await saveTools(
      tools,
    );

    await writeActivity(
      "Updated PDF tools",
      "tool",
      "PDF Tools",
    );

    revalidatePath(
      "/admin",
    );

    revalidatePath(
      "/admin/tools",
    );

    revalidatePath(
      "/",
    );

    return {
      success: true,

      message:
        "PDF tools saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "PDF tools save failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to save PDF tools.",
    };
  }
}