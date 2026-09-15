import Link from "next/link";

import {
  Activity,
  ArrowRight,
  Blocks,
  FileText,
  ImageIcon,
  LayoutDashboard,
} from "lucide-react";

import {
  getCmsDashboardSummary,
} from "../../../lib/repositories/cms-dashboard";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Dashboard | CMS",
};

export default async function CmsDashboardPage() {
  const {
    summary,
    recentActivity,
  } =
    await getCmsDashboardSummary();

  const metrics = [
    {
      label:
        "Published Pages",

      value:
        summary.publishedPages,

      icon:
        FileText,
    },

    {
      label:
        "Draft Pages",

      value:
        summary.draftPages,

      icon:
        LayoutDashboard,
    },

    {
      label:
        "Content Blocks",

      value:
        summary.blocks,

      icon:
        Blocks,
    },

    {
      label:
        "Media Files",

      value:
        summary.mediaFiles,

      icon:
        ImageIcon,
    },
  ];

  const quickActions = [
    {
      label:
        "View Pages",

      description:
        "Manage website pages and content.",

      href:
        "/admin/pages",
    },

    {
      label:
        "Media Library",

      description:
        "Manage uploaded website assets.",

      href:
        "/admin/media",
    },

    {
      label:
        "Activity",

      description:
        "Review recent CMS changes.",

      href:
        "/admin/activity",
    },
  ];

  return (
    <div className="mx-auto max-w-[1250px]">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            CMS Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
            Website overview
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#757C89]">
            Manage pages, content, media and website configuration
            from one reusable CMS.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE8DF] bg-[#F3FBF5] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#28A95B]" />

          <span className="text-[10px] font-semibold text-[#457256]">
            CMS active
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(
          ({
            label,
            value,
            icon:
              Icon,
          }) => (
            <div
              key={
                label
              }
              className="rounded-[16px] border border-[#E4E6EA] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F0F3FF]">
                  <Icon className="h-4 w-4 text-[#3157E7]" />
                </div>

                <span className="text-2xl font-semibold tracking-[-0.04em] text-[#1B1F28]">
                  {
                    value
                  }
                </span>
              </div>

              <p className="mt-4 text-[11px] font-medium text-[#737A87]">
                {
                  label
                }
              </p>
            </div>
          ),
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[18px] border border-[#E4E6EA] bg-white p-5 sm:p-6">
          <div>
            <h2 className="text-sm font-semibold text-[#222631]">
              Quick actions
            </h2>

            <p className="mt-1 text-[10px] text-[#8B919C]">
              Common CMS management tasks
            </p>
          </div>

          <div className="mt-5 divide-y divide-[#ECEEF1]">
            {quickActions.map(
              (
                item,
              ) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="group flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#323744]">
                      {
                        item.label
                      }
                    </p>

                    <p className="mt-1 text-[9px] text-[#9298A3]">
                      {
                        item.description
                      }
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[#A1A6B0] transition group-hover:translate-x-1 group-hover:text-[#3157E7]" />
                </Link>
              ),
            )}
          </div>
        </section>

        <section className="rounded-[18px] border border-[#E4E6EA] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F4F5F7]">
              <Activity className="h-4 w-4 text-[#69717E]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#222631]">
                Recent activity
              </h2>

              <p className="mt-0.5 text-[10px] text-[#8B919C]">
                Latest generic CMS changes
              </p>
            </div>
          </div>

          {recentActivity.length >
          0 ? (
            <div className="mt-5 divide-y divide-[#ECEEF1]">
              {recentActivity.map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item.id
                    }
                    className="py-3.5 first:pt-0 last:pb-0"
                  >
                    <p className="text-[11px] font-semibold text-[#3C424E]">
                      {
                        item.action
                      }
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-4">
                      <p className="text-[9px] text-[#9298A3]">
                        {item.entityType}
                        {" · "}
                        {
                          item.entityName
                        }
                      </p>

                      <time className="text-[8px] text-[#A0A5AE]">
                        {item.createdAt.toLocaleString(
                          "en-IN",
                        )}
                      </time>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-[12px] border border-dashed border-[#DDE0E5] bg-[#FAFAFB] px-4 py-8 text-center">
              <p className="text-[10px] font-medium text-[#777E8A]">
                No generic CMS activity yet.
              </p>

              <p className="mt-1 text-[9px] text-[#A0A5AE]">
                Page and block changes will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}