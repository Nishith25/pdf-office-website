import {
  z,
} from "zod";

import siteProfile from "../../site.config";

const siteKeySchema =
  z
    .string()
    .trim()
    .min(
      2,
    )
    .max(
      80,
    )
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Site key must use lowercase letters, numbers and hyphens only.",
    );

const databaseNameSchema =
  z
    .string()
    .trim()
    .min(
      1,
    )
    .max(
      100,
    )
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Database name contains unsupported characters.",
    );

const mediaFolderSchema =
  z
    .string()
    .trim()
    .min(
      1,
    )
    .max(
      160,
    )
    .regex(
      /^[A-Za-z0-9/_-]+$/,
      "Media folder contains unsupported characters.",
    );

const profileSchema =
  z
    .object({
      key:
        siteKeySchema,

      name:
        z
          .string()
          .trim()
          .min(
            1,
          )
          .max(
            160,
          ),

      shortName:
        z
          .string()
          .trim()
          .min(
            1,
          )
          .max(
            80,
          ),

      tagline:
        z
          .string()
          .trim()
          .max(
            240,
          ),

      siteUrl:
        z
          .string()
          .trim()
          .max(
            2000,
          ),

      defaultDatabaseName:
        databaseNameSchema,

      defaultMediaFolder:
        mediaFolderSchema,

      adminLogoUrl:
        z
          .string()
          .trim()
          .min(
            1,
          )
          .max(
            2000,
          ),

      themeKey:
        z
          .string()
          .trim()
          .min(
            1,
          )
          .max(
            120,
          ),
    })
    .strict();

export type SiteConfig = {
  key:
    string;

  name:
    string;

  shortName:
    string;

  tagline:
    string;

  siteUrl:
    string;

  databaseName:
    string;

  mediaFolder:
    string;

  themeKey:
    string;

  adminLogoUrl:
    string;

  adminSessionSubject:
    string;
};

export function databaseNameFromSiteKey(
  key:
    string,
): string {
  return `${key.replace(
    /-/g,
    "_",
  )}_website`;
}

export function buildSiteConfig(
  env:
    Record<
      string,
      string | undefined
    > = process.env,
): SiteConfig {
  const profile =
    profileSchema.parse(
      siteProfile,
    );

  const explicitSiteKey =
    env.SITE_KEY?.trim();

  const key =
    siteKeySchema.parse(
      explicitSiteKey ||
        profile.key,
    );

  const databaseName =
    databaseNameSchema.parse(
      env.MONGODB_DB?.trim() ||
        (
          explicitSiteKey
            ? databaseNameFromSiteKey(
                key,
              )
            : profile.defaultDatabaseName
        ),
    );

  const mediaFolder =
    mediaFolderSchema.parse(
      env.SITE_MEDIA_FOLDER
        ?.trim() ||
        (
          explicitSiteKey
            ? key
            : profile.defaultMediaFolder
        ),
    );

  return {
    key,

    name:
      env.SITE_NAME?.trim() ||
      profile.name,

    shortName:
      env.SITE_SHORT_NAME?.trim() ||
      profile.shortName,

    tagline:
      env.SITE_TAGLINE?.trim() ||
      profile.tagline,

    siteUrl:
      env.SITE_URL?.trim() ||
      profile.siteUrl,

    databaseName,

    mediaFolder,

    themeKey:
      env.SITE_THEME_KEY
        ?.trim() ||
      profile.themeKey,

    adminLogoUrl:
      env.SITE_ADMIN_LOGO_URL
        ?.trim() ||
      profile.adminLogoUrl,

    adminSessionSubject:
      `${key}-admin`,
  };
}

export function getSiteConfig(): SiteConfig {
  return buildSiteConfig(
    process.env,
  );
}
