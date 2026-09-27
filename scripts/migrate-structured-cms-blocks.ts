import {
  getSiteConfig,
} from "../lib/site/config";

import {
  MongoClient,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  cmsBlockSchema,
} from "../lib/cms/core/schemas";

import {
  parseGenericCmsMigrationCliArgs,
} from "../lib/cms/migration/cli";

import {
  buildStructuredCmsBlockMigrationPlan,
  verifyStructuredCmsBlockRecords,
} from "../lib/cms/migration/structured-blocks";

const rawUri =
  process.env.MONGODB_URI;

const databaseName =
  getSiteConfig()
    .databaseName;

if (!rawUri) {
  throw new Error(
    "MONGODB_URI is missing.",
  );
}

const uri:
  string =
  rawUri;

const options =
  parseGenericCmsMigrationCliArgs(
    process.argv.slice(
      2,
    ),
  );

async function main() {
  const client =
    new MongoClient(
      uri,
    );

  try {
    await client.connect();

    const database =
      client.db(
        databaseName,
      );

    const collection =
      database.collection(
        CMS_COLLECTIONS.blocks,
      );

    const documents =
      await collection
        .find({})
        .sort({
          pageId:
            1,

          order:
            1,
        })
        .toArray();

    const idsByString =
      new Map(
        documents.map(
          (
            document,
          ) => [
            document._id.toString(),
            document._id,
          ],
        ),
      );

    const records =
      documents.map(
        (
          document,
        ) => {
          const block =
            cmsBlockSchema.parse(
              document,
            );

          return {
            id:
              document._id.toString(),

            type:
              block.type,

            data:
              block.data,
          };
        },
      );

    const plan =
      buildStructuredCmsBlockMigrationPlan(
        records,
      );

    console.log(
      "Structured CMS Block Migration",
    );

    console.log(
      `Database: ${databaseName}`,
    );

    console.log(
      `Total blocks: ${plan.totalCount}`,
    );

    console.log(
      `Need migration: ${plan.changedCount}`,
    );

    console.log(
      `Already structured: ${plan.alreadyStructuredCount}`,
    );

    const counts =
      new Map<
        string,
        number
      >();

    for (
      const entry of
      plan.entries
    ) {
      if (
        !entry.changed
      ) {
        continue;
      }

      counts.set(
        entry.type,
        (
          counts.get(
            entry.type,
          ) ??
          0
        ) +
          1,
      );
    }

    for (
      const [
        type,
        count,
      ] of counts
    ) {
      console.log(
        `  ${type}: ${count}`,
      );
    }

    if (
      !options.apply
    ) {
      console.log(
        "DRY RUN — no database writes performed.",
      );

      return;
    }

    const now =
      new Date();

    for (
      const entry of
      plan.entries
    ) {
      if (
        !entry.changed
      ) {
        continue;
      }

      const objectId =
        idsByString.get(
          entry.id,
        );

      if (!objectId) {
        throw new Error(
          `Missing MongoDB block ID: ${entry.id}`,
        );
      }

      await collection.updateOne(
        {
          _id:
            objectId,
        },

        {
          $set: {
            data:
              entry.after,

            updatedAt:
              now,
          },
        },
      );
    }

    const updatedDocuments =
      await collection
        .find({})
        .toArray();

    const verification =
      verifyStructuredCmsBlockRecords(
        updatedDocuments.map(
          (
            document,
          ) => {
            const block =
              cmsBlockSchema.parse(
                document,
              );

            return {
              id:
                document._id.toString(),

              type:
                block.type,

              data:
                block.data,
            };
          },
        ),
      );

    if (
      !verification.valid
    ) {
      throw new Error(
        `Structured block verification failed for: ${verification.invalidIds.join(", ")}`,
      );
    }

    console.log(
      `Applied ${plan.changedCount} structured block migrations.`,
    );

    console.log(
      "Structured block verification passed.",
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
      "Structured CMS block migration failed:",
      error,
    );

    process.exitCode =
      1;
  },
);