import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  BarChart3,
  FileText,
  FolderOpen,
  HelpCircle,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Signature,
  SlidersHorizontal,
  Sparkles,
  Tags,
} from "lucide-react";

import {
  logoutAction,
} from "../../app/admin/logout/actions";

type AdminShellProps = {
  adminEmail: string;
  children:
    React.ReactNode;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon:
      LayoutDashboard,
  },
  {
    label: "Homepage",
    href: "/admin/homepage",
    icon: Home,
  },
  {
    label: "Features",
    href: "/admin/features",
    icon: Sparkles,
  },
  {
    label: "PDF Tools",
    href: "/admin/tools",
    icon:
      SlidersHorizontal,
  },
  {
    label:
      "Scanner & OCR",
    href: "/admin/scanner",
    icon: ScanLine,
  },
  {
    label:
      "Convert & Organize",
    href: "/admin/organize",
    icon: FolderOpen,
  },
  {
    label: "eSign",
    href: "/admin/esign",
    icon: Signature,
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    icon: HelpCircle,
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    label: "SEO",
    href: "/admin/seo",
    icon: Search,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminShell({
  adminEmail,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#171A22]">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 border-r border-[#E3E5E9] bg-[#FCFCFD] lg:flex lg:flex-col">
          <div className="border-b border-[#E7E9ED] px-5 py-5">
            <div className="flex items-center gap-3">
              <Image
                src="/app-icon.png"
                alt="PDF Office"
                width={44}
                height={44}
                className="h-10 w-10 rounded-[11px] object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-bold tracking-[-0.02em]">
                  PDF Office
                </p>

                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9096A2]">
                  Website Admin
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#A1A6B0]">
              Workspace
            </p>

            <div className="space-y-1">
              {navigation.map(
                ({
                  label,
                  href,
                  icon: Icon,
                }) => (
                  <Link
                    key={
                      href
                    }
                    href={
                      href
                    }
                    className="group flex min-h-10 items-center gap-3 rounded-[9px] px-3 text-[12px] font-medium text-[#5C6370] transition hover:bg-[#EEF2FF] hover:text-[#3157E7]"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#8A909D] transition group-hover:text-[#3157E7]" />

                    <span>
                      {
                        label
                      }
                    </span>
                  </Link>
                ),
              )}
            </div>
          </nav>

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

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex min-h-[64px] items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Image
                src="/app-icon.png"
                alt="PDF Office"
                width={36}
                height={36}
                className="h-8 w-8 rounded-[9px]"
              />

              <div>
                <p className="text-xs font-bold">
                  PDF Office
                </p>

                <p className="text-[8px] uppercase tracking-[0.12em] text-[#9A9FAB]">
                  Admin
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-xs font-semibold text-[#222631]">
                Content Management
              </p>

              <p className="mt-0.5 text-[9px] text-[#979CA7]">
                PDF Office website
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