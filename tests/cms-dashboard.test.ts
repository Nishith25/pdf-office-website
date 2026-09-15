import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildCmsDashboardSummary,
} from "../lib/cms/core/dashboard";

describe(
  "CMS dashboard summary",
  () => {
    it(
      "counts generic CMS content",
      () => {
        const summary =
          buildCmsDashboardSummary({
            pageStatuses: [
              "published",
              "draft",
              "published",
            ],

            blockCount:
              8,

            mediaCount:
              5,

            activityCount:
              3,
          });

        expect(
          summary,
        ).toEqual({
          publishedPages:
            2,

          draftPages:
            1,

          blocks:
            8,

          mediaFiles:
            5,

          recentActivity:
            3,
        });
      },
    );
  },
);