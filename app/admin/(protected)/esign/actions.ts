"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  buildEsignSectionUpdate,
  esignDetailSchema,
} from "../../../../lib/admin/section-detail-editors";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  getHomepageSections,
  saveSiteSections,
} from "../../../../lib/repositories/site-content";

export async function saveEsignAction(
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

  const raw =
    formData.get(
      "payload",
    );

  if (
    typeof raw !==
    "string"
  ) {
    return {
      success: false,
      message:
        "eSign data was not received.",
    };
  }

  let payload:
    unknown;

  try {
    payload =
      JSON.parse(
        raw,
      );
  } catch {
    return {
      success: false,
      message:
        "eSign data is invalid.",
    };
  }

  const parsed =
    esignDetailSchema.safeParse(
      payload,
    );

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Check the eSign fields.",
    };
  }

  try {
    const sections =
      await getHomepageSections();

    await saveSiteSections([
      buildEsignSectionUpdate(
        parsed.data,
        sections,
      ),
    ]);

    await writeActivity(
      "Updated eSign",
      "section",
      "eSign",
    );

    revalidatePath(
      "/admin/esign",
    );

    revalidatePath(
      "/",
    );

    return {
      success: true,
      message:
        "eSign details saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      error,
    );

    return {
      success: false,
      message:
        "Unable to save eSign details.",
    };
  }
}