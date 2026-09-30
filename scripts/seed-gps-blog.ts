import {
  getSiteConfig,
} from "../lib/site/config";

import {
  cmsBlogPostSchema,
} from "../lib/cms/core/schemas";

import {
  getCmsBlogPostBySlug,
  insertCmsBlogPost,
} from "../lib/repositories/cms-blog";

const site =
  getSiteConfig();

const PRODUCTION_URL =
  "https://gps-maps-website.vercel.app";

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

const articles = [
  {
    title:
      "Plan Routes Before You Travel",

    slug:
      "plan-routes-before-you-travel",

    category:
      "Navigation",

    excerpt:
      "A few minutes of route planning can make everyday travel clearer, smoother and easier to manage.",

    body:
`Good navigation starts before the journey begins. Taking a moment to check your route can help you understand where you are going and what to expect along the way.

## Check the route first

Review the route before leaving so you understand the general direction and destination.

## Keep your destination clear

Confirm the destination before starting the journey, especially when several places have similar names.

## Use the tools that fit the trip

GPS Maps combines route planning with location and travel tools so useful information stays close when you need it.

- Review your destination
- Plan the route
- Check nearby places
- Keep useful travel tools available

A simple route check before leaving can make the rest of the journey easier to follow.`,

    seoDescription:
      "Simple route planning tips for clearer everyday travel with GPS Maps.",

    keywords: [
      "route planning",
      "GPS navigation",
      "GPS Maps",
      "navigation tips",
    ],
  },

  {
    title:
      "Using Offline Maps When Connectivity Drops",

    slug:
      "offline-maps-when-connectivity-drops",

    category:
      "Travel",

    excerpt:
      "Offline maps can help you keep useful location information available when mobile connectivity becomes unreliable.",

    body:
`Mobile connectivity is not equally reliable everywhere. Preparing map access before travelling can be useful when your connection becomes weak or unavailable.

## Prepare before the journey

If you expect limited connectivity, prepare the map information you may need before leaving a reliable connection.

## Know the area

A map can help you understand nearby roads, places and the general layout of an unfamiliar area.

## Keep offline access as a backup

Offline map tools are most useful as part of a prepared travel plan.

- Prepare useful map information
- Check the destination beforehand
- Keep important addresses available
- Use offline access when connectivity is limited

Planning ahead helps keep useful location information available when network conditions change.`,

    seoDescription:
      "Learn how offline maps can help when mobile connectivity becomes limited during travel.",

    keywords: [
      "offline maps",
      "GPS Maps",
      "travel maps",
      "navigation",
    ],
  },

  {
    title:
      "Share Your Location When It Matters",

    slug:
      "share-your-location-when-it-matters",

    category:
      "Location",

    excerpt:
      "Live location sharing can make it easier to stay connected with family and friends during everyday travel.",

    body:
`Location sharing can be useful when you want another person to understand where you are during a journey.

## Share intentionally

Choose the people you want to share your location with and use sharing when it is useful for the situation.

## Useful during travel

Location sharing can help when meeting someone, coordinating a journey or keeping selected people informed.

## Keep control of sharing

Location information should be shared deliberately and only with people you choose.

- Choose who receives your location
- Share when it is useful
- Review location sharing when plans change
- Keep privacy in mind

GPS Maps brings location sharing together with navigation and other everyday travel tools.`,

    seoDescription:
      "Understand how live location sharing can help you stay connected during everyday travel.",

    keywords: [
      "live location sharing",
      "GPS Maps",
      "location sharing",
      "travel",
    ],
  },
];

async function main() {
  console.log("");
  console.log(
    "========================================",
  );

  console.log(
    "GPS Maps Blog Starter Seed",
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

  console.log("");

  const pending = [];

  for (
    const article
    of articles
  ) {
    const existing =
      await getCmsBlogPostBySlug(
        article.slug,
      );

    if (existing) {
      console.log(
        `SKIP: ${article.slug} already exists`,
      );

      continue;
    }

    console.log(
      `NEW: ${article.slug}`,
    );

    pending.push(
      article,
    );
  }

  console.log("");
  console.log(
    `New articles: ${pending.length}`,
  );

  if (!apply) {
    console.log("");
    console.log(
      "DRY RUN — no database writes performed.",
    );

    return;
  }

  if (
    process.env
      .GPS_BLOG_SEED_CONFIRM !==
    "SEED_GPS_BLOG_STARTERS"
  ) {
    throw new Error(
      'GPS_BLOG_SEED_CONFIRM must equal "SEED_GPS_BLOG_STARTERS".',
    );
  }

  for (
    const article
    of pending
  ) {
    const now =
      new Date();

    const post =
      cmsBlogPostSchema.parse({
        title:
          article.title,

        slug:
          article.slug,

        status:
          "published",

        category:
          article.category,

        author:
          "GPS Maps Team",

        excerpt:
          article.excerpt,

        body:
          article.body,

        coverImage:
          "",

        featured:
          false,

        seo: {
          title:
            article.title,

          description:
            article.seoDescription,

          keywords:
            article.keywords,

          canonicalUrl:
            `${PRODUCTION_URL}/blog/${article.slug}`,

          ogTitle:
            article.title,

          ogDescription:
            article.seoDescription,

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

    await insertCmsBlogPost(
      post,
    );

    console.log(
      `CREATED: ${article.slug}`,
    );
  }

  console.log("");
  console.log(
    "GPS Maps starter articles created.",
  );
}

main().catch(
  (
    error,
  ) => {
    console.error(
      "Blog seed failed:",
      error,
    );

    process.exitCode =
      1;
  },
);
