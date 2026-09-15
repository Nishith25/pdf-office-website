import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsSettingsSchema,
} from "../cms/core/schemas";

import {
  createDefaultCmsSettings,
} from "../cms/core/settings";

import type {
  CmsSettings,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

export async function getCmsSettings(): Promise<CmsSettings> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.settings,
      )
      .findOne({
        key:
          "global",
      });

  if (!document) {
    return createDefaultCmsSettings();
  }

  return cmsSettingsSchema.parse(
    document,
  );
}

export async function saveCmsSettings(
  settings:
    CmsSettings,
): Promise<void> {
  const database =
    await getDatabase();

  const validated =
    cmsSettingsSchema.parse({
      ...settings,

      key:
        "global",

      updatedAt:
        new Date(),
    });

  await database
    .collection(
      CMS_COLLECTIONS.settings,
    )
    .updateOne(
      {
        key:
          "global",
      },

      {
        $set:
          validated,
      },

      {
        upsert:
          true,
      },
    );
}