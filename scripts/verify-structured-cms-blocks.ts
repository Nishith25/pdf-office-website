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
  verifyStructuredCmsBlockRecords,
} from "../lib/cms/migration/structured-blocks";

const rawUri =
  process.env.MONGODB_URI;

const databaseName =
  process.env.MONGODB_DB ||
  "pdf_office_website";

if (!rawUri) {
  throw new Error(
    "MONGODB_URI is missing.",
  );
}

const uri:
  string =
  rawUri;

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

    const documents =
      await database
        .collection(
          CMS_COLLECTIONS.blocks,
        )
        .find({})
        .toArray();

    const result =
      verifyStructuredCmsBlockRecords(
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
        ),
      );

    console.log(
      `Database: ${databaseName}`,
    );

    console.log(
      `Blocks checked: ${documents.length}`,
    );

    if (
      !result.valid
    ) {
      console.error(
        `Invalid structured block IDs: ${result.invalidIds.join(", ")}`,
      );

      process.exitCode =
        1;

      return;
    }

    console.log(
      "Structured CMS block verification passed.",
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
      "Structured CMS block verification failed:",
      error,
    );

    process.exitCode =
      1;
  },
);