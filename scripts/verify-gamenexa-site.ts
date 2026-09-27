import {
  MongoClient,
  ObjectId,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  isCmsStructuredBlockData,
} from "../lib/cms/core/block-data-schemas";

import {
  cmsBlockSchema,
  cmsMenuSchema,
  cmsPageSchema,
  cmsSettingsSchema,
} from "../lib/cms/core/schemas";

import {
  getSiteConfig,
} from "../lib/site/config";

const uri =
  process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing.",
  );
}

const site =
  getSiteConfig();

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

    const homepageDocuments =
      await database
        .collection(
          CMS_COLLECTIONS.pages,
        )
        .find({
          isHomepage:
            true,
        })
        .toArray();

    if (
      homepageDocuments.length !==
      1
    ) {
      throw new Error(
        `Expected exactly one homepage, found ${homepageDocuments.length}.`,
      );
    }

    const homepageDocument =
      homepageDocuments[0];

    const homepage =
      cmsPageSchema.parse(
        homepageDocument,
      );

    if (
      homepage.status !==
      "published"
    ) {
      throw new Error(
        "Homepage is not published.",
      );
    }

    const homepageId =
      homepageDocument
        ._id
        .toString();

    const blockDocuments =
      await database
        .collection(
          CMS_COLLECTIONS.blocks,
        )
        .find({
          pageId:
            homepageId,
        })
        .toArray();

    if (
      blockDocuments.length ===
      0
    ) {
      throw new Error(
        "Homepage contains no blocks.",
      );
    }

    for (
      const document of
      blockDocuments
    ) {
      const block =
        cmsBlockSchema.parse(
          document,
        );

      if (
        !isCmsStructuredBlockData(
          block.type,
          block.data,
        )
      ) {
        throw new Error(
          `Block ${document._id.toString()} is not V2 structured data.`,
        );
      }
    }

    const settingsDocument =
      await database
        .collection(
          CMS_COLLECTIONS.settings,
        )
        .findOne({
          key:
            "global",
        });

    if (!settingsDocument) {
      throw new Error(
        "Global CMS settings are missing.",
      );
    }

    const settings =
      cmsSettingsSchema.parse(
        settingsDocument,
      );

    for (
      const menuId of [
        settings.footer
          .headerMenuId,

        settings.footer
          .footerMenuId,
      ]
    ) {
      if (
        !ObjectId.isValid(
          menuId,
        )
      ) {
        throw new Error(
          "CMS settings contain an invalid menu ID.",
        );
      }

      const document =
        await database
          .collection(
            CMS_COLLECTIONS.menus,
          )
          .findOne({
            _id:
              new ObjectId(
                menuId,
              ),
          });

      if (!document) {
        throw new Error(
          `Menu ${menuId} does not exist.`,
        );
      }

      cmsMenuSchema.parse(
        document,
      );
    }

    const admin =
      await database
        .collection(
          "admin",
        )
        .findOne({
          key:
            "primary",
        });

    if (!admin) {
      throw new Error(
        "Primary administrator is missing.",
      );
    }

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
      `Structured blocks: ${blockDocuments.length}`,
    );

    console.log(
      "Header/footer menus: valid",
    );

    console.log(
      "Global settings: valid",
    );

    console.log(
      "Primary admin: present",
    );

    console.log(
      "GAMENEXA site verification passed.",
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
      "GAMENEXA site verification failed:",
      error,
    );

    process.exitCode =
      1;
  },
);
