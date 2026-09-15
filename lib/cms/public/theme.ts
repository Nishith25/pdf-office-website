import type {
  CmsSettings,
} from "../core/types";

type CmsTheme =
  CmsSettings["theme"];

export type CmsThemeStyle =
  Record<
    string,
    string
  >;

export function buildCmsThemeStyle(
  theme:
    CmsTheme,
): CmsThemeStyle {
  return {
    "--cms-primary":
      theme.primaryColor,

    "--cms-secondary":
      theme.secondaryColor,

    "--cms-accent":
      theme.accentColor,

    "--cms-background":
      theme.backgroundColor,

    "--cms-text":
      theme.textColor,
  };
}

export function getCmsContainerClass(
  theme:
    CmsTheme,
): string {
  switch (
    theme.containerWidth
  ) {
    case "narrow":
      return "mx-auto w-full max-w-4xl px-5 sm:px-6";

    case "wide":
      return "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

    case "standard":
    default:
      return "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8";
  }
}

export function getCmsRadiusClass(
  theme:
    CmsTheme,
): string {
  switch (
    theme.radiusScale
  ) {
    case "none":
      return "rounded-none";

    case "small":
      return "rounded-md";

    case "large":
      return "rounded-3xl";

    case "medium":
    default:
      return "rounded-xl";
  }
}

export function getCmsButtonClass(
  theme:
    CmsTheme,
): string {
  switch (
    theme.buttonStyle
  ) {
    case "square":
      return "rounded-none";

    case "pill":
      return "rounded-full";

    case "rounded":
    default:
      return "rounded-xl";
  }
}

export function getCmsHeadingFontClass(
  theme:
    CmsTheme,
): string {
  switch (
    theme.headingFont
  ) {
    case "serif":
      return "font-serif";

    case "display":
      return "font-display";

    case "sans":
    default:
      return "font-sans";
  }
}

export function getCmsBodyFontClass(
  theme:
    CmsTheme,
): string {
  switch (
    theme.bodyFont
  ) {
    case "serif":
      return "font-serif";

    case "sans":
    default:
      return "font-sans";
  }
}