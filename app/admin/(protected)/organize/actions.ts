"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  buildOrganizeSectionUpdate,
  organizeDetailSchema,
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

export async function saveOrganizeAction(
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
        "Organize data was not received.",
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
        "Organize data is invalid.",
    };
  }

  const parsed =
    organizeDetailSchema.safeParse(
      payload,
    );

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Check the Convert & Organize fields.",
    };
  }

  try {
    const sections =
      await getHomepageSections();

    await saveSiteSections([
      buildOrganizeSectionUpdate(
        parsed.data,
        sections,
      ),
    ]);

    await writeActivity(
      "Updated Convert & Organize",
      "section",
      "Convert & Organize",
    );

    revalidatePath(
      "/admin/organize",
    );

    revalidatePath(
      "/",
    );

    return {
      success: true,
      message:
        "Convert & Organize details saved.",
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
        "Unable to save Convert & Organize details.",
    };
  }
}