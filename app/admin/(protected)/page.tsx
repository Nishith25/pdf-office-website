import Link from "next/link";

import {
  ArrowRight,
  Clock3,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Search,
  Settings2,
  Sparkles,
  Wrench,
} from "lucide-react";

import {
  getRecentActivity,
} from "../../../lib/repositories/activity";

import {
  getFaqs,
  getHomepageSections,
  getTools,
} from "../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    sections,
    tools,
    faqs,
    activity,
  ] =
    await Promise.all([
      getHomepageSections(),
      getTools(),
      getFaqs(),
      getRecentActivity(
        6,
      ),
    ]);

  const activeSections =
    sections.filter(
      (section) =>
        section.visible,
    ).length;

  const visibleTools =
    tools.filter(
      (tool) =>
        tool.visible,
    ).length;

  const visibleFaqs =
    faqs.filter(
      (faq) =>
        faq.visible,
    ).length;

  const metrics = [
    {
      label:
        "Active sections",

      value:
        activeSections,

      icon:
        LayoutDashboard,
    },

    {
      label:
        "Visible PDF tools",

      value:
        visibleTools,

      icon:
        Wrench,
    },

    {
      label:
        "Visible FAQs",

      value:
        visibleFaqs,

      icon:
        HelpCircle,
    },
  ];

  return (
    <div className="mx-auto max-w-[1250px]">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
            Website overview
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#757C89]">
            Manage PDF Office website content from one controlled
            workspace.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE8DF] bg-[#F3FBF5] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#28A95B]" />

          <span className="text-[10px] font-semibold text-[#457256]">
            Website live
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF2FF]">
              <Sparkles className="h-4 w-4 text-[#3157E7]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#222631]">
                Quick actions
              </h2>

              <p className="mt-0.5 text-[10px] text-[#8B919C]">
                Common website management tasks
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-[#ECEEF1]">
            {[
              {
                href:
                  "/admin/homepage",

                label:
                  "Edit homepage",

                description:
                  "Hero and primary page sections",

                icon:
                  FileText,
              },

              {
                href:
                  "/admin/tools",

                label:
                  "Manage PDF tools",

                description:
                  "Visibility, featured status and order",

                icon:
                  Wrench,
              },

              {
                href:
                  "/admin/faq",

                label:
                  "Manage FAQs",

                description:
                  "Add and edit public questions",

                icon:
                  HelpCircle,
              },

              {
                href:
                  "/admin/seo",

                label:
                  "Edit SEO",

                description:
                  "Search and social metadata",

                icon:
                  Search,
              },

              {
                href:
                  "/admin/settings",

                label:
                  "Site settings",

                description:
                  "Brand, links and security",

                icon:
                  Settings2,
              },
            ].map(
              ({
                href,
                label,
                description,
                icon:
                  Icon,
              }) => (
                <Link
                  key={
                    href
                  }
                  href={
                    href
                  }
                  className="group flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#767E8C]" />

                    <div>
                      <p className="text-xs font-semibold text-[#323744]">
                        {
                          label
                        }
                      </p>

                      <p className="mt-1 text-[9px] text-[#9298A3]">
                        {
                          description
                        }
                      </p>
                    </div>
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
              <Clock3 className="h-4 w-4 text-[#69717E]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#222631]">
                Recent changes
              </h2>

              <p className="mt-0.5 text-[10px] text-[#8B919C]">
                Latest admin activity
              </p>
            </div>
          </div>

          {activity.length >
          0 ? (
            <div className="mt-5 divide-y divide-[#ECEEF1]">
              {activity.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={`${item.createdAt.toISOString()}-${index}`}
                    className="py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold text-[#3C424E]">
                          {
                            item.action
                          }
                        </p>

                        <p className="mt-1 text-[9px] text-[#9298A3]">
                          {
                            item.targetName
                          }
                        </p>
                      </div>

                      <time className="shrink-0 text-right text-[8px] leading-4 text-[#A0A5AE]">
                        {item.createdAt.toLocaleString(
                          "en-IN",
                          {
                            day:
                              "2-digit",

                            month:
                              "short",

                            hour:
                              "2-digit",

                            minute:
                              "2-digit",
                          },
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
                No activity recorded yet.
              </p>

              <p className="mt-1 text-[9px] text-[#A0A5AE]">
                Saved CMS changes will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}