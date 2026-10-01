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
  const radius =
    theme.radiusScale === "none"
      ? "0px"
      : theme.radiusScale === "small"
        ? "8px"
        : theme.radiusScale === "large"
          ? "28px"
          : "16px";

  const buttonRadius =
    theme.buttonStyle === "square"
      ? "0px"
      : theme.buttonStyle === "pill"
        ? "999px"
        : "12px";

  const containerMax =
    theme.containerWidth === "narrow"
      ? "960px"
      : theme.containerWidth === "wide"
        ? "1360px"
        : "1200px";

  const headingFont =
    theme.headingFont === "serif"
      ? "Georgia, 'Times New Roman', serif"
      : theme.headingFont === "display"
        ? "Arial Black, Arial, sans-serif"
        : "Arial, Helvetica, sans-serif";

  const bodyFont =
    theme.bodyFont === "serif"
      ? "Georgia, 'Times New Roman', serif"
      : "Arial, Helvetica, sans-serif";

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

    "--cms-radius":
      radius,

    "--cms-button-radius":
      buttonRadius,

    "--cms-container-max":
      containerMax,

    "--cms-heading-font":
      headingFont,

    "--cms-body-font":
      bodyFont,
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