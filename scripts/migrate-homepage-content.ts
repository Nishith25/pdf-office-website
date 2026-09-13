import {
  MongoClient,
} from "mongodb";

import type {
  SiteData,
} from "../data/site";

import {
  mapLegacyHomepageToCms,
} from "../lib/cms/migration";

const rawUri =
  process.env.MONGODB_URI;

const databaseName =
  process.env.MONGODB_DB ||
  "pdf_office_website";

if (!rawUri) {
  throw new Error(
    "MONGODB_URI is missing",
  );
}

const uri: string =
  rawUri;

async function migrate() {
  const client =
    new MongoClient(
      uri,
    );

  try {
    await client.connect();

    console.log(
      "Connected to MongoDB",
    );

    const database =
      client.db(
        databaseName,
      );

    /*
     * Read the existing live
     * homepage document.
     *
     * We intentionally DO NOT
     * delete or modify this
     * document during migration.
     */
    const legacyDocument =
      await database
        .collection(
          "site_content",
        )
        .findOne({
          key: "homepage",
        });

    if (!legacyDocument) {
      throw new Error(
        "Legacy homepage document was not found",
      );
    }

    const {
      brand,
      navigation,
      hero,
      stats,
      onboarding,
      tools,
      faq,
    } = legacyDocument;

    if (
      !brand ||
      !navigation ||
      !hero ||
      !stats ||
      !onboarding ||
      !tools ||
      !faq
    ) {
      throw new Error(
        "Legacy homepage document is incomplete",
      );
    }

    const legacy: SiteData =
      {
        brand,
        navigation,
        hero,
        stats,
        onboarding,
        tools,
        faq,
      } as SiteData;

    const mapped =
      mapLegacyHomepageToCms(
        legacy,
      );

    /*
     * PAGE
     */
    await database
      .collection(
        "site_pages",
      )
      .updateOne(
        {
          slug: "home",
        },
        {
          $set: {
            ...mapped.page,

            updatedAt:
              new Date(),
          },
        },
        {
          upsert: true,
        },
      );

    console.log(
      "Home page migrated.",
    );

    /*
     * SETTINGS
     */
    await database
      .collection(
        "site_settings",
      )
      .updateOne(
        {
          key: "global",
        },
        {
          $set: {
            ...mapped.settings,

            key: "global",

            updatedAt:
              new Date(),
          },
        },
        {
          upsert: true,
        },
      );

    console.log(
      "Site settings migrated.",
    );

    /*
     * SECTIONS
     */
    for (
      const section of
      mapped.sections
    ) {
      await database
        .collection(
          "site_sections",
        )
        .updateOne(
          {
            key:
              section.key,
          },
          {
            $set: {
              ...section,

              updatedAt:
                new Date(),
            },
          },
          {
            upsert: true,
          },
        );
    }

    console.log(
      `${mapped.sections.length} sections migrated.`,
    );

    /*
     * TOOLS
     */
    for (
      const tool of
      mapped.tools
    ) {
      await database
        .collection(
          "tools",
        )
        .updateOne(
          {
            type:
              tool.type,
          },
          {
            $set: {
              ...tool,

              updatedAt:
                new Date(),
            },
          },
          {
            upsert: true,
          },
        );
    }

    console.log(
      `${mapped.tools.length} tools migrated.`,
    );

    /*
     * FAQ
     *
     * migrationKey gives every
     * original FAQ a stable key,
     * so running this migration
     * twice does not duplicate
     * records.
     */
    for (
      const [
        index,
        faq,
      ] of mapped.faqs.entries()
    ) {
      const migrationKey =
        `faq-${index + 1}`;

      await database
        .collection(
          "faqs",
        )
        .updateOne(
          {
            migrationKey,
          },
          {
            $set: {
              ...faq,

              migrationKey,

              updatedAt:
                new Date(),
            },

            $setOnInsert: {
              createdAt:
                new Date(),
            },
          },
          {
            upsert: true,
          },
        );
    }

    console.log(
      `${mapped.faqs.length} FAQs migrated.`,
    );

    console.log("");
    console.log(
      "Migration completed successfully.",
    );

    console.log(
      "Legacy site_content/homepage was preserved.",
    );
  } finally {
    await client.close();

    console.log(
      "MongoDB connection closed.",
    );
  }
}

migrate().catch(
  (error) => {
    console.error(
      "Migration failed:",
      error,
    );

    process.exit(1);
  },
);