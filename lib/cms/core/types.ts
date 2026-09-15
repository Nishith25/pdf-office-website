import {
  z,
} from "zod";

import {
  cmsActivitySchema,
  cmsBlockSchema,
  cmsBlockTypeSchema,
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

export type CmsSettings =
  z.infer<
    typeof cmsSettingsSchema
  >;

export type CmsActivity =
  z.infer<
    typeof cmsActivitySchema
  >;