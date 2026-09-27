import Link from "next/link";

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
    <header className="pdf-site-header">
      <div className="pdf-site-header-inner">
        <Link
          href="/"
          className="pdf-brand"
          aria-label={`${identity.siteName} home`}
        >
          <div className="pdf-brand-mark">
            {identity.logoUrl ? (
              <img
                src={
                  identity.logoUrl
                }
                alt=""
              />
            ) : (
              <span>
                PDF
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="pdf-brand-name">
              {
                identity.siteName
              }
            </div>

            {identity.tagline && (
              <div className="pdf-brand-tagline">
                {
                  identity.tagline
                }
              </div>
            )}
          </div>
        </Link>

        <div className="pdf-desktop-nav">
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
              className="pdf-primary-button"
            >
              {
                externalLinks
                  .primaryCtaLabel
              }
            </a>
          )}
        </div>

        <details className="pdf-mobile-menu">
          <summary>
            Menu
          </summary>

          <div className="pdf-mobile-menu-panel">
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
                className="pdf-primary-button mt-5 w-full"
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
    </header>
  );
}
