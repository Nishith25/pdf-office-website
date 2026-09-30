import {
  MongoClient,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  getSiteConfig,
} from "../lib/site/config";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.maps.gps.navigation.drivingdirections.live.earth.gpsnavigation&hl=en_IN";

const PRODUCTION_URL =
  "https://gps-maps-website.vercel.app";

const uri =
  process.env
    .MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing.",
  );
}

const site =
  getSiteConfig();

if (
  site.key !==
    "gps-maps" ||
  site.databaseName !==
    "gps_maps_website"
) {
  throw new Error(
    `REFUSED: ${site.key} / ${site.databaseName}`,
  );
}

if (
  site.siteUrl !==
  PRODUCTION_URL
) {
  throw new Error(
    `REFUSED: SITE_URL must be ${PRODUCTION_URL}`,
  );
}

const apply =
  process.argv.includes(
    "--apply",
  );

const seo = {
  title:
    "GPS Maps – Navigation, Offline Maps & Travel Tools",

  description:
    "Download GPS Maps for route planning, live location sharing, offline maps, nearby places, compass tools and everyday navigation.",

  keywords: [
    "GPS Maps",
    "GPS navigation",
    "route planner",
    "offline maps",
    "live location sharing",
    "nearby places",
    "digital compass",
    "navigation app",
  ],

  canonicalUrl:
    PRODUCTION_URL,

  ogTitle:
    "GPS Maps – Navigate Smarter",

  ogDescription:
    "Routes, offline maps, live location sharing and useful travel tools in one Android app.",

  noIndex:
    false,
};

const heroData = {
  eyebrow:
    "",

  title:
    "Navigate smarter. Wherever you go.",

  description:
    "Routes, offline maps, live location sharing and useful travel tools in one app.",

  badge:
    "",

  image:
    "",

  primaryCta: {
    label:
      "Get it on Google Play",

    url:
      PLAY_STORE_URL,
  },

  secondaryCta: {
    label:
      "See features",

    url:
      "/#features",
  },

  presentation: {
    background:
      "default",

    width:
      "wide",

    spacing:
      "spacious",

    alignment:
      "left",

    variant:
      "split",
  },
};

const toolsData = {
  title:
    "More tools",

  description:
    "",

  columns:
    3,

  cards: [
    {
      id:
        "gps-tool-parking",

      title:
        "Parking Manager",

      description:
        "Save where you parked and make it easier to find your vehicle again.",

      image:
        "",

      icon:
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
        "gps-tool-speedometer",

      title:
        "Digital Speedometer",

      description:
        "View your current travel speed in a simple driving-friendly display.",

      image:
        "",

      icon:
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
        "gps-tool-location",

      title:
        "My Location & Address",

      description:
        "See your current position and quickly understand the address around you.",

      image:
        "",

      icon:
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
        "gps-tool-weather",

      title:
        "Weather & Travel",

      description:
        "Check useful weather information before or during your journey.",

      image:
        "",

      icon:
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
        "gps-tool-circles",

      title:
        "Private Circles",

      description:
        "Stay connected with selected family or friends through private location groups.",

      image:
        "",

      icon:
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
        "gps-tool-geofence",

      title:
        "Geofencing Alerts",

      description:
        "Use location-based alerts for places that matter to you.",

      image:
        "",

      icon:
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
    background:
      "default",

    width:
      "wide",

    spacing:
      "normal",

    alignment:
      "left",

    variant:
      "minimal",
  },
};

const featuresData = {
  title:
    "Features",

  description:
    "",

  columns:
    3,

  items: [
    {
      id:
        "gps-feature-route",

      eyebrow:
        "",

      title:
        "Route Planner",

      description:
        "Plan routes before you travel and keep the path ahead easy to understand.",

      icon:
        "",

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
        "gps-feature-share",

      eyebrow:
        "",

      title:
        "Live Location Sharing",

      description:
        "Share your location with family and friends when you choose.",

      icon:
        "",

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
        "gps-feature-offline",

      eyebrow:
        "",

      title:
        "Offline Maps",

      description:
        "Keep useful map access available when your connection is limited.",

      icon:
        "",

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
        "gps-feature-nearby",

      eyebrow:
        "",

      title:
        "Nearby Explore",

      description:
        "Find useful places, attractions and everyday essentials around you.",

      icon:
        "",

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
        "gps-feature-compass",

      eyebrow:
        "",

      title:
        "Digital Compass",

      description:
        "Use built-in compass guidance to understand direction and orientation.",

      icon:
        "",

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
        "gps-feature-language",

      eyebrow:
        "",

      title:
        "Multi-language Support",

      description:
        "Use the app in the language that is most comfortable for you.",

      icon:
        "",

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
    background:
      "default",

    width:
      "wide",

    spacing:
      "normal",

    alignment:
      "left",

    variant:
      "icon-grid",
  },
};

const faqData = {
  title:
    "Questions",

  description:
    "",

  items: [
    {
      id:
        "gps-faq-android",

      question:
        "Where can I download GPS Maps?",

      answer:
        "GPS Maps is available through Google Play for Android.",
    },

    {
      id:
        "gps-faq-offline",

      question:
        "Can I use offline maps?",

      answer:
        "The app includes offline map tools for situations where mobile connectivity is limited.",
    },

    {
      id:
        "gps-faq-sharing",

      question:
        "Can I share my location?",

      answer:
        "Yes. Live Location Sharing lets you share your location with people you choose.",
    },

    {
      id:
        "gps-faq-tools",

      question:
        "What other tools are included?",

      answer:
        "The app includes navigation, nearby discovery, compass tools, route planning and additional travel utilities.",
    },
  ],

  presentation: {
    background:
      "default",

    width:
      "wide",

    spacing:
      "normal",

    alignment:
      "left",

    variant:
      "accordion",
  },
};

const ctaData = {
  eyebrow:
    "",

  title:
    "Ready to navigate?",

  description:
    "Download GPS Maps on Google Play.",

  image:
    "",

  primaryCta: {
    label:
      "Get it on Google Play",

    url:
      PLAY_STORE_URL,
  },

  secondaryCta: {
    label:
      "",

    url:
      "",
  },

  presentation: {
    background:
      "contrast",

    width:
      "wide",

    spacing:
      "spacious",

    alignment:
      "center",

    variant:
      "centered",
  },
};

async function main() {
  const client =
    new MongoClient(
      uri!,
    );

  try {
    await client.connect();

    const database =
      client.db(
        site.databaseName,
      );

    const homepage =
      await database
        .collection(
          CMS_COLLECTIONS.pages,
        )
        .findOne({
          isHomepage:
            true,

          status:
            "published",
        });

    if (!homepage) {
      throw new Error(
        "Published GPS homepage not found.",
      );
    }

    const pageId =
      homepage
        ._id
        .toString();

    const blocks =
      await database
        .collection(
          CMS_COLLECTIONS.blocks,
        )
        .find({
          pageId,
        })
        .sort({
          order:
            1,
        })
        .toArray();

    const requiredTypes = [
      "hero",
      "stats",
      "cardGrid",
      "featureGrid",
      "faq",
      "cta",
    ];

    for (
      const type
      of requiredTypes
    ) {
      if (
        !blocks.some(
          (
            block,
          ) =>
            block.type ===
            type,
        )
      ) {
        throw new Error(
          `Required block missing: ${type}`,
        );
      }
    }

    console.log("");
    console.log(
      "========================================",
    );

    console.log(
      "GPS Maps App Marketing Finalizer",
    );

    console.log(
      "========================================",
    );

    console.log(
      `Site: ${site.name}`,
    );

    console.log(
      `Database: ${site.databaseName}`,
    );

    console.log(
      `Production: ${site.siteUrl}`,
    );

    console.log(
      "Hero: Navigate smarter. Wherever you go.",
    );

    console.log(
      "More tools: Parking / Speedometer / Location / Weather / Circles / Geofencing",
    );

    console.log(
      "Features: 6 real app features",
    );

    console.log(
      "Primary destination: Google Play",
    );

    if (!apply) {
      console.log("");
      console.log(
        "DRY RUN — no database writes performed.",
      );

      console.log(
        "Use --apply with GPS_FINALIZE_CONFIRM=FINALIZE_GPS_SUBMISSION.",
      );

      return;
    }

    if (
      process.env
        .GPS_FINALIZE_CONFIRM !==
      "FINALIZE_GPS_SUBMISSION"
    ) {
      throw new Error(
        'GPS_FINALIZE_CONFIRM must equal "FINALIZE_GPS_SUBMISSION".',
      );
    }

    const now =
      new Date();

    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .updateOne(
        {
          _id:
            homepage._id,
        },
        {
          $set: {
            "seo.title":
              seo.title,

            "seo.description":
              seo.description,

            "seo.keywords":
              seo.keywords,

            "seo.canonicalUrl":
              seo.canonicalUrl,

            "seo.ogTitle":
              seo.ogTitle,

            "seo.ogDescription":
              seo.ogDescription,

            "seo.noIndex":
              false,

            updatedAt:
              now,
          },
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.settings,
      )
      .updateOne(
        {
          key:
            "global",
        },
        {
          $set: {
            "identity.tagline":
              "Navigation • Maps • Travel Tools",

            "identity.faviconUrl":
              `${PRODUCTION_URL}/gps-maps-icon.svg`,

            "footer.text":
              "GPS Maps for Android.",

            "social.instagram":
              "",

            "social.facebook":
              "https://www.facebook.com/GameNexa/",

            "social.linkedin":
              "https://www.linkedin.com/company/gamenexa/",

            "social.youtube":
              "https://www.youtube.com/c/GameNexaStudios",

            "social.x":
              "https://x.com/gamenexastudio?lang=en",

            "externalLinks.primaryCtaLabel":
              "Get the App",

            "externalLinks.primaryCtaUrl":
              PLAY_STORE_URL,

            "externalLinks.googlePlayUrl":
              PLAY_STORE_URL,

            "globalSeo.title":
              seo.title,

            "globalSeo.description":
              seo.description,

            "globalSeo.keywords":
              seo.keywords,

            "globalSeo.canonicalUrl":
              seo.canonicalUrl,

            "globalSeo.ogTitle":
              seo.ogTitle,

            "globalSeo.ogDescription":
              seo.ogDescription,

            "globalSeo.noIndex":
              false,

            updatedAt:
              now,
          },
        },
      );

    const blockCollection =
      database.collection(
        CMS_COLLECTIONS.blocks,
      );

    await blockCollection.updateOne(
      {
        pageId,
        type:
          "hero",
      },
      {
        $set: {
          data:
            heroData,

          order:
            1,

          visible:
            true,

          updatedAt:
            now,
        },
      },
    );

    /*
     * The old Fast / Smart / Global block
     * is intentionally removed from the
     * public marketing experience.
     */
    await blockCollection.updateOne(
      {
        pageId,
        type:
          "stats",
      },
      {
        $set: {
          visible:
            false,

          order:
            2,

          updatedAt:
            now,
        },
      },
    );

    await blockCollection.updateOne(
      {
        pageId,
        type:
          "cardGrid",
      },
      {
        $set: {
          data:
            toolsData,

          order:
            3,

          visible:
            true,

          updatedAt:
            now,
        },
      },
    );

    await blockCollection.updateOne(
      {
        pageId,
        type:
          "featureGrid",
      },
      {
        $set: {
          data:
            featuresData,

          order:
            4,

          visible:
            true,

          updatedAt:
            now,
        },
      },
    );

    await blockCollection.updateOne(
      {
        pageId,
        type:
          "faq",
      },
      {
        $set: {
          data:
            faqData,

          order:
            5,

          visible:
            true,

          updatedAt:
            now,
        },
      },
    );

    await blockCollection.updateOne(
      {
        pageId,
        type:
          "cta",
      },
      {
        $set: {
          data:
            ctaData,

          order:
            6,

          visible:
            true,

          updatedAt:
            now,
        },
      },
    );

    const headerMenuItems = [
      {
        id:
          "gps-nav-features",

        label:
          "Features",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/#features",

        target:
          "same-tab",

        parentId:
          null,

        order:
          1,

        enabled:
          true,
      },

      {
        id:
          "gps-nav-tools",

        label:
          "More Tools",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/#tools",

        target:
          "same-tab",

        parentId:
          null,

        order:
          2,

        enabled:
          true,
      },

      {
        id:
          "gps-nav-blog",

        label:
          "Blog",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/blog",

        target:
          "same-tab",

        parentId:
          null,

        order:
          3,

        enabled:
          true,
      },

      {
        id:
          "gps-nav-faq",

        label:
          "FAQ",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/#faq",

        target:
          "same-tab",

        parentId:
          null,

        order:
          4,

        enabled:
          true,
      },
    ];

    const footerMenuItems = [
      ...headerMenuItems,

      {
        id:
          "gps-footer-gamenexa",

        label:
          "GameNexa",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "https://www.gamenexa.com/",

        target:
          "new-tab",

        parentId:
          null,

        order:
          5,

        enabled:
          true,
      },
    ];

    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .updateOne(
        {
          key:
            "header",
        },
        {
          $set: {
            items:
              headerMenuItems,

            updatedAt:
              now,
          },
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .updateOne(
        {
          key:
            "footer",
        },
        {
          $set: {
            items:
              footerMenuItems,

            updatedAt:
              now,
          },
        },
      );

    console.log("");
    console.log(
      "✓ Generic stats section hidden",
    );

    console.log(
      "✓ Hero converted to app download marketing",
    );

    console.log(
      "✓ Additional app tools configured",
    );

    console.log(
      "✓ Real application features configured",
    );

    console.log(
      "✓ FAQ converted to app questions",
    );

    console.log(
      "✓ Every primary CTA points to Google Play",
    );

    console.log(
      "✓ SEO converted from generic maps site to Android app marketing",
    );

    console.log("");
    console.log(
      "GPS Maps app marketing configuration completed.",
    );
  } finally {
    await client.close();
  }
}

main().catch(
  (
    error,
  ) => {
    console.error(
      "GPS finalization failed:",
      error,
    );

    process.exitCode =
      1;
  },
);
