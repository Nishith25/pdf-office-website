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
    React.ReactNode;
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
      className="text-sm opacity-70 transition hover:opacity-100"
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

  return (
    <footer className="mt-auto border-t border-black/10 bg-[var(--cms-background)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            {identity.logoUrl && (
              <img
                src={
                  identity.logoUrl
                }
                alt=""
                className="h-10 w-10 object-contain"
              />
            )}

            <p className="font-bold">
              {
                identity.siteName
              }
            </p>
          </div>

          {identity.tagline && (
            <p className="mt-4 max-w-sm text-sm leading-6 opacity-65">
              {
                identity.tagline
              }
            </p>
          )}

          {footer.text && (
            <p className="mt-3 max-w-sm text-sm leading-6 opacity-65">
              {
                footer.text
              }
            </p>
          )}
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] opacity-50">
            Navigation
          </p>

          <PublicNavigation
            items={
              navigation
            }
            orientation="vertical"
          />
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] opacity-50">
            Contact
          </p>

          <div className="space-y-3 text-sm opacity-70">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block"
              >
                {
                  contact.email
                }
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="block"
              >
                {
                  contact.phone
                }
              </a>
            )}

            {contact.address && (
              <p className="whitespace-pre-line leading-6">
                {
                  contact.address
                }
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] opacity-50">
            Follow
          </p>

          <div className="flex flex-col gap-3">
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
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs opacity-55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
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