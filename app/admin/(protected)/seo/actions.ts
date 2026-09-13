"use server";

import {
  revalidatePath,
} from "next/cache";

import type {
  AdminActionResult,
} from "../../../../lib/admin/action-result";

import {
  buildHomePageFromSeo,
  seoEditorSchema,
} from "../../../../lib/admin/seo-editor";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  saveHomePage,
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

export async function saveSeoAction(
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
    seoEditorSchema.safeParse({
      title:
        readText(
          formData,
          "title",
        ),

      description:
        readText(
          formData,
          "description",
        ),

      keywordsText:
        readText(
          formData,
          "keywordsText",
        ),

      ogTitle:
        readText(
          formData,
          "ogTitle",
        ),

      ogDescription:
        readText(
          formData,
          "ogDescription",
        ),

      ogImage:
        readText(
          formData,
          "ogImage",
        ),

      canonicalUrl:
        readText(
          formData,
          "canonicalUrl",
        ),
    });

  if (
    !parsed.success
  ) {
    return {
      success: false,

      message:
        "Please check the SEO fields and URLs.",
    };
  }

  try {
    await saveHomePage(
      buildHomePageFromSeo(
        parsed.data,
      ),
    );

    await writeActivity(
      "Updated SEO",
      "seo",
      "Homepage SEO",
    );

    revalidatePath(
      "/",
    );

    revalidatePath(
      "/admin",
    );

    revalidatePath(
      "/admin/seo",
    );

    return {
      success: true,

      message:
        "SEO settings saved successfully.",
    };
  } catch (
    error
  ) {
    console.error(
      "SEO save failed:",
      error,
    );

    return {
      success: false,

      message:
        "Unable to save SEO settings.",
    };
  }
}