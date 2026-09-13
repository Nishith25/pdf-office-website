import type {
  z,
} from "zod";

import {
  faqSchema,
  sitePageSchema,
  siteSectionSchema,
  siteSettingsSchema,
  toolSchema,
} from "./schemas";

export type SiteSettings =
  z.infer<
    typeof siteSettingsSchema
  >;

export type SitePage =
  z.infer<
    typeof sitePageSchema
  >;

export type SiteSection =
  z.infer<
    typeof siteSectionSchema
  >;

export type ToolItem =
  z.infer<
    typeof toolSchema
  >;

export type FAQItem =
  z.infer<
    typeof faqSchema
  >;