import {
  SlidersHorizontal,
} from "lucide-react";

import ToolsEditor from "../../../../components/admin/tools/ToolsEditor";

import {
  getTools,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "PDF Tools | PDF Office Admin",
};

export default async function AdminToolsPage() {
  const tools =
    await getTools();

  return (
    <div className="mx-auto max-w-[1450px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            PDF Tools
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Manage PDF tools
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Edit tool names, descriptions, visibility, featured status
          and display order without changing the website code.
        </p>

        <p className="mt-4 text-[10px] font-medium text-[#9298A3]">
          {tools.length} tools currently configured
        </p>
      </div>

      <ToolsEditor
        initialTools={
          tools
        }
      />
    </div>
  );
}