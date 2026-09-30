import {
  MongoClient,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  getSiteConfig,
} from "../lib/site/config";

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
    `REFUSED: expected gps-maps / gps_maps_website, received ${site.key} / ${site.databaseName}.`,
  );
}

const expectedUrl =
  "https://gps-maps-website.vercel.app";

if (
  site.siteUrl !==
  expectedUrl
) {
  throw new Error(
    `REFUSED: SITE_URL must be ${expectedUrl}.`,
  );
}

const apply =
  process.argv.includes(
    "--apply",
  );

const seo = {
  title:
    "GPS Maps – Earth Maps, Route Planning & Location Tools",

  description:
    "Explore places, plan routes and understand locations with GPS Maps, a clear mobile-friendly map and navigation experience.",

  keywords: [
    "GPS Maps",
    "earth maps",
    "route planning",
    "navigation",
    "location tools",
    "place search",
    "map exploration",
  ],

  canonicalUrl:
    expectedUrl,

  ogTitle:
    "GPS Maps – Explore Places & Plan Routes",

  ogDescription:
    "Explore maps, find places, plan routes and discover useful location tools with GPS Maps.",

  noIndex:
    false,
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

    const settings =
      await database
        .collection(
          CMS_COLLECTIONS.settings,
        )
        .findOne({
          key:
            "global",
        });

    const header =
      await database
        .collection(
          CMS_COLLECTIONS.menus,
        )
        .findOne({
          key:
            "header",
        });

    const footer =
      await database
        .collection(
          CMS_COLLECTIONS.menus,
        )
        .findOne({
          key:
            "footer",
        });

    if (
      !homepage ||
      !settings ||
      !header ||
      !footer
    ) {
      throw new Error(
        "GPS CMS core records are incomplete.",
      );
    }

    const pageId =
      homepage
        ._id
        .toString();

    const menuItems = [
      {
        id:
          "nav-home",

        label:
          "Home",

        type:
          "page",

        pageId,

        customUrl:
          "",

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
          "nav-explore",

        label:
          "Explore",

        type:
          "custom",

        pageId:
          null,

        customUrl:
          "/#explore",

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
          "nav-tools",

        label:
          "Location Tools",

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
          3,

        enabled:
          true,
      },

      {
        id:
          "nav-faq",

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

    console.log("");
    console.log(
      "========================================",
    );

    console.log(
      "GPS Maps Final Submission",
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
      `Homepage: ${homepage.title}`,
    );

    console.log(
      `Canonical: ${seo.canonicalUrl}`,
    );

    console.log(
      "Navigation: Home / Explore / Location Tools / FAQ",
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
        'GPS_FINALIZE_CONFIRM must exactly equal "FINALIZE_GPS_SUBMISSION".',
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
            "identity.faviconUrl":
              `${expectedUrl}/gps-maps-icon.svg`,

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
              menuItems,

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
              menuItems,

            updatedAt:
              now,
          },
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.blocks,
      )
      .updateOne(
        {
          pageId,

          type:
            "hero",
        },
        {
          $set: {
            "data.primaryCta.url":
              "/#explore",

            "data.secondaryCta.url":
              "/#tools",

            updatedAt:
              now,
          },
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.blocks,
      )
      .updateOne(
        {
          pageId,

          type:
            "cta",
        },
        {
          $set: {
            "data.primaryCta.url":
              "/#explore",

            updatedAt:
              now,
          },
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.activity,
      )
      .insertOne({
        action:
          "Finalized GPS Maps submission configuration",

        entityType:
          "system",

        entityId:
          pageId,

        entityName:
          "GPS Maps",

        createdAt:
          now,
      });

    console.log("");
    console.log(
      "✓ SEO metadata finalized",
    );

    console.log(
      "✓ Header/footer navigation finalized",
    );

    console.log(
      "✓ Homepage CTA links finalized",
    );

    console.log(
      "✓ GPS favicon configured",
    );

    console.log("");
    console.log(
      "GPS Maps submission configuration completed.",
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
