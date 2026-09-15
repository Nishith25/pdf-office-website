import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  buildCmsDashboardSummary,
} from "../cms/core/dashboard";

import {
  cmsPageStatusSchema,
} from "../cms/core/schemas";

import {
  getDatabase,
} from "../db/database";

import {
  getRecentCmsActivity,
} from "./cms-activity";

export async function getCmsDashboardSummary() {
  const database =
    await getDatabase();

  const pageDocuments =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .find({})
      .project({
        status:
          1,
      })
      .toArray();

  const pageStatuses =
    pageDocuments.map(
      (
        document,
      ) =>
        cmsPageStatusSchema.parse(
          document.status,
        ),
    );

  const [
    blockCount,
    genericMediaCount,
    existingMediaCount,
    recentActivity,
  ] =
    await Promise.all([
      database
        .collection(
          CMS_COLLECTIONS.blocks,
        )
        .countDocuments(),

      database
        .collection(
          "cms_media",
        )
        .countDocuments(),

      database
        .collection(
          "media",
        )
        .countDocuments(),

      getRecentCmsActivity(
        6,
      ),
    ]);

  return {
    summary:
      buildCmsDashboardSummary({
        pageStatuses,

        blockCount,

        mediaCount:
          genericMediaCount >
          0
            ? genericMediaCount
            : existingMediaCount,

        activityCount:
          recentActivity.length,
      }),

    recentActivity,
  };
}