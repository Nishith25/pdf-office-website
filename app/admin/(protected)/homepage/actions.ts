"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  buildHomepageSectionUpdates,
  homepageEditorSchema,
} from "../../../../lib/admin/homepage-editor";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  getHomepageSections,
  saveHomepageSections,
} from "../../../../lib/repositories/site-content";

function readText(
  formData: FormData,
  name: string,
): string {
  const value =
    formData.get(
      name,
    );

  return typeof value ===
    "string"
    ? value
    : "";
}

function readBoolean(
  formData: FormData,
  name: string,
): boolean {
  return (
    readText(
      formData,
      name,
    ) === "true"
  );
}

export async function saveHomepageAction(
  _previousState:
    AdminActionResult | null,

  formData: FormData,
): Promise<AdminActionResult> {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    return {
      success: false,

      message:
        "Your administrator session has expired. Please sign in again.",
    };
  }

  const input = {
    hero: {
      eyebrow:
        readText(
          formData,
          "hero.eyebrow",
        ),

      titleTop:
        readText(
          formData,
          "hero.titleTop",
        ),

      titleBottom:
        readText(
          formData,
          "hero.titleBottom",
        ),

      description:
        readText(
          formData,
          "hero.description",
        ),

      primaryCta:
        readText(
          formData,
          "hero.primaryCta",
        ),

      visible:
        readBoolean(
          formData,
          "hero.visible",
        ),
    },

    scanWorkflow: {
      eyebrow:
        readText(
          formData,
          "scanWorkflow.eyebrow",
        ),

      title:
        readText(
          formData,
          "scanWorkflow.title",
        ),

      description:
        readText(
          formData,
          "scanWorkflow.description",
        ),

      visible:
        readBoolean(
          formData,
          "scanWorkflow.visible",
        ),
    },

    ocr: {
      eyebrow:
        readText(
          formData,
          "ocr.eyebrow",
        ),

      title:
        readText(
          formData,
          "ocr.title",
        ),

      description:
        readText(
          formData,
          "ocr.description",
        ),

      visible:
        readBoolean(
          formData,
          "ocr.visible",
        ),
    },

    convertOrganize: {
      eyebrow:
        readText(
          formData,
          "convertOrganize.eyebrow",
        ),

      title:
        readText(
          formData,
          "convertOrganize.title",
        ),

      description:
        readText(
          formData,
          "convertOrganize.description",
        ),

      visible:
        readBoolean(
          formData,
          "convertOrganize.visible",
        ),
    },

    esign: {
      eyebrow:
        readText(
          formData,
          "esign.eyebrow",
        ),

      title:
        readText(
          formData,
          "esign.title",
        ),

      description:
        readText(
          formData,
          "esign.description",
        ),

      visible:
        readBoolean(
          formData,
          "esign.visible",
        ),
    },

    download: {
      eyebrow:
        readText(
          formData,
          "download.eyebrow",
        ),

      title:
        readText(
          formData,
          "download.title",
        ),

      description:
        readText(
          formData,
          "download.description",
        ),

      cta:
        readText(
          formData,
          "download.cta",
        ),

      visible:
        readBoolean(
          formData,
          "download.visible",
        ),
    },
  };

  const parsed =
    homepageEditorSchema.safeParse(
      input,
    );

  if (!parsed.success) {
    return {
      success: false,

      message:
        "Please check the homepage fields and try again.",
    };
  }

  try {
    const existingSections =
      await getHomepageSections();

    const updates =
      buildHomepageSectionUpdates(
        parsed.data,
        existingSections,
      );

    await saveHomepageSections(
      updates,
    );

    await writeActivity(
      "Updated homepage",
      "section",
      "Homepage",
    );

    revalidatePath(
      "/admin",
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
        "Homepage changes saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "Homepage save failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to save homepage changes. Please try again.",
    };
  }
}