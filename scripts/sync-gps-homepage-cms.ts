import {
  mkdir,
  writeFile,
} from "node:fs/promises";

import {
  getSiteConfig,
} from "../lib/site/config";

import {
  getCmsHomepage,
} from "../lib/repositories/cms-pages";

import {
  getCmsBlocksForPage,
  replaceCmsBlocksForPage,
} from "../lib/repositories/cms-blocks";

import {
  parseCmsStructuredBlockData,
} from "../lib/cms/core/block-data-schemas";

import type {
  CmsBlock,
  CmsBlockType,
} from "../lib/cms/core/types";

async function main() {
const apply =
  process.argv.includes("--apply");

const site =
  getSiteConfig();

if (site.key !== "gps-maps") {
  throw new Error(
    `Refusing to run for SITE_KEY=${site.key}. Expected gps-maps.`,
  );
}

const homepage =
  await getCmsHomepage();

if (!homepage) {
  throw new Error(
    "GPS homepage was not found.",
  );
}

const page = homepage;

const existing =
  await getCmsBlocksForPage(
    page.id,
  );

const timestamp =
  new Date()
    .toISOString()
    .replace(
      /[:.]/g,
      "-",
    );

await mkdir(
  "tmp",
  {
    recursive: true,
  },
);

await writeFile(
  `tmp/gps-homepage-blocks-${timestamp}.json`,
  JSON.stringify(
    existing,
    null,
    2,
  ),
);

const now =
  new Date();

function block<T extends CmsBlockType>(
  type: T,
  order: number,
  data: unknown,
): CmsBlock {
  return {
    pageId:
      page.id,

    type,

    order,

    visible:
      true,

    data:
      parseCmsStructuredBlockData(
        type,
        data,
      ),

    createdAt:
      now,

    updatedAt:
      now,
  };
}

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.maps.voice.navigation.traffic.gps.location.route.driving.directions&hl=en_IN";

const blocks: CmsBlock[] = [
  block(
    "hero",
    1,
    {
      schemaVersion: 2,

      eyebrow:
        "GPS Maps • Android",

      title:
        "Navigate smarter. Wherever you go.",

      description:
        "Voice navigation, offline maps, weather intelligence, nearby discovery, live location and practical travel tools in one app.",

      image:
        "",

      primaryCta: {
        label:
          "Get GPS Maps",

        url:
          playStoreUrl,
      },

      secondaryCta: {
        label:
          "Explore the app",

        url:
          "#features",
      },

      badge:
        "Navigation • Weather • Travel",

      presentation: {
        background:
          "default",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "editorial",
      },
    },
  ),

  block(
    "featureGrid",
    2,
    {
      schemaVersion: 2,

      title:
        "One place for the journey.",

      description:
        "The essential navigation and travel features in one simple app.",

      columns:
        3,

      items: [
        [
          "Voice Navigation",
          "Turn-by-turn guidance, destination search and voice-assisted directions.",
        ],

        [
          "Offline Maps",
          "Download supported areas before travelling and keep maps ready without a connection.",
        ],

        [
          "Weather Intelligence",
          "Check forecasts, radar, rain alerts and air-quality information.",
        ],

        [
          "Nearby Explore",
          "Discover restaurants, cafes, fuel, hospitals, parking and useful places.",
        ],

        [
          "Live Location",
          "Share location and stay connected with people you trust.",
        ],

        [
          "Travel Planner",
          "Plan trips around weather conditions and outdoor activity suitability.",
        ],
      ].map(
        (
          [
            title,
            description,
          ],
          index,
        ) => ({
          id:
            `gps-core-${index + 1}`,

          eyebrow:
            "Feature",

          title,

          description,

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
        }),
      ),

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
    },
  ),

  block(
    "imageText",
    3,
    {
      schemaVersion: 2,

      eyebrow:
        "Navigation",

      title:
        "Plan before you move.",

      description:
        "Search destinations, understand the route and follow voice-assisted navigation throughout the journey.",

      image:
        "",

      imagePosition:
        "right",

      cta: {
        label:
          "Voice guidance on",

        url:
          "",
      },

      presentation: {
        background:
          "muted",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "editorial",
      },
    },
  ),

  block(
    "stats",
    4,
    {
      schemaVersion: 2,

      title:
        "Route preview",

      items: [
        {
          id:
            "route-start",

          value:
            "Start",

          label:
            "Madhapur",

          description:
            "",
        },

        {
          id:
            "route-destination",

          value:
            "Destination",

          label:
            "HITEC City",

          description:
            "",
        },

        {
          id:
            "route-eta",

          value:
            "ETA",

          label:
            "18 min",

          description:
            "",
        },

        {
          id:
            "route-distance",

          value:
            "Distance",

          label:
            "7.4 km",

          description:
            "",
        },
      ],

      presentation: {
        background:
          "default",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "minimal",
      },
    },
  ),

  block(
    "stats",
    5,
    {
      schemaVersion: 2,

      title:
        "Navigation steps",

      items: [
        {
          id:
            "step-1",

          value:
            "01",

          label:
            "Destination",

          description:
            "Choose your starting point and destination.",
        },

        {
          id:
            "step-2",

          value:
            "02",

          label:
            "Route",

          description:
            "Review route options and driving information.",
        },

        {
          id:
            "step-3",

          value:
            "03",

          label:
            "Navigate",

          description:
            "Follow voice guidance and useful map tools.",
        },
      ],

      presentation: {
        background:
          "default",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "minimal",
      },
    },
  ),

  block(
    "featureGrid",
    6,
    {
      schemaVersion: 2,

      title:
        "No signal. Still moving.",

      description:
        "Prepare maps before the journey so essential map access remains available when connectivity drops.",

      columns:
        4,

      items: [
        {
          id:
            "offline-local",

          eyebrow:
            "Selected area",

          title:
            "Local region",

          description:
            "Offline ready",

          icon:
            "",

          image:
            "",

          badge:
            "READY",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "offline-state",

          eyebrow:
            "Download",

          title:
            "State / region",

          description:
            "Download regional map coverage.",

          icon:
            "",

          image:
            "",

          badge:
            "DOWNLOAD",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "offline-country",

          eyebrow:
            "Download",

          title:
            "Entire country",

          description:
            "Keep supported country maps available offline.",

          icon:
            "",

          image:
            "",

          badge:
            "DOWNLOAD",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "offline-custom",

          eyebrow:
            "Download",

          title:
            "Custom map area",

          description:
            "Save the specific area you need.",

          icon:
            "",

          image:
            "",

          badge:
            "DOWNLOAD",

          linkLabel:
            "",

          linkUrl:
            "",
        },
      ],

      presentation: {
        background:
          "muted",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "minimal",
      },
    },
  ),

  block(
    "cardGrid",
    7,
    {
      schemaVersion: 2,

      title:
        "Know what's ahead before you step outside.",

      description:
        "Weather, radar, AQI and travel insights help you prepare before every trip.",

      columns:
        4,

      cards: [
        {
          id:
            "weather-current",

          title:
            "30°",

          description:
            "Current conditions, hourly forecasts and rain probability.",

          image:
            "",

          icon:
            "LIVE",

          badge:
            "Weather",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "weather-aqi",

          title:
            "AQI 25",

          description:
            "Air-quality information and health-oriented guidance.",

          image:
            "",

          icon:
            "GOOD",

          badge:
            "Air quality",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "weather-radar",

          title:
            "Radar",

          description:
            "Rain, cloud and temperature layers for changing conditions.",

          image:
            "",

          icon:
            "MAP",

          badge:
            "Weather layers",

          linkLabel:
            "",

          linkUrl:
            "",
        },

        {
          id:
            "weather-travel",

          title:
            "Travel Planner",

          description:
            "Plan cycling, running, hiking and other activities around the forecast.",

          image:
            "",

          icon:
            "PLAN",

          badge:
            "Travel",

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
          "compact",

        alignment:
          "left",

        variant:
          "editorial",
      },
    },
  ),

  block(
    "featureGrid",
    8,
    {
      schemaVersion: 2,

      title:
        "Stay connected. Stay in control.",

      description:
        "Location tools built around the people and places that matter while you move.",

      columns:
        3,

      items: [
        {
          id:
            "safety-live",

          eyebrow:
            "Location",

          title:
            "Live Location Sharing",

          description:
            "Share your live location with people who matter while travelling.",

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
            "safety-circles",

          eyebrow:
            "Location",

          title:
            "Private Circles",

          description:
            "Create private groups for family, friends and trusted people.",

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
            "safety-geofence",

          eyebrow:
            "Location",

          title:
            "Geofencing Alerts",

          description:
            "Use location-aware boundaries and alerts around selected places.",

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
          "contrast",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "minimal",
      },
    },
  ),

  block(
    "cardGrid",
    9,
    {
      schemaVersion: 2,

      title:
        "Useful tools. No clutter.",

      description:
        "Practical tools for everyday navigation and travel.",

      columns:
        3,

      cards: [
        [
          "Parking Manager",
          "Save where you parked and return to your vehicle easily.",
        ],

        [
          "Ride Dashboard",
          "Track speed, distance, ride time and trip information.",
        ],

        [
          "Digital Compass",
          "Stay oriented with a simple digital compass.",
        ],

        [
          "Translator",
          "Translate useful text between languages while travelling.",
        ],

        [
          "Map Styles",
          "Switch between normal, hybrid, terrain and satellite views.",
        ],

        [
          "My Location & Find Address",
          "See your position and quickly find or understand an address.",
        ],
      ].map(
        (
          [
            title,
            description,
          ],
          index,
        ) => ({
          id:
            `gps-tool-${index + 1}`,

          title,

          description,

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
        }),
      ),

      presentation: {
        background:
          "default",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "minimal",
      },
    },
  ),

  block(
    "faq",
    10,
    {
      schemaVersion: 2,

      title:
        "Good to know.",

      description:
        "Quick answers about GPS Maps.",

      items: [
        {
          id:
            "faq-offline",

          question:
            "Can GPS Maps work without internet?",

          answer:
            "Supported regions and selected areas can be downloaded in advance for use when connectivity is limited.",
        },

        {
          id:
            "faq-navigation",

          question:
            "Does GPS Maps support voice navigation?",

          answer:
            "Yes. Voice-assisted navigation helps you follow routes and driving directions while travelling.",
        },

        {
          id:
            "faq-weather",

          question:
            "Does the app include weather, radar and AQI?",

          answer:
            "Yes. GPS Maps includes forecasts, radar-style information and air-quality insights.",
        },

        {
          id:
            "faq-location",

          question:
            "Can I share my live location?",

          answer:
            "Yes. Live-location sharing and private-circle features help you stay connected.",
        },
      ],

      presentation: {
        background:
          "default",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "accordion",
      },
    },
  ),

  block(
    "cta",
    11,
    {
      schemaVersion: 2,

      eyebrow:
        "GPS Maps",

      title:
        "Ready to navigate?",

      description:
        "Navigation, offline maps, weather and location tools for everyday travel.",

      primaryCta: {
        label:
          "Get it on Google Play",

        url:
          playStoreUrl,
      },

      secondaryCta: {
        label:
          "",

        url:
          "",
      },

      image:
        "",

      presentation: {
        background:
          "contrast",

        width:
          "wide",

        spacing:
          "compact",

        alignment:
          "left",

        variant:
          "banner",
      },
    },
  ),
];

console.log("");
console.log("GPS Maps CMS sync");
console.log("-----------------");
console.log(`Database: ${site.databaseName}`);
console.log(`Homepage: ${page.title}`);
console.log(`Current blocks: ${existing.length}`);
console.log(`New blocks: ${blocks.length}`);
console.log("");

if (!apply) {
  console.log(
    "DRY RUN ONLY — no database changes were made.",
  );

  console.log(
    "Run again with --apply after reviewing.",
  );

  process.exit(0);
}

await replaceCmsBlocksForPage(
  page.id,
  blocks,
);

console.log(
  "✓ GPS homepage CMS blocks updated.",
);

console.log(
  `✓ Backup saved in tmp/gps-homepage-blocks-${timestamp}.json`,
);

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
