import Link from "next/link";

import {
  ArrowRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings2,
  Sparkles,
  Wrench,
} from "lucide-react";

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
  ] =
    await Promise.all([
      getHomepageSections(),
      getTools(),
      getFaqs(),
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
        "PDF tools",
      value:
        visibleTools,
      icon: Wrench,
    },
    {
      label:
        "FAQs",
      value:
        visibleFaqs,
      icon:
        HelpCircle,
    },
  ];

  return (
    <div className="mx-auto max-w-[1250px]">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
            Website overview
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#757C89]">
            Manage PDF Office website content and keep the public site
            current without editing the codebase.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE8DF] bg-[#F3FBF5] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#28A95B]" />

          <span className="text-[10px] font-semibold text-[#457256]">
            Website live
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {metrics.map(
          ({
            label,
            value,
            icon: Icon,
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

      {/* Main grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Quick actions */}
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
            <Link
              href="/admin/homepage"
              className="group flex items-center justify-between py-4 first:pt-0"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-[#767E8C]" />

                <div>
                  <p className="text-xs font-semibold text-[#323744]">
                    Edit homepage
                  </p>

                  <p className="mt-1 text-[9px] text-[#9298A3]">
                    Hero and public website sections
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-[#A1A6B0] transition group-hover:translate-x-1 group-hover:text-[#3157E7]" />
            </Link>

            <Link
              href="/admin/tools"
              className="group flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-[#767E8C]" />

                <div>
                  <p className="text-xs font-semibold text-[#323744]">
                    Manage PDF tools
                  </p>

                  <p className="mt-1 text-[9px] text-[#9298A3]">
                    Edit, reorder and control visibility
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-[#A1A6B0] transition group-hover:translate-x-1 group-hover:text-[#3157E7]" />
            </Link>

            <Link
              href="/admin/settings"
              className="group flex items-center justify-between py-4 pb-0"
            >
              <div className="flex items-center gap-3">
                <Settings2 className="h-4 w-4 text-[#767E8C]" />

                <div>
                  <p className="text-xs font-semibold text-[#323744]">
                    Site settings
                  </p>

                  <p className="mt-1 text-[9px] text-[#9298A3]">
                    Brand, links and global configuration
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-[#A1A6B0] transition group-hover:translate-x-1 group-hover:text-[#3157E7]" />
            </Link>
          </div>
        </section>

        {/* Status */}
        <section className="rounded-[18px] border border-[#E4E6EA] bg-white p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9298A3]">
            Content status
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#555C69]">
                  Sections
                </span>

                <span className="font-semibold text-[#222631]">
                  {activeSections}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                <div className="h-full w-full rounded-full bg-[#3157E7]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#555C69]">
                  Tools
                </span>

                <span className="font-semibold text-[#222631]">
                  {visibleTools}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                <div className="h-full w-full rounded-full bg-[#7087E7]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#555C69]">
                  FAQs
                </span>

                <span className="font-semibold text-[#222631]">
                  {visibleFaqs}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                <div className="h-full w-full rounded-full bg-[#98A7DF]" />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[12px] bg-[#F6F7F9] p-4">
            <p className="text-[10px] leading-5 text-[#737A87]">
              Content changes will eventually be managed completely
              from this workspace. The current live site remains
              untouched while the CMS migration is completed.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}