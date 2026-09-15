import AppearanceEditor from "../../../../components/admin/appearance/AppearanceEditor";

import {
  listCmsMenus,
} from "../../../../lib/repositories/cms-menus";

import {
  listCmsPages,
} from "../../../../lib/repositories/cms-pages";

import {
  getCmsSettings,
} from "../../../../lib/repositories/cms-settings";

export const dynamic =
  "force-dynamic";

type Props = {
  searchParams:
    Promise<{
      saved?:
        string;

      error?:
        string;
    }>;
};

export default async function AppearancePage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const [
    settings,
    menus,
    pages,
  ] =
    await Promise.all([
      getCmsSettings(),

      listCmsMenus(),

      listCmsPages(),
    ]);

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9AA0AA]">
          Appearance
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
          Site Appearance
        </h1>

        <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[#7D8591]">
          Manage your website identity, header and footer,
          global SEO defaults, external links, and reusable
          theme settings.
        </p>
      </div>

      {params.error && (
  <div className="mt-5 rounded-[12px] border border-[#F0D4D4] bg-[#FFF8F8] px-4 py-3 text-[10px] font-semibold text-[#A94A4A]">
    {params.error ===
    "menu"
      ? "The selected header or footer menu is no longer available or is not valid for that location."
      : "Some appearance values were invalid. Please review the form and try again."}
  </div>
)}

      <div className="mt-7">
        <AppearanceEditor
          saved={
            params.saved ===
            "1"
          }
          initial={{
            siteName:
              settings.identity
                .siteName,

            shortName:
              settings.identity
                .shortName,

            tagline:
              settings.identity
                .tagline,

            logo:
              settings.identity
                .logoUrl,

            favicon:
              settings.identity
                .faviconUrl,

            siteUrl:
              settings.identity
                .siteUrl,

            email:
              settings.contact
                .email,

            phone:
              settings.contact
                .phone,

            address:
              settings.contact
                .address,

            instagram:
              settings.social
                .instagram,

            facebook:
              settings.social
                .facebook,

            linkedin:
              settings.social
                .linkedin,

            youtube:
              settings.social
                .youtube,

            x:
              settings.social
                .x,

            ctaLabel:
              settings.externalLinks
                .primaryCtaLabel,

            ctaUrl:
              settings.externalLinks
                .primaryCtaUrl,

            playStoreUrl:
              settings.externalLinks
                .googlePlayUrl,

            appStoreUrl:
              settings.externalLinks
                .appStoreUrl,

            footerText:
              settings.footer
                .text,

            copyright:
              settings.footer
                .copyright,

            privacyPageId:
              settings.footer
                .privacyPageId,

            termsPageId:
              settings.footer
                .termsPageId,

            headerMenuId:
              settings.footer
                .headerMenuId,

            footerMenuId:
              settings.footer
                .footerMenuId,

            seoTitle:
              settings.globalSeo
                .title,

            seoDescription:
              settings.globalSeo
                .description,

            seoKeywords:
              settings.globalSeo
                .keywords.join(
                  ", ",
                ),

            canonicalUrl:
              settings.globalSeo
                .canonicalUrl,

            ogTitle:
              settings.globalSeo
                .ogTitle,

            ogDescription:
              settings.globalSeo
                .ogDescription,

            ogImage:
              settings.globalSeo
                .ogImage,

            noIndex:
              settings.globalSeo
                .noIndex,

            primaryColor:
              settings.theme
                .primaryColor,

            secondaryColor:
              settings.theme
                .secondaryColor,

            accentColor:
              settings.theme
                .accentColor,

            backgroundColor:
              settings.theme
                .backgroundColor,

            textColor:
              settings.theme
                .textColor,

            headingFont:
              settings.theme
                .headingFont,

            bodyFont:
              settings.theme
                .bodyFont,

            buttonStyle:
              settings.theme
                .buttonStyle,

            radiusScale:
              settings.theme
                .radiusScale,

            containerWidth:
              settings.theme
                .containerWidth,
          }}
          menus={
            menus.map(
              (
                menu,
              ) => ({
                id:
                  menu.id,

                name:
                  menu.name,

                location:
                  menu.location,
              }),
            )
          }
          pages={
            pages.map(
              (
                page,
              ) => ({
                id:
                  page.id,

                title:
                  page.title,
              }),
            )
          }
        />
      </div>
    </div>
  );
}