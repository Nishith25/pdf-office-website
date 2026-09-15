import type {
  CmsSettings,
} from "../../../lib/cms/core/types";

import type {
  CmsPublicNavigationItem,
} from "../../../lib/cms/public/navigation";

import PublicNavigation from "./PublicNavigation";

export default function PublicHeader({
  settings,
  navigation,
}: {
  settings:
    CmsSettings;

  navigation:
    readonly CmsPublicNavigationItem[];
}) {
  const {
    identity,
    externalLinks,
  } =
    settings;

  return (
    <header className="border-b border-black/10 bg-[var(--cms-background)]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex min-w-0 items-center gap-3"
        >
          {identity.logoUrl && (
            <img
              src={
                identity.logoUrl
              }
              alt=""
              className="h-10 w-10 shrink-0 object-contain"
            />
          )}

          <div className="min-w-0">
            <p className="truncate text-base font-bold">
              {
                identity.siteName
              }
            </p>

            {identity.tagline && (
              <p className="hidden max-w-xs truncate text-xs opacity-60 sm:block">
                {
                  identity.tagline
                }
              </p>
            )}
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <PublicNavigation
            items={
              navigation
            }
          />

          {externalLinks
            .primaryCtaLabel &&
            externalLinks
              .primaryCtaUrl && (
              <a
                href={
                  externalLinks
                    .primaryCtaUrl
                }
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[var(--cms-primary)] px-4 text-sm font-bold text-white"
              >
                {
                  externalLinks
                    .primaryCtaLabel
                }
              </a>
            )}
        </div>

        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-lg border border-black/10 px-3 py-2 text-sm font-semibold">
              Menu
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-64 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
              <PublicNavigation
                items={
                  navigation
                }
                orientation="vertical"
              />

              {externalLinks
                .primaryCtaLabel &&
                externalLinks
                  .primaryCtaUrl && (
                <a
                  href={
                    externalLinks
                      .primaryCtaUrl
                  }
                  className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-[var(--cms-primary)] px-4 text-sm font-bold text-white"
                >
                  {
                    externalLinks
                      .primaryCtaLabel
                  }
                </a>
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}