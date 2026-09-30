import {
  FileText,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

import {
  getSiteConfig,
} from "../../../lib/site/config";

import LoginForm from "./LoginForm";

export function generateMetadata() {
  const site =
    getSiteConfig();

  return {
    title:
      `Admin Login | ${site.shortName}`,

    description:
      `Official ${site.shortName} administrator portal.`,

    robots: {
      index:
        false,

      follow:
        false,

      nocache:
        true,

      googleBot: {
        index:
          false,

        follow:
          false,

        noimageindex:
          true,
      },
    },
  };
}

export default function AdminLoginPage() {
  const site =
    getSiteConfig();

  return (
    <main className="min-h-screen bg-[#F4F5F7] px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl overflow-hidden rounded-[22px] border border-[#E1E3E8] bg-white shadow-[0_18px_60px_rgba(25,31,46,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#182033] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",

              backgroundSize:
                "32px 32px",
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3">
              <img
                src={
                  site.adminLogoUrl
                }
                alt={
                  site.shortName
                }
                width={52}
                height={52}
                className="h-12 w-12 rounded-[12px] object-cover"
              />

              <div>
                <p className="text-sm font-semibold">
                  {
                    site.shortName
                  }
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                  Website Admin
                </p>
              </div>
            </div>

            <h1 className="mt-16 max-w-sm text-[40px] font-semibold leading-[1.03] tracking-[-0.045em]">
              Manage the website without touching the code.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Update pages, structured content, media, navigation and
              website settings from one controlled workspace.
            </p>
          </div>

          <div className="relative grid gap-2.5">
            <div className="flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3">
              <FileText className="h-4 w-4 text-[#8EA4FF]" />

              <span className="text-xs text-white/70">
                Structured content management
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3">
              <ScanLine className="h-4 w-4 text-[#8EA4FF]" />

              <span className="text-xs text-white/70">
                Website block editing
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3">
              <ShieldCheck className="h-4 w-4 text-[#8EA4FF]" />

              <span className="text-xs text-white/70">
                Secure single-admin access
              </span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-[390px]">
            <div className="flex items-center gap-3 lg:hidden">
              <img
                src={
                  site.adminLogoUrl
                }
                alt={
                  site.shortName
                }
                width={46}
                height={46}
                className="h-11 w-11 rounded-[11px] object-cover"
              />

              <div>
                <p className="text-sm font-bold text-[#171A22]">
                  {
                    site.shortName
                  }
                </p>

                <p className="text-[9px] uppercase tracking-[0.14em] text-[#9197A3]">
                  Website Admin
                </p>
              </div>
            </div>

            <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3157E7] lg:mt-0">
              Administration
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#171A22]">
              Welcome back.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#747B89]">
              Sign in with the administrator account to manage{" "}
              {
                site.shortName
              }{" "}
              website content.
            </p>

            <LoginForm />

            <div className="mt-5 rounded-[10px] border border-[#E4E7EE] bg-[#F8F9FB] px-4 py-3">
              <p className="text-[11px] font-semibold text-[#3A404C]">
                Official{" "}
                {
                  site.shortName
                }{" "}
                administrator portal
              </p>

              <p className="mt-1.5 text-[10px] leading-5 text-[#7A818E]">
                Use only the administrator account created for this website.
                This portal does not request Google, Vercel, email-provider,
                or other third-party passwords.
              </p>

              <a
                href={
                  site.siteUrl
                }
                className="mt-2 inline-flex text-[10px] font-semibold text-[#3157E7] hover:underline"
              >
                Return to{" "}
                {
                  site.shortName
                }
              </a>
            </div>

            <div className="mt-8 border-t border-[#EAEBEF] pt-5">
              <div className="flex items-center gap-2 text-[10px] text-[#999FAB]">
                <ShieldCheck className="h-3.5 w-3.5" />

                Protected administrator access
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
