import {
  Clock3,
} from "lucide-react";

import {
  getRecentCmsActivity,
} from "../../../../lib/repositories/cms-activity";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Activity | CMS",
};

export default async function CmsActivityPage() {
  const activity =
    await getRecentCmsActivity(
      50,
    );

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            System
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Activity
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#747B88]">
          Recent changes made through the generic content management
          system.
        </p>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#E2E4E8] bg-white">
        {activity.length >
        0 ? (
          <div className="divide-y divide-[#ECEEF1]">
            {activity.map(
              (
                item,
              ) => (
                <div
                  key={
                    item.id
                  }
                  className="flex items-start justify-between gap-5 px-5 py-4"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-[#343A45]">
                      {
                        item.action
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#9298A3]">
                      {item.entityType}
                      {" · "}
                      {
                        item.entityName
                      }
                    </p>
                  </div>

                  <time className="shrink-0 text-[8px] text-[#A0A5AE]">
                    {item.createdAt.toLocaleString(
                      "en-IN",
                    )}
                  </time>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <Clock3 className="mx-auto h-6 w-6 text-[#A1A6AF]" />

            <p className="mt-4 text-sm font-semibold text-[#454B56]">
              No CMS activity yet
            </p>

            <p className="mt-2 text-[10px] text-[#9298A3]">
              Generic page, block, menu and settings changes will appear
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}