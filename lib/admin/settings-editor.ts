import {
  siteSettingsSchema,
} from "../cms/schemas";

import type {
  SiteSettings,
} from "../cms/types";

export const siteSettingsEditorSchema =
  siteSettingsSchema;

export function createSiteSettingsEditorState(
  settings:
    SiteSettings | null,
): SiteSettings {
  return siteSettingsEditorSchema.parse({
    brandName:
      settings?.brandName ??
      "PDF Office – Doc Scanner",

    shortName:
      settings?.shortName ??
      "PDF Office",

    playStoreUrl:
      settings?.playStoreUrl ??
      "https://play.google.com/store/apps/details?id=com.pdfoffice.pdf.scanner.converter.esign",

    siteUrl:
      settings?.siteUrl ??
      "https://pdf-office-website.vercel.app",

    appIconUrl:
      settings?.appIconUrl ??
      "",

    footerText:
      settings?.footerText ??
      "Scan · Convert · Sign · Organize",

    privacyUrl:
      settings?.privacyUrl ??
      "",

    termsUrl:
      settings?.termsUrl ??
      "",
  });
}