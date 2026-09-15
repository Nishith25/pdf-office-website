import type {
  CmsPageStatus,
} from "./types";

export type CmsDashboardSummary = {
  publishedPages:
    number;

  draftPages:
    number;

  blocks:
    number;

  mediaFiles:
    number;

  recentActivity:
    number;
};

export function buildCmsDashboardSummary({
  pageStatuses,
  blockCount,
  mediaCount,
  activityCount,
}: {
  pageStatuses:
    CmsPageStatus[];

  blockCount:
    number;

  mediaCount:
    number;

  activityCount:
    number;
}): CmsDashboardSummary {
  return {
    publishedPages:
      pageStatuses.filter(
        (
          status,
        ) =>
          status ===
          "published",
      ).length,

    draftPages:
      pageStatuses.filter(
        (
          status,
        ) =>
          status ===
          "draft",
      ).length,

    blocks:
      blockCount,

    mediaFiles:
      mediaCount,

    recentActivity:
      activityCount,
  };
}