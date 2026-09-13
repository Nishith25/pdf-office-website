"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  buildScannerSectionUpdates,
  scannerDetailSchema,
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

export async function saveScannerDetailsAction(
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
        "Scanner data was not received.",
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
        "Scanner data is invalid.",
    };
  }

  const parsed =
    scannerDetailSchema.safeParse(
      payload,
    );

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Check the Scanner and OCR fields.",
    };
  }

  try {
    const sections =
      await getHomepageSections();

    await saveSiteSections(
      buildScannerSectionUpdates(
        parsed.data,
        sections,
      ),
    );

    await writeActivity(
      "Updated Scanner & OCR",
      "section",
      "Scanner & OCR",
    );

    revalidatePath(
      "/admin/scanner",
    );

    revalidatePath(
      "/admin/homepage",
    );

    revalidatePath(
      "/",
    );

    return {
      success: true,
      message:
        "Scanner & OCR details saved successfully.",
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
        "Unable to save Scanner & OCR details.",
    };
  }
}