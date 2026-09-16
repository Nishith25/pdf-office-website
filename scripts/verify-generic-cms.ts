import {
  MongoClient,
  ObjectId,
  type Db,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  cmsBlockSchema,
  cmsMenuSchema,
  cmsPageSchema,
  cmsSettingsSchema,
} from "../lib/cms/core/schemas";

import {
  verifyGenericCmsState,
} from "../lib/cms/migration/verification";

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

async function verifyLegacyCollectionsReadable(
  database:
    Db,
): Promise<boolean> {
  const legacyCollections = [
    "site_content",
    "site_pages",
    "site_sections",
    "tools",
    "faqs",
    "site_settings",
    "media",
    "activity_log",
  ];

  try {
    for (
      const collectionName of
      legacyCollections
    ) {
      /*
       * findOne is intentionally
       * read-only. MongoDB also
       * safely returns null when a
       * collection contains no
       * documents.
       */
      await database
        .collection(
          collectionName,
        )
        .findOne({});
    }

    return true;
  } catch {
    return false;
  }
}

async function verifyMenuPageReferences(
  database:
    Db,

  menuDocuments:
    Array<{
      _id:
        ObjectId;

      [
        key:
          string
      ]:
        unknown;
    }>,
): Promise<{
  invalidPageReferences:
    string[];

  draftPageReferences:
    string[];
}> {
  const invalidPageReferences:
    string[] = [];

  const draftPageReferences:
    string[] = [];

  for (
    const document of
    menuDocuments
  ) {
    const menu =
      cmsMenuSchema.parse(
        document,
      );

    for (
      const item of
      menu.items
    ) {
      if (
        item.type !==
          "page" ||
        !item.pageId
      ) {
        continue;
      }

      if (
        !ObjectId.isValid(
          item.pageId,
        )
      ) {
        invalidPageReferences.push(
          item.pageId,
        );

        continue;
      }

      const pageDocument =
        await database
          .collection(
            CMS_COLLECTIONS.pages,
          )
          .findOne({
            _id:
              new ObjectId(
                item.pageId,
              ),
          });

      if (!pageDocument) {
        invalidPageReferences.push(
          item.pageId,
        );

        continue;
      }

      const page =
        cmsPageSchema.parse(
          pageDocument,
        );

      if (
        page.status !==
        "published"
      ) {
        draftPageReferences.push(
          item.pageId,
        );
      }
    }
  }

  return {
    invalidPageReferences,

    draftPageReferences,
  };
}

async function verify() {
  const client =
    new MongoClient(
      uri,
    );

  try {
    await client.connect();

    console.log(
      "Connected to MongoDB.",
    );

    console.log(
      `Database: ${databaseName}`,
    );

    const database =
      client.db(
        databaseName,
      );

    const pagesCollection =
      database.collection(
        CMS_COLLECTIONS.pages,
      );

    const homepageCount =
      await pagesCollection.countDocuments({
        isHomepage:
          true,
      });

    const homepageDocument =
      await pagesCollection.findOne({
        isHomepage:
          true,
      });

    const homepage =
      homepageDocument
        ? {
            id:
              homepageDocument
                ._id
                .toString(),

            status:
              cmsPageSchema.parse(
                homepageDocument,
              ).status,
          }
        : null;

    const blockDocuments =
      homepage
        ? await database
            .collection(
              CMS_COLLECTIONS.blocks,
            )
            .find({
              pageId:
                homepage.id,
            })
            .sort({
              order:
                1,
            })
            .toArray()
        : [];

    const blocks =
      blockDocuments.map(
        (
          document,
        ) => {
          const parsed =
            cmsBlockSchema.parse(
              document,
            );

          return {
            pageId:
              parsed.pageId,

            order:
              parsed.order,
          };
        },
      );

    const settingsDocument =
      await database
        .collection(
          CMS_COLLECTIONS.settings,
        )
        .findOne({
          key:
            "global",
        });

    const settings =
      settingsDocument
        ? cmsSettingsSchema.parse(
            settingsDocument,
          )
        : null;

    let headerMenuDocument:
      | {
          _id:
            ObjectId;

          [
            key:
              string
          ]:
            unknown;
        }
      | null =
        null;

    let footerMenuDocument:
      | {
          _id:
            ObjectId;

          [
            key:
              string
          ]:
            unknown;
        }
      | null =
        null;

    const headerMenuId =
      settings?.footer
        .headerMenuId ??
      "";

    const footerMenuId =
      settings?.footer
        .footerMenuId ??
      "";

    if (
      headerMenuId &&
      ObjectId.isValid(
        headerMenuId,
      )
    ) {
      headerMenuDocument =
        (await database
          .collection(
            CMS_COLLECTIONS.menus,
          )
          .findOne({
            _id:
              new ObjectId(
                headerMenuId,
              ),
          })) as typeof headerMenuDocument;
    }

    if (
      footerMenuId &&
      ObjectId.isValid(
        footerMenuId,
      )
    ) {
      footerMenuDocument =
        (await database
          .collection(
            CMS_COLLECTIONS.menus,
          )
          .findOne({
            _id:
              new ObjectId(
                footerMenuId,
              ),
          })) as typeof footerMenuDocument;
    }

    if (
      headerMenuDocument
    ) {
      cmsMenuSchema.parse(
        headerMenuDocument,
      );
    }

    if (
      footerMenuDocument
    ) {
      cmsMenuSchema.parse(
        footerMenuDocument,
      );
    }

    const menuDocuments =
      [
        headerMenuDocument,
        footerMenuDocument,
      ].filter(
        (
          document,
        ): document is NonNullable<
          typeof document
        > =>
          document !==
          null,
      );

    const {
      invalidPageReferences,
      draftPageReferences,
    } =
      await verifyMenuPageReferences(
        database,
        menuDocuments,
      );

    const legacyCollectionsReadable =
      await verifyLegacyCollectionsReadable(
        database,
      );

    const result =
      verifyGenericCmsState({
        homepageCount,

        homepage,

        blocks,

        settingsPresent:
          settings !==
          null,

        headerMenuPresent:
          headerMenuDocument !==
          null,

        footerMenuPresent:
          footerMenuDocument !==
          null,

        invalidPageReferences,

        draftPageReferences,

        legacyCollectionsReadable,
      });

    console.log("");
    console.log(
      "========================================",
    );

    console.log(
      "Generic CMS Verification",
    );

    console.log(
      "========================================",
    );

    if (
      homepage &&
      homepage.status ===
        "published"
    ) {
      const pageDocument =
        await pagesCollection.findOne({
          _id:
            new ObjectId(
              homepage.id,
            ),
        });

      const parsedPage =
        pageDocument
          ? cmsPageSchema.parse(
              pageDocument,
            )
          : null;

      console.log(
        `✓ Published homepage: ${
          parsedPage?.title ??
          homepage.id
        } (/)`,
      );
    }

    if (
      blocks.length >
      0
    ) {
      console.log(
        `✓ Blocks: ${blocks.length}`,
      );
    }

    if (
      headerMenuDocument
    ) {
      const menu =
        cmsMenuSchema.parse(
          headerMenuDocument,
        );

      console.log(
        `✓ Header menu: ${menu.items.length} items`,
      );
    }

    if (
      footerMenuDocument
    ) {
      const menu =
        cmsMenuSchema.parse(
          footerMenuDocument,
        );

      console.log(
        `✓ Footer menu: ${menu.items.length} items`,
      );
    }

    if (settings) {
      console.log(
        "✓ Global settings valid",
      );
    }

    if (
      legacyCollectionsReadable
    ) {
      console.log(
        "✓ Legacy collections preserved/readable",
      );
    }

    if (
      invalidPageReferences.length ===
        0 &&
      draftPageReferences.length ===
        0
    ) {
      console.log(
        "✓ Menu page references valid",
      );
    }

    if (!result.valid) {
      console.log("");
      console.error(
        "Generic CMS verification failed:",
      );

      for (
        const error of
        result.errors
      ) {
        console.error(
          `✗ ${error}`,
        );
      }

      process.exitCode =
        1;

      return;
    }

    console.log("");
    console.log(
      "Generic CMS verification passed.",
    );
  } finally {
    await client.close();

    console.log(
      "MongoDB connection closed.",
    );
  }
}

verify().catch(
  (
    error,
  ) => {
    console.error(
      "Generic CMS verification failed:",
      error,
    );

    process.exitCode =
      1;
  },
);