import {
  MongoClient,
} from "mongodb";

import {
  siteData,
} from "../data/site";

const rawUri =
  process.env.MONGODB_URI;

if (!rawUri) {
  throw new Error(
    "MONGODB_URI is missing",
  );
}

/*
 * After validation, explicitly
 * store it as a string so
 * TypeScript knows it can never
 * be undefined inside seed().
 */
const uri: string = rawUri;

const databaseName =
  process.env.MONGODB_DB ||
  "pdf_office_website";

async function seed() {
  const client =
    new MongoClient(uri);

  try {
    await client.connect();

    console.log(
      "Connected to MongoDB",
    );

    const database =
      client.db(
        databaseName,
      );

    const collection =
      database.collection(
        "site_content",
      );

    const result =
      await collection.updateOne(
        {
          key: "homepage",
        },
        {
          $set: {
            ...siteData,
            key: "homepage",
            updatedAt:
              new Date(),
          },
        },
        {
          upsert: true,
        },
      );

    if (
      result.upsertedCount >
      0
    ) {
      console.log(
        "Homepage document created.",
      );
    } else {
      console.log(
        "Homepage document updated.",
      );
    }
  } finally {
    await client.close();
  }
}

seed().catch(
  (error) => {
    console.error(
      "Seed failed:",
      error,
    );

    process.exit(1);
  },
);