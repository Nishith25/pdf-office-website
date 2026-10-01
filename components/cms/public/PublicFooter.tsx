import type {
  ReactNode,
} from "react";

import type {
  CmsSettings,
} from "../../../lib/cms/core/types";

import type {
  CmsPublicNavigationItem,
} from "../../../lib/cms/public/navigation";

import PublicNavigation from "./PublicNavigation";

function ExternalLink({
  href,
  children,
}: {
  href:
    string;

  children:
    ReactNode;
}) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={
        href
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {
        children
      }
    </a>
  );
}

export default function PublicFooter({
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
    contact,
    social,
    externalLinks,
    footer,
  } =
    settings;

  const brandFallback =
    identity.shortName
      .trim()
      .split(
        /\s+/,
      )[0]
      ?.slice(
        0,
        4,
      )
      .toUpperCase() ||
    identity.siteName
      .trim()
      .slice(
        0,
        3,
      )
      .toUpperCase();

  const socialLinks = [
    {
      label:
        "Instagram",

      href:
        social.instagram,
    },

    {
      label:
        "Facebook",

      href:
        social.facebook,
    },

    {
      label:
        "LinkedIn",

      href:
        social.linkedin,
    },

    {
      label:
        "YouTube",

      href:
        social.youtube,
    },

    {
      label:
        "X",

      href:
        social.x,
    },
  ].filter(
    (
      item,
    ) =>
      item.href,
  );

  const hasContact =
    Boolean(
      contact.email ||
      contact.phone ||
      contact.address,
    );

  const storeUrls =
    new Set(
      [
        externalLinks
          .googlePlayUrl,
        externalLinks
          .appStoreUrl,
      ].filter(Boolean),
    );

  const visibleNavigation =
    navigation.filter(
      (
        item,
      ) =>
        !storeUrls.has(
          item.href,
        ),
    );

  const hasConnect =
    socialLinks.length >
      0 ||
    Boolean(
      externalLinks
        .googlePlayUrl ||
      externalLinks
        .appStoreUrl,
    );

  return (
    <footer className="pdf-footer">
      <div className="pdf-footer-main">
        <div className="pdf-footer-brand">
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
                {
                  brandFallback
                }
              </span>
            )}
          </div>

          <div className="pdf-footer-brand-name">
            {
              identity.siteName
            }
          </div>

          {identity.tagline && (
            <p className="pdf-footer-copy">
              {
                identity.tagline
              }
            </p>
          )}

          {footer.text && (
            <p className="pdf-footer-copy">
              {
                footer.text
              }
            </p>
          )}
        </div>

        {visibleNavigation
          .length >
          0 && (
          <div>
            <p className="pdf-footer-heading">
              {footer.exploreLabel}
            </p>

            <PublicNavigation
              items={
                visibleNavigation
              }
              orientation="vertical"
            />
          </div>
        )}

        {hasContact && (
          <div>
            <p className="pdf-footer-heading">
              {footer.contactLabel}
            </p>

            <div className="grid gap-3 text-[13px]">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                >
                  {
                    contact.email
                  }
                </a>
              )}

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                >
                  {
                    contact.phone
                  }
                </a>
              )}

              {contact.address && (
                <p className="m-0 whitespace-pre-line leading-6 text-white/55">
                  {
                    contact.address
                  }
                </p>
              )}
            </div>
          </div>
        )}

        {hasConnect && (
          <div>
            <p className="pdf-footer-heading">
              {footer.connectLabel}
            </p>

            <div className="grid gap-3 text-[13px]">
              {socialLinks.map(
                (
                  item,
                ) => (
                  <ExternalLink
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                  >
                    {
                      item.label
                    }
                  </ExternalLink>
                ),
              )}

              {externalLinks
                .googlePlayUrl && (
                <ExternalLink
                  href={
                    externalLinks
                      .googlePlayUrl
                  }
                >
                  Google Play
                </ExternalLink>
              )}

              {externalLinks
                .appStoreUrl && (
                <ExternalLink
                  href={
                    externalLinks
                      .appStoreUrl
                  }
                >
                  App Store
                </ExternalLink>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pdf-footer-bottom">
        <div className="pdf-footer-bottom-inner">
          <span>
            {footer.copyright ||
              identity.siteName}
          </span>

          {identity.siteUrl && (
            <a
              href={
                identity.siteUrl
              }
            >
              {
                identity.shortName
              }
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
