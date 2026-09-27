import type {
  CSSProperties,
  ReactNode,
} from "react";

import type {
  CmsSettings,
} from "../../../lib/cms/core/types";

import type {
  CmsPublicNavigationItem,
} from "../../../lib/cms/public/navigation";

import {
  buildCmsThemeStyle,
  getCmsBodyFontClass,
} from "../../../lib/cms/public/theme";

import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

export default function PublicSiteShell({
  settings,
  headerNavigation,
  footerNavigation,
  children,
}: {
  settings:
    CmsSettings;

  headerNavigation:
    readonly CmsPublicNavigationItem[];

  footerNavigation:
    readonly CmsPublicNavigationItem[];

  children?:
    ReactNode;
}) {
  const themeStyle =
    buildCmsThemeStyle(
      settings.theme,
    ) as CSSProperties;

  return (
    <div
      data-pdf-theme="product-editorial"
      style={
        themeStyle
      }
      className={`pdf-shell flex min-h-screen flex-col ${getCmsBodyFontClass(
        settings.theme,
      )}`}
    >
      <PublicHeader
        settings={
          settings
        }
        navigation={
          headerNavigation
        }
      />

      <div className="pdf-public-main flex-1">
        {
          children
        }
      </div>

      <PublicFooter
        settings={
          settings
        }
        navigation={
          footerNavigation
        }
      />
    </div>
  );
}
