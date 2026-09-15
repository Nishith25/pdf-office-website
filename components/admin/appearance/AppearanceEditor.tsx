"use client";

import {
  useState,
} from "react";

import {
  ExternalLink,
  ImageIcon,
  Palette,
  Search,
  Settings2,
  Type,
} from "lucide-react";

import MediaPickerField from "../media/MediaPickerField";

import {
  saveCmsAppearanceAction,
} from "../../../app/admin/(protected)/appearance/actions";

type MenuOption = {
  id:
    string;

  name:
    string;

  location:
    "header" |
    "footer" |
    "custom";
};

type PageOption = {
  id:
    string;

  title:
    string;
};

type AppearanceValues = {
  siteName:
    string;

  shortName:
    string;

  tagline:
    string;

  logo:
    string;

  favicon:
    string;

  siteUrl:
    string;

  email:
    string;

  phone:
    string;

  address:
    string;

  instagram:
    string;

  facebook:
    string;

  linkedin:
    string;

  youtube:
    string;

  x:
    string;

  ctaLabel:
    string;

  ctaUrl:
    string;

  playStoreUrl:
    string;

  appStoreUrl:
    string;

  footerText:
    string;

  copyright:
    string;

  privacyPageId:
    string;

  termsPageId:
    string;

  headerMenuId:
    string;

  footerMenuId:
    string;

  seoTitle:
    string;

  seoDescription:
    string;

  seoKeywords:
    string;

  canonicalUrl:
    string;

  ogTitle:
    string;

  ogDescription:
    string;

  ogImage:
    string;

  noIndex:
    boolean;

  primaryColor:
    string;

  secondaryColor:
    string;

  accentColor:
    string;

  backgroundColor:
    string;

  textColor:
    string;

  headingFont:
    "sans" |
    "serif" |
    "display";

  bodyFont:
    "sans" |
    "serif";

  buttonStyle:
    "square" |
    "rounded" |
    "pill";

  radiusScale:
    "none" |
    "small" |
    "medium" |
    "large";

  containerWidth:
    "narrow" |
    "standard" |
    "wide";
};

type Props = {
  initial:
    AppearanceValues;

  menus:
    MenuOption[];

  pages:
    PageOption[];

  saved:
    boolean;
};

const inputClass =
  "min-h-10 w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 text-[10px] outline-none transition focus:border-[#3157E7]";

const textareaClass =
  "w-full rounded-[9px] border border-[#DDE0E6] bg-white px-3 py-2.5 text-[10px] outline-none transition focus:border-[#3157E7]";

const labelClass =
  "mb-1.5 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#818895]";

function Section({
  title,
  description,
  icon,
  children,
}: {
  title:
    string;

  description:
    string;

  icon:
    React.ReactNode;

  children:
    React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-[#E2E5E9] bg-white">
      <div className="flex items-start gap-3 border-b border-[#ECEEF1] p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#F1F4FF] text-[#3157E7]">
          {
            icon
          }
        </div>

        <div>
          <h2 className="text-[13px] font-bold">
            {
              title
            }
          </h2>

          <p className="mt-1 text-[9px] leading-4 text-[#8C939E]">
            {
              description
            }
          </p>
        </div>
      </div>

      <div className="p-5">
        {
          children
        }
      </div>
    </section>
  );
}

export default function AppearanceEditor({
  initial,
  menus,
  pages,
  saved,
}: Props) {
  const [
    logo,
    setLogo,
  ] =
    useState(
      initial.logo,
    );

  const [
    favicon,
    setFavicon,
  ] =
    useState(
      initial.favicon,
    );

  const [
    ogImage,
    setOgImage,
  ] =
    useState(
      initial.ogImage,
    );

  const headerMenus =
    menus.filter(
      (
        menu,
      ) =>
        menu.location ===
          "header" ||
        menu.location ===
          "custom",
    );

  const footerMenus =
    menus.filter(
      (
        menu,
      ) =>
        menu.location ===
          "footer" ||
        menu.location ===
          "custom",
    );

  return (
    <form
      action={
        saveCmsAppearanceAction
      }
      className="space-y-6"
    >
      {saved && (
        <div className="rounded-[12px] border border-[#CDE7D5] bg-[#F3FBF5] px-4 py-3 text-[10px] font-semibold text-[#39734B]">
          Appearance settings saved successfully.
        </div>
      )}

      <Section
        title="Site Identity"
        description="The primary branding and identity used across your website."
        icon={
          <ImageIcon className="h-4 w-4" />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Site Name
            </span>

            <input
              name="siteName"
              required
              defaultValue={
                initial.siteName
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Short Name
            </span>

            <input
              name="shortName"
              required
              defaultValue={
                initial.shortName
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Tagline
            </span>

            <input
              name="tagline"
              defaultValue={
                initial.tagline
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Website URL
            </span>

            <input
              name="siteUrl"
              type="url"
              placeholder="https://example.com"
              defaultValue={
                initial.siteUrl
              }
              className={inputClass}
            />
          </label>

          <div className="md:col-span-2">
            <MediaPickerField
              label="Site Logo"
              name="logo"
              value={
                logo
              }
              onChange={
                setLogo
              }
              hint="Primary website logo."
            />
          </div>

          <div className="md:col-span-2">
            <MediaPickerField
              label="Favicon"
              name="favicon"
              value={
                favicon
              }
              onChange={
                setFavicon
              }
              hint="Small browser/tab icon."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Contact & Social"
        description="Global business contact information and social profiles."
        icon={
          <ExternalLink className="h-4 w-4" />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Email
            </span>

            <input
              name="email"
              type="email"
              defaultValue={
                initial.email
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Phone
            </span>

            <input
              name="phone"
              defaultValue={
                initial.phone
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Address
            </span>

            <textarea
              name="address"
              rows={
                3
              }
              defaultValue={
                initial.address
              }
              className={textareaClass}
            />
          </label>

          {[
            [
              "instagram",
              "Instagram",
              initial.instagram,
            ],

            [
              "facebook",
              "Facebook",
              initial.facebook,
            ],

            [
              "linkedin",
              "LinkedIn",
              initial.linkedin,
            ],

            [
              "youtube",
              "YouTube",
              initial.youtube,
            ],

            [
              "x",
              "X / Twitter",
              initial.x,
            ],
          ].map(
            ([
              name,
              label,
              value,
            ]) => (
              <label
                key={
                  name
                }
              >
                <span className={labelClass}>
                  {
                    label
                  }
                </span>

                <input
                  name={
                    name
                  }
                  type="url"
                  defaultValue={
                    value
                  }
                  className={inputClass}
                />
              </label>
            ),
          )}
        </div>
      </Section>

      <Section
        title="Header & Footer"
        description="Assign navigation menus and configure persistent footer information."
        icon={
          <Settings2 className="h-4 w-4" />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Header Menu
            </span>

            <select
              name="headerMenuId"
              defaultValue={
                initial.headerMenuId
              }
              className={inputClass}
            >
              <option value="">
                No menu assigned
              </option>

              {headerMenus.map(
                (
                  menu,
                ) => (
                  <option
                    key={
                      menu.id
                    }
                    value={
                      menu.id
                    }
                  >
                    {
                      menu.name
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Footer Menu
            </span>

            <select
              name="footerMenuId"
              defaultValue={
                initial.footerMenuId
              }
              className={inputClass}
            >
              <option value="">
                No menu assigned
              </option>

              {footerMenus.map(
                (
                  menu,
                ) => (
                  <option
                    key={
                      menu.id
                    }
                    value={
                      menu.id
                    }
                  >
                    {
                      menu.name
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Privacy Page
            </span>

            <select
              name="privacyPageId"
              defaultValue={
                initial.privacyPageId
              }
              className={inputClass}
            >
              <option value="">
                None
              </option>

              {pages.map(
                (
                  page,
                ) => (
                  <option
                    key={
                      page.id
                    }
                    value={
                      page.id
                    }
                  >
                    {
                      page.title
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Terms Page
            </span>

            <select
              name="termsPageId"
              defaultValue={
                initial.termsPageId
              }
              className={inputClass}
            >
              <option value="">
                None
              </option>

              {pages.map(
                (
                  page,
                ) => (
                  <option
                    key={
                      page.id
                    }
                    value={
                      page.id
                    }
                  >
                    {
                      page.title
                    }
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Footer Text
            </span>

            <textarea
              name="footerText"
              rows={
                3
              }
              defaultValue={
                initial.footerText
              }
              className={textareaClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Copyright
            </span>

            <input
              name="copyright"
              defaultValue={
                initial.copyright
              }
              className={inputClass}
            />
          </label>
        </div>
      </Section>

      <Section
        title="External Links"
        description="Configure your primary call-to-action and app-store destinations."
        icon={
          <ExternalLink className="h-4 w-4" />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Primary CTA Label
            </span>

            <input
              name="ctaLabel"
              defaultValue={
                initial.ctaLabel
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Primary CTA URL
            </span>

            <input
              name="ctaUrl"
              type="url"
              defaultValue={
                initial.ctaUrl
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Google Play URL
            </span>

            <input
              name="playStoreUrl"
              type="url"
              defaultValue={
                initial.playStoreUrl
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              App Store URL
            </span>

            <input
              name="appStoreUrl"
              type="url"
              defaultValue={
                initial.appStoreUrl
              }
              className={inputClass}
            />
          </label>
        </div>
      </Section>

      <Section
        title="Global SEO"
        description="Default search and social metadata. Individual pages can override these values."
        icon={
          <Search className="h-4 w-4" />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              SEO Title
            </span>

            <input
              name="seoTitle"
              defaultValue={
                initial.seoTitle
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Canonical URL
            </span>

            <input
              name="canonicalUrl"
              type="url"
              defaultValue={
                initial.canonicalUrl
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              SEO Description
            </span>

            <textarea
              name="seoDescription"
              rows={
                3
              }
              defaultValue={
                initial.seoDescription
              }
              className={textareaClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Keywords
            </span>

            <textarea
              name="seoKeywords"
              rows={
                2
              }
              defaultValue={
                initial.seoKeywords
              }
              placeholder="keyword one, keyword two"
              className={textareaClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Open Graph Title
            </span>

            <input
              name="ogTitle"
              defaultValue={
                initial.ogTitle
              }
              className={inputClass}
            />
          </label>

          <label className="flex items-center gap-2 self-end rounded-[9px] border border-[#E0E3E7] px-3 py-3">
            <input
              type="checkbox"
              name="noIndex"
              value="true"
              defaultChecked={
                initial.noIndex
              }
            />

            <span className="text-[10px] font-semibold text-[#555D68]">
              Prevent search indexing
            </span>
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Open Graph Description
            </span>

            <textarea
              name="ogDescription"
              rows={
                3
              }
              defaultValue={
                initial.ogDescription
              }
              className={textareaClass}
            />
          </label>

          <div className="md:col-span-2">
            <MediaPickerField
              label="Open Graph Image"
              name="ogImage"
              value={
                ogImage
              }
              onChange={
                setOgImage
              }
              hint="Default social-sharing image."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Theme"
        description="Global visual tokens that the public renderer will use for future CMS pages."
        icon={
          <Palette className="h-4 w-4" />
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[
            [
              "primaryColor",
              "Primary",
              initial.primaryColor,
            ],

            [
              "secondaryColor",
              "Secondary",
              initial.secondaryColor,
            ],

            [
              "accentColor",
              "Accent",
              initial.accentColor,
            ],

            [
              "backgroundColor",
              "Background",
              initial.backgroundColor,
            ],

            [
              "textColor",
              "Text",
              initial.textColor,
            ],
          ].map(
            ([
              name,
              label,
              value,
            ]) => (
              <label
                key={
                  name
                }
              >
                <span className={labelClass}>
                  {
                    label
                  }{" "}
                  Color
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name={
                      name
                    }
                    defaultValue={
                      value
                    }
                    className="h-10 w-14 cursor-pointer rounded-[8px] border border-[#DDE0E6] bg-white p-1"
                  />

                  <span className="text-[9px] font-mono text-[#777F8B]">
                    {
                      value
                    }
                  </span>
                </div>
              </label>
            ),
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label>
            <span className={labelClass}>
              Heading Font
            </span>

            <select
              name="headingFont"
              defaultValue={
                initial.headingFont
              }
              className={inputClass}
            >
              <option value="sans">
                Sans
              </option>

              <option value="serif">
                Serif
              </option>

              <option value="display">
                Display
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Body Font
            </span>

            <select
              name="bodyFont"
              defaultValue={
                initial.bodyFont
              }
              className={inputClass}
            >
              <option value="sans">
                Sans
              </option>

              <option value="serif">
                Serif
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Button Style
            </span>

            <select
              name="buttonStyle"
              defaultValue={
                initial.buttonStyle
              }
              className={inputClass}
            >
              <option value="square">
                Square
              </option>

              <option value="rounded">
                Rounded
              </option>

              <option value="pill">
                Pill
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Radius Scale
            </span>

            <select
              name="radiusScale"
              defaultValue={
                initial.radiusScale
              }
              className={inputClass}
            >
              <option value="none">
                None
              </option>

              <option value="small">
                Small
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="large">
                Large
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Container Width
            </span>

            <select
              name="containerWidth"
              defaultValue={
                initial.containerWidth
              }
              className={inputClass}
            >
              <option value="narrow">
                Narrow
              </option>

              <option value="standard">
                Standard
              </option>

              <option value="wide">
                Wide
              </option>
            </select>
          </label>
        </div>

        <div className="mt-6 rounded-[14px] border border-[#E3E6EA] bg-[#FAFBFC] p-5">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-[#66707C]" />

            <p className="text-[10px] font-bold">
              Theme Preview Note
            </p>
          </div>

          <p className="mt-2 text-[9px] leading-5 text-[#858C97]">
            These settings are stored now. The public website will
            start consuming them in the public-rendering bundle.
          </p>
        </div>
      </Section>

      <div className="sticky bottom-4 z-20 flex justify-end rounded-[14px] border border-[#DDE1E7] bg-white/95 p-3 shadow-[0_12px_40px_rgba(28,35,48,0.10)] backdrop-blur">
        <button
          type="submit"
          className="min-h-10 rounded-[9px] bg-[#3157E7] px-6 text-[10px] font-bold text-white transition hover:bg-[#294CCB]"
        >
          Save Appearance
        </button>
      </div>
    </form>
  );
}