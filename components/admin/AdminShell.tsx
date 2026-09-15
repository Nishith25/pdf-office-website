import {
  ArrowUpRight,
  Blocks,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import {
  logoutAction,
} from "../../app/admin/logout/actions";

import AdminSidebarNavigation from "./AdminSidebarNavigation";

type AdminShellProps = {
  adminEmail:
    string;

  children:
    React.ReactNode;
};

function CmsBrandMark() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#202538] shadow-sm">
      <Blocks className="h-[18px] w-[18px] text-white" />

      <span className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-[#FCFCFD] bg-[#3157E7] px-1 text-[6px] font-black tracking-[-0.04em] text-white">
        CMS
      </span>
    </div>
  );
}

export default function AdminShell({
  adminEmail,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#171A22]">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        {/* Desktop sidebar */}
        <aside className="hidden w-[250px] shrink-0 border-r border-[#E3E5E9] bg-[#FCFCFD] lg:flex lg:flex-col">
          <div className="border-b border-[#E7E9ED] px-5 py-5">
            <div className="flex items-center gap-3">
              <CmsBrandMark />

              <div className="min-w-0">
                <p className="truncate text-sm font-bold tracking-[-0.02em]">
                  Site CMS
                </p>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9096A2]">
                  Content Management
                </p>
              </div>
            </div>
          </div>

          <AdminSidebarNavigation />

          <div className="border-t border-[#E7E9ED] p-3">
            <div className="rounded-[11px] bg-[#F4F5F7] p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E4E9FF]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3157E7]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8C929E]">
                    Signed in
                  </p>

                  <p className="mt-0.5 truncate text-[10px] font-medium text-[#454B57]">
                    {
                      adminEmail
                    }
                  </p>
                </div>
              </div>

              <form
                action={
                  logoutAction
                }
                className="mt-3"
              >
                <button
                  type="submit"
                  className="flex min-h-9 w-full items-center justify-center gap-2 rounded-[9px] border border-[#DDE0E5] bg-white text-[11px] font-semibold text-[#545B68] transition hover:border-[#CED2D9] hover:bg-[#FAFAFB]"
                >
                  <LogOut className="h-3.5 w-3.5" />

                  Logout
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex min-h-[64px] items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#202538]">
                <Blocks className="h-4 w-4 text-white" />
              </div>

              <div>
                <p className="text-xs font-bold">
                  Site CMS
                </p>

                <p className="text-[8px] uppercase tracking-[0.12em] text-[#9A9FAB]">
                  Website Admin
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-[#222631]">
                Content Management System
              </p>

              <p className="mt-0.5 text-[9px] text-[#979CA7]">
                Manage website content without editing code
              </p>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center gap-2 rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] font-semibold text-[#4F5663] transition hover:border-[#C8CDD5] hover:bg-[#FAFAFB]"
            >
              Open website

              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </header>

          {/* Mobile CMS navigation */}
          <div className="border-b border-[#E5E7EB] bg-white lg:hidden">
            <div className="overflow-x-auto px-4 py-2">
              <div className="flex min-w-max gap-2">
                <a
                  href="/admin"
                  className="rounded-[8px] border border-[#E1E4E9] px-3 py-2 text-[10px] font-semibold text-[#59616E]"
                >
                  Dashboard
                </a>

                <a
                  href="/admin/pages"
                  className="rounded-[8px] border border-[#E1E4E9] px-3 py-2 text-[10px] font-semibold text-[#59616E]"
                >
                  Pages
                </a>

                <a
                  href="/admin/media"
                  className="rounded-[8px] border border-[#E1E4E9] px-3 py-2 text-[10px] font-semibold text-[#59616E]"
                >
                  Media
                </a>

                <a
                  href="/admin/activity"
                  className="rounded-[8px] border border-[#E1E4E9] px-3 py-2 text-[10px] font-semibold text-[#59616E]"
                >
                  Activity
                </a>
              </div>
            </div>
          </div>

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {
              children
            }
          </main>
        </div>
      </div>
    </div>
  );
}