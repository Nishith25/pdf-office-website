"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  faqEditorSchema,
  normalizeFaqOrders,
} from "../../../../lib/admin/faq-editor";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  saveFaqAdminItems,
} from "../../../../lib/repositories/faq-admin";

export async function saveFaqsAction(
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
        "FAQ data was not received.",
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
        "FAQ data is invalid.",
    };
  }

  const parsed =
    faqEditorSchema.safeParse(
      payload,
    );

  if (
    !parsed.success
  ) {
    return {
      success: false,

      message:
        "Please check the FAQ questions and answers.",
    };
  }

  try {
    await saveFaqAdminItems(
      normalizeFaqOrders(
        parsed.data,
      ),
    );

    await writeActivity(
      "Updated FAQs",
      "faq",
      "FAQ",
    );

    revalidatePath(
      "/admin",
    );

    revalidatePath(
      "/admin/faq",
    );

    revalidatePath(
      "/",
    );

    return {
      success: true,

      message:
        "FAQs saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "FAQ save failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to save FAQs.",
    };
  }
}