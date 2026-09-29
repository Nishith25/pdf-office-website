import {
  getSiteConfig,
} from "./config";

export type PublicThemeCopy = {
  heroProof:
    string;

  heroStageLabel:
    string;

  heroStageBadge:
    string;

  heroTools:
    readonly string[];

  featureEyebrow:
    string;

  imagePlaceholderEyebrow:
    string;

  imagePlaceholderTitle:
    string;

  downloadAppLabel:
    string;

  downloadTitle:
    string;

  downloadDescription:
    string;
};

const PDF_OFFICE_COPY:
  PublicThemeCopy = {
  heroProof:
    "Mobile document workspace",

  heroStageLabel:
    "PDF OFFICE",

  heroStageBadge:
    "PDF",

  heroTools: [
    "SCAN",
    "OCR",
    "EDIT",
    "SIGN",
  ],

  featureEyebrow:
    "Built for document work",

  imagePlaceholderEyebrow:
    "PDF OFFICE",

  imagePlaceholderTitle:
    "One workspace. Every document.",

  downloadAppLabel:
    "PDF OFFICE",

  downloadTitle:
    "Your documents. Ready anywhere.",

  downloadDescription:
    "Scan, work with PDFs and keep essential document tools close.",
};

const GPS_MAPS_COPY:
  PublicThemeCopy = {
  heroProof:
    "Explore places, routes and location tools",

  heroStageLabel:
    "GPS MAPS",

  heroStageBadge:
    "MAP",

  heroTools: [
    "SEARCH",
    "ROUTE",
    "SATELLITE",
    "LOCATE",
  ],

  featureEyebrow:
    "Built for exploration",

  imagePlaceholderEyebrow:
    "GPS MAPS",

  imagePlaceholderTitle:
    "Explore places. Navigate smarter.",

  downloadAppLabel:
    "GPS MAPS",

  downloadTitle:
    "Maps and location tools. Ready anywhere.",

  downloadDescription:
    "Explore places, plan routes and keep useful navigation tools close.",
};

export function getPublicThemeCopy():
  PublicThemeCopy {
  const site =
    getSiteConfig();

  switch (
    site.themeKey
  ) {
    case "gps-maps-navigation":
      return GPS_MAPS_COPY;

    case "pdf-office-product-editorial":
      return PDF_OFFICE_COPY;

    default:
      return {
        heroProof:
          site.tagline,

        heroStageLabel:
          site.shortName
            .toUpperCase(),

        heroStageBadge:
          site.shortName
            .split(
              /\s+/,
            )[0]
            ?.slice(
              0,
              4,
            )
            .toUpperCase() ||
          "SITE",

        heroTools: [
          "EXPLORE",
          "DISCOVER",
          "TOOLS",
          "MORE",
        ],

        featureEyebrow:
          site.tagline,

        imagePlaceholderEyebrow:
          site.shortName
            .toUpperCase(),

        imagePlaceholderTitle:
          site.tagline,

        downloadAppLabel:
          site.shortName
            .toUpperCase(),

        downloadTitle:
          site.name,

        downloadDescription:
          site.tagline,
      };
  }
}
