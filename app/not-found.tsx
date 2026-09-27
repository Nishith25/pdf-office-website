import Link from "next/link";

import {
  getSiteConfig,
} from "../lib/site/config";

export default function NotFoundPage() {
  const site =
    getSiteConfig();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#111827]">
      <div className="w-full max-w-xl text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#3157E7]">
          404
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Page not found.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#707784]">
          The page you requested does not exist or may have been moved.
          Return to {site.shortName} to continue.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[10px] bg-[#3157E7] px-5 text-sm font-semibold text-white transition hover:bg-[#2849C7]"
        >
          Back to website
        </Link>
      </div>
    </main>
  );
}
