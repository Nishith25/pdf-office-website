import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  getTools,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export default async function FeaturesPage() {
  const tools =
    await getTools();

  const featured =
    tools.filter(
      (tool) =>
        tool.featured &&
        tool.visible,
    );

  return (
    <div className="mx-auto max-w-[1050px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Features
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          Featured capabilities
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Featured capabilities are selected from your PDF Tools
          manager so the website does not maintain duplicate content.
        </p>
      </div>

      <section className="rounded-[16px] border border-[#E2E4E8] bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-[#252A34]">
              Featured tools
            </h2>

            <p className="mt-1 text-[10px] text-[#8B919D]">
              {featured.length} currently selected
            </p>
          </div>

          <Link
            href="/admin/tools"
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[10px] font-semibold text-white"
          >
            Manage features

            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {featured.length >
        0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(
              (
                tool,
              ) => (
                <div
                  key={
                    tool.type
                  }
                  className="rounded-[12px] border border-[#E6E8EC] bg-[#FAFAFB] p-4"
                >
                  <p className="text-xs font-semibold text-[#333944]">
                    {
                      tool.name
                    }
                  </p>

                  <p className="mt-2 text-[9px] leading-5 text-[#858C98]">
                    {tool.description ||
                      "No description added yet."}
                  </p>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-[12px] border border-dashed border-[#DADDE3] p-8 text-center">
            <p className="text-[10px] text-[#858C98]">
              No tools are marked as featured yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}