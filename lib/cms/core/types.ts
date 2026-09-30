import {
  z,
} from "zod";

import {
  cmsActivitySchema,
  cmsBlockSchema,
  cmsBlogPostSchema,
  cmsBlockTypeSchema,
  cmsMenuItemSchema,
  cmsMenuItemTargetSchema,
  cmsMenuItemTypeSchema,
  cmsMenuLocationSchema,
  cmsMenuSchema,
  cmsPageSchema,
  cmsPageStatusSchema,
  cmsSettingsSchema,
} from "./schemas";

export type CmsPage =
  z.infer<
    typeof cmsPageSchema
  >;

export type CmsPageStatus =
  z.infer<
    typeof cmsPageStatusSchema
  >;

export type CmsBlock =
  z.infer<
    typeof cmsBlockSchema
  >;

export type CmsBlockType =
  z.infer<
    typeof cmsBlockTypeSchema
  >;

export type CmsBlogPost =
  z.infer<
    typeof cmsBlogPostSchema
  >;

export type CmsSettings =
  z.infer<
    typeof cmsSettingsSchema
  >;

export type CmsActivity =
  z.infer<
    typeof cmsActivitySchema
  >;

export type CmsMenuItem =
  z.infer<
    typeof cmsMenuItemSchema
  >;

export type CmsMenu =
  z.infer<
    typeof cmsMenuSchema
  >;

export type CmsMenuLocation =
  z.infer<
    typeof cmsMenuLocationSchema
  >;

export type CmsMenuItemType =
  z.infer<
    typeof cmsMenuItemTypeSchema
  >;

export type CmsMenuItemTarget =
  z.infer<
    typeof cmsMenuItemTargetSchema
  >;