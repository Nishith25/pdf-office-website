import {
  cmsPageSchema,
  cmsSettingsSchema,
} from "../core/schemas";

import {
  createDefaultCmsSettings,
} from "../core/settings";

import {
  createCmsStructuredBlockDefault,
} from "../core/structured-block-defaults";

import type {
  SiteConfig,
} from "../../site/config";

export function createCmsBootstrapSeed(
  site:
    SiteConfig,

  now:
    Date,
) {
  const defaults =
    createDefaultCmsSettings();

  const isGpsMaps =
    site.key ===
    "gps-maps";

  const homepage =
    cmsPageSchema.parse({
      title:
        "Home",

      slug:
        "home",

      status:
        "published",

      isHomepage:
        true,

      seo: {
        title:
          site.name,

        description:
          site.tagline,

        keywords:
          isGpsMaps
            ? [
                "GPS maps",
                "earth maps",
                "navigation",
                "routes",
                "location tools",
              ]
            : [],

        canonicalUrl:
          site.siteUrl,

        ogTitle:
          site.name,

        ogDescription:
          site.tagline,

        ogImage:
          "",

        noIndex:
          false,
      },

      createdAt:
        now,

      updatedAt:
        now,

      publishedAt:
        now,
    });

  const heroDefault =
    createCmsStructuredBlockDefault(
      "hero",
    );

  const heroData =
    isGpsMaps
      ? {
          ...heroDefault,

          eyebrow:
            "Explore with GPS Maps",

          title:
            "Find places. Plan routes. Explore more.",

          description:
            "Search destinations, explore maps and use practical location tools from one modern navigation experience.",

          badge:
            "Maps • Routes • Places",

          primaryCta: {
            label:
              "Explore Maps",

            url:
              "/",
          },

          secondaryCta: {
            label:
              "Discover Tools",

            url:
              "/",
          },

          presentation: {
            ...heroDefault.presentation,

            variant:
              "split" as const,

            width:
              "wide" as const,

            spacing:
              "spacious" as const,
          },
        }
      : {
          ...heroDefault,

          eyebrow:
            site.shortName,

          title:
            site.name,

          description:
            site.tagline,
        };

  const statsDefault =
    createCmsStructuredBlockDefault(
      "stats",
    );

  const gpsStatsData = {
    ...statsDefault,

    title:
      "Built for everyday exploration",

    items: [
      {
        id:
          "gps-stat-search",

        value:
          "Fast",

        label:
          "Place search",

        description:
          "Find destinations and useful places quickly.",
      },

      {
        id:
          "gps-stat-routes",

        value:
          "Smart",

        label:
          "Route planning",

        description:
          "Plan trips with a clear navigation-first experience.",
      },

      {
        id:
          "gps-stat-view",

        value:
          "Global",

        label:
          "Map exploration",

        description:
          "Explore locations and map views around the world.",
      },
    ],

    presentation: {
      ...statsDefault.presentation,

      width:
        "wide" as const,

      variant:
        "cards" as const,
    },
  };

  const cardGridDefault =
    createCmsStructuredBlockDefault(
      "cardGrid",
    );

  const gpsCardGridData = {
    ...cardGridDefault,

    title:
      "Everything you need to explore",

    description:
      "A simple set of map and location tools designed around finding places and getting where you need to go.",

    columns:
      3 as const,

    cards: [
      {
        id:
          "gps-card-explore",

        title:
          "Explore Maps",

        description:
          "Browse locations and discover places with an immersive map experience.",

        image:
          "",

        icon:
          "MAP",

        badge:
          "Explore",

        linkLabel:
          "",

        linkUrl:
          "",
      },

      {
        id:
          "gps-card-route",

        title:
          "Plan Routes",

        description:
          "Build a clear route between places and prepare for your journey.",

        image:
          "",

        icon:
          "ROUTE",

        badge:
          "Navigate",

        linkLabel:
          "",

        linkUrl:
          "",
      },

      {
        id:
          "gps-card-nearby",

        title:
          "Discover Nearby",

        description:
          "Find useful places and destinations around the area you are exploring.",

        image:
          "",

        icon:
          "NEAR",

        badge:
          "Discover",

        linkLabel:
          "",

        linkUrl:
          "",
      },
    ],

    presentation: {
      ...cardGridDefault.presentation,

      width:
        "wide" as const,

      variant:
        "bento" as const,
    },
  };

  const featureGridDefault =
    createCmsStructuredBlockDefault(
      "featureGrid",
    );

  const gpsFeatureGridData = {
    ...featureGridDefault,

    title:
      "Navigation tools that stay simple",

    description:
      "Explore locations with clear, useful tools rather than a cluttered map interface.",

    columns:
      3 as const,

    items: [
      {
        id:
          "gps-feature-search",

        eyebrow:
          "Search",

        title:
          "Find places quickly",

        description:
          "Search destinations and move directly into exploration.",

        icon:
          "SEARCH",

        image:
          "",

        badge:
          "",

        linkLabel:
          "",

        linkUrl:
          "",
      },

      {
        id:
          "gps-feature-satellite",

        eyebrow:
          "Explore",

        title:
          "See more of the map",

        description:
          "Use map-focused views to understand places and surroundings.",

        icon:
          "VIEW",

        image:
          "",

        badge:
          "",

        linkLabel:
          "",

        linkUrl:
          "",
      },

      {
        id:
          "gps-feature-location",

        eyebrow:
          "Location",

        title:
          "Keep location tools close",

        description:
          "Use practical navigation features whenever you need them.",

        icon:
          "LOCATE",

        image:
          "",

        badge:
          "",

        linkLabel:
          "",

        linkUrl:
          "",
      },
    ],

    presentation: {
      ...featureGridDefault.presentation,

      width:
        "wide" as const,

      variant:
        "icon-grid" as const,
    },
  };

  const faqDefault =
    createCmsStructuredBlockDefault(
      "faq",
    );

  const gpsFaqData = {
    ...faqDefault,

    title:
      "Frequently asked questions",

    description:
      "Quick answers about the GPS Maps experience.",

    items: [
      {
        id:
          "gps-faq-search",

        question:
          "What can I search for?",

        answer:
          "GPS Maps is designed for exploring destinations, places and useful location information.",
      },

      {
        id:
          "gps-faq-routes",

        question:
          "Can I use GPS Maps for route planning?",

        answer:
          "The experience is designed around map exploration and navigation-oriented route tools.",
      },

      {
        id:
          "gps-faq-mobile",

        question:
          "Does the website work on mobile?",

        answer:
          "The public experience is designed to adapt across desktop, tablet and mobile screens.",
      },
    ],

    presentation: {
      ...faqDefault.presentation,

      width:
        "wide" as const,

      variant:
        "accordion" as const,
    },
  };

  const ctaDefault =
    createCmsStructuredBlockDefault(
      "cta",
    );

  const gpsCtaData = {
    ...ctaDefault,

    eyebrow:
      "GPS Maps",

    title:
      "Start exploring your next destination.",

    description:
      "Search places, explore maps and keep useful location tools within reach.",

    primaryCta: {
      label:
        "Explore Now",

      url:
        "/",
    },

    secondaryCta: {
      label:
        "",

      url:
        "",
    },

    presentation: {
      ...ctaDefault.presentation,

      width:
        "wide" as const,

      spacing:
        "spacious" as const,

      alignment:
        "center" as const,

      variant:
        "centered" as const,
    },
  };

  const gpsBlocks = [
    {
      type:
        "hero" as const,

      data:
        heroData,
    },

    {
      type:
        "stats" as const,

      data:
        gpsStatsData,
    },

    {
      type:
        "cardGrid" as const,

      data:
        gpsCardGridData,
    },

    {
      type:
        "featureGrid" as const,

      data:
        gpsFeatureGridData,
    },

    {
      type:
        "faq" as const,

      data:
        gpsFaqData,
    },

    {
      type:
        "cta" as const,

      data:
        gpsCtaData,
    },
  ];

  const pdfBlocks = [
    {
      type:
        "hero" as const,

      data:
        heroData,
    },
  ];

  const blocks =
    isGpsMaps
      ? gpsBlocks
      : pdfBlocks;

  const settings =
    cmsSettingsSchema.parse({
      ...defaults,

      identity: {
        ...defaults.identity,

        siteName:
          site.name,

        shortName:
          site.shortName,

        tagline:
          site.tagline,

        siteUrl:
          site.siteUrl,

        logoUrl:
          isGpsMaps
            ? new URL(
                site.adminLogoUrl,
                site.siteUrl,
              ).toString()
            : defaults.identity.logoUrl,
      },

      footer:
        isGpsMaps
          ? {
              ...defaults.footer,

              text:
                "Explore places, routes and location tools with GPS Maps.",

              copyright:
                `© ${now.getUTCFullYear()} GPS Maps`,
            }
          : defaults.footer,

      globalSeo: {
        ...defaults.globalSeo,

        title:
          site.name,

        description:
          site.tagline,

        canonicalUrl:
          site.siteUrl,

        ogTitle:
          site.name,

        ogDescription:
          site.tagline,

        keywords:
          isGpsMaps
            ? [
                "GPS maps",
                "earth maps",
                "navigation",
                "routes",
                "location tools",
              ]
            : [],
      },

      theme:
        isGpsMaps
          ? {
              ...defaults.theme,

              primaryColor:
                "#2563EB",

              secondaryColor:
                "#0F172A",

              accentColor:
                "#22C55E",

              backgroundColor:
                "#F8FAFC",

              textColor:
                "#0F172A",

              buttonStyle:
                "rounded",

              radiusScale:
                "large",

              containerWidth:
                "wide",
            }
          : defaults.theme,

      updatedAt:
        now,
    });

  return {
    homepage,
    heroData,
    blocks,
    settings,
  };
}
