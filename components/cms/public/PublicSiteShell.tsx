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

  children:
    ReactNode;
}) {
  const themeStyle =
    buildCmsThemeStyle(
      settings.theme,
    ) as CSSProperties;

  return (
    <div
      style={
        themeStyle
      }
      className={`flex min-h-screen flex-col bg-[var(--cms-background)] text-[var(--cms-text)] ${getCmsBodyFontClass(
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

      <div className="flex-1">
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