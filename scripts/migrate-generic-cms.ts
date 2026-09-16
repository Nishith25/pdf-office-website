import {
  MongoClient,
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
  parseGenericCmsMigrationCliArgs,
} from "../lib/cms/migration/cli";

import {
  buildGenericCmsMigration,
} from "../lib/cms/migration/generic-homepage";

import {
  resolveGenericCmsMigrationReferences,
} from "../lib/cms/migration/persistence";

import type {
  GenericCmsMigrationPayload,
  LegacyCmsMigrationSnapshot,
} from "../lib/cms/migration/types";

import {
  faqSchema,
  sitePageSchema,
  siteSectionSchema,
  siteSettingsSchema,
  toolSchema,
} from "../lib/cms/schemas";

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

const options =
  parseGenericCmsMigrationCliArgs(
    process.argv.slice(
      2,
    ),
  );

async function readLegacySnapshot(
  database:
    Db,
): Promise<
  LegacyCmsMigrationSnapshot
> {
  const [
    pageDocument,
    settingsDocument,
    sectionDocuments,
    toolDocuments,
    faqDocuments,
  ] =
    await Promise.all([
      database
        .collection(
          "site_pages",
        )
        .findOne({
          slug:
            "home",
        }),

      database
        .collection(
          "site_settings",
        )
        .findOne({
          key:
            "global",
        }),

      database
        .collection(
          "site_sections",
        )
        .find({})
        .sort({
          order:
            1,
        })
        .toArray(),

      database
        .collection(
          "tools",
        )
        .find({})
        .sort({
          order:
            1,
        })
        .toArray(),

      database
        .collection(
          "faqs",
        )
        .find({})
        .sort({
          order:
            1,
        })
        .toArray(),
    ]);

  if (!pageDocument) {
    throw new Error(
      "Legacy site_pages/home page was not found.",
    );
  }

  if (!settingsDocument) {
    throw new Error(
      "Legacy site_settings/global document was not found.",
    );
  }

  const page =
    sitePageSchema.parse(
      pageDocument,
    );

  const settings =
    siteSettingsSchema.parse(
      settingsDocument,
    );

  const sections =
    sectionDocuments.map(
      (
        document,
      ) =>
        siteSectionSchema.parse(
          document,
        ),
    );

  const tools =
    toolDocuments.map(
      (
        document,
      ) =>
        toolSchema.parse(
          document,
        ),
    );

  const faqs =
    faqDocuments.map(
      (
        document,
      ) =>
        faqSchema.parse(
          document,
        ),
    );

  return {
    page,

    settings,

    sections,

    tools,

    faqs,
  };
}

function printMigrationSummary(
  legacy:
    LegacyCmsMigrationSnapshot,

  migration:
    GenericCmsMigrationPayload,
): void {
  console.log("");
  console.log(
    "========================================",
  );

  console.log(
    "Generic CMS Migration",
  );

  console.log(
    "========================================",
  );

  console.log(
    `Database: ${databaseName}`,
  );

  console.log("");

  console.log(
    "Legacy source:",
  );

  console.log(
    `  Sections: ${legacy.sections.length}`,
  );

  console.log(
    `  Tools: ${legacy.tools.length}`,
  );

  console.log(
    `  FAQs: ${legacy.faqs.length}`,
  );

  console.log("");

  console.log(
    "Generic target:",
  );

  console.log(
    `  Page: ${migration.page.title}`,
  );

  console.log(
    `  Slug: ${migration.page.slug}`,
  );

  console.log(
    `  Status: ${migration.page.status}`,
  );

  console.log(
    `  Homepage: ${migration.page.isHomepage ? "yes" : "no"}`,
  );

  console.log(
    `  Site name: ${migration.settings.identity.siteName}`,
  );

  console.log(
    `  Blocks: ${migration.blocks.length}`,
  );

  for (
    const block of
    migration.blocks
  ) {
    console.log(
      `    ${block.order}. ${block.type}`,
    );
  }

  console.log("");

  console.log(
    "Menus:",
  );

  for (
    const seed of
    migration.menus
  ) {
    const labels =
      seed.menu.items
        .map(
          (
            item,
          ) =>
            item.label,
        )
        .join(
          ", ",
        );

    console.log(
      `  ${seed.key}: ${labels || "(empty)"}`,
    );
  }

  console.log("");
}

async function writeHomepage(
  database:
    Db,

  migration:
    GenericCmsMigrationPayload,

  now:
    Date,
): Promise<string> {
  const collection =
    database.collection(
      CMS_COLLECTIONS.pages,
    );

  const existingDocument =
    await collection.findOne({
      slug:
        migration.page.slug,
    });

  const existing =
    existingDocument
      ? cmsPageSchema.parse(
          existingDocument,
        )
      : null;

  /*
   * Preserve creation and
   * publication timestamps on
   * repeat migrations.
   */
  const page =
    cmsPageSchema.parse({
      ...migration.page,

      isHomepage:
        false,

      createdAt:
        existing?.createdAt ??
        migration.page
          .createdAt,

      publishedAt:
        existing?.publishedAt ??
        migration.page
          .publishedAt,

      updatedAt:
        now,
    });

  /*
   * First persist with
   * isHomepage false.
   *
   * This prevents a unique
   * homepage-index conflict when
   * another page is currently
   * marked as homepage.
   */
  await collection.updateOne(
    {
      slug:
        migration.page.slug,
    },

    {
      $set:
        page,
    },

    {
      upsert:
        true,
    },
  );

  const persistedDocument =
    await collection.findOne({
      slug:
        migration.page.slug,
    });

  if (!persistedDocument) {
    throw new Error(
      "Unable to persist the generic CMS homepage.",
    );
  }

  const homepagePageId =
    persistedDocument._id.toString();

  /*
   * Demote any previous homepage.
   * No other pages are deleted.
   */
  await collection.updateMany(
    {
      isHomepage:
        true,

      _id: {
        $ne:
          persistedDocument._id,
      },
    },

    {
      $set: {
        isHomepage:
          false,

        updatedAt:
          now,
      },
    },
  );

  const finalPage =
    cmsPageSchema.parse({
      ...page,

      isHomepage:
        true,

      status:
        "published",

      updatedAt:
        now,
    });

  await collection.updateOne(
    {
      _id:
        persistedDocument._id,
    },

    {
      $set:
        finalPage,
    },
  );

  return homepagePageId;
}

async function writeBlocks(
  database:
    Db,

  migration:
    GenericCmsMigrationPayload,
): Promise<void> {
  const collection =
    database.collection(
      CMS_COLLECTIONS.blocks,
    );

  const pageId =
    migration.blocks[0]
      ?.pageId;

  if (!pageId) {
    throw new Error(
      "Generic migration contains no homepage block page ID.",
    );
  }

  const blocks =
    migration.blocks.map(
      (
        block,
      ) =>
        cmsBlockSchema.parse(
          block,
        ),
    );

  /*
   * Replace only blocks belonging
   * to this migrated homepage.
   *
   * Blocks belonging to other CMS
   * pages remain untouched.
   */
  await collection.deleteMany({
    pageId,
  });

  if (
    blocks.length >
    0
  ) {
    await collection.insertMany(
      blocks,
    );
  }
}

async function writeMenus(
  database:
    Db,

  migration:
    GenericCmsMigrationPayload,

  now:
    Date,
): Promise<{
  headerMenuId:
    string;

  footerMenuId:
    string;
}> {
  const collection =
    database.collection(
      CMS_COLLECTIONS.menus,
    );

  const menuIds =
    new Map<
      string,
      string
    >();

  for (
    const seed of
    migration.menus
  ) {
    const existingDocument =
      await collection.findOne({
        key:
          seed.key,
      });

    const existing =
      existingDocument
        ? cmsMenuSchema.parse(
            existingDocument,
          )
        : null;

    const menu =
      cmsMenuSchema.parse({
        ...seed.menu,

        createdAt:
          existing?.createdAt ??
          seed.menu
            .createdAt,

        updatedAt:
          now,
      });

    await collection.updateOne(
      {
        key:
          seed.key,
      },

      {
        $set:
          menu,
      },

      {
        upsert:
          true,
      },
    );

    const persisted =
      await collection.findOne({
        key:
          seed.key,
      });

    if (!persisted) {
      throw new Error(
        `Unable to persist CMS menu: ${seed.key}`,
      );
    }

    menuIds.set(
      seed.key,
      persisted._id.toString(),
    );
  }

  const headerMenuId =
    menuIds.get(
      "header",
    );

  const footerMenuId =
    menuIds.get(
      "footer",
    );

  if (
    !headerMenuId ||
    !footerMenuId
  ) {
    throw new Error(
      "Header and footer menus must both be persisted.",
    );
  }

  return {
    headerMenuId,

    footerMenuId,
  };
}

async function writeSettings(
  database:
    Db,

  migration:
    GenericCmsMigrationPayload,

  menuIds: {
    headerMenuId:
      string;

    footerMenuId:
      string;
  },

  now:
    Date,
): Promise<void> {
  const settings =
    cmsSettingsSchema.parse({
      ...migration.settings,

      key:
        "global",

      footer: {
        ...migration.settings
          .footer,

        headerMenuId:
          menuIds.headerMenuId,

        footerMenuId:
          menuIds.footerMenuId,
      },

      updatedAt:
        now,
    });

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
        $set:
          settings,
      },

      {
        upsert:
          true,
      },
    );
}

async function verifyHomepageInvariant(
  database:
    Db,
): Promise<void> {
  const collection =
    database.collection(
      CMS_COLLECTIONS.pages,
    );

  const homepageCount =
    await collection.countDocuments({
      isHomepage:
        true,
    });

  if (
    homepageCount !==
    1
  ) {
    throw new Error(
      `Expected exactly one CMS homepage, found ${homepageCount}.`,
    );
  }

  const homepage =
    await collection.findOne({
      isHomepage:
        true,
    });

  if (!homepage) {
    throw new Error(
      "CMS homepage could not be loaded after migration.",
    );
  }

  const parsed =
    cmsPageSchema.parse(
      homepage,
    );

  if (
    parsed.status !==
    "published"
  ) {
    throw new Error(
      "CMS homepage is not published after migration.",
    );
  }
}

async function applyMigration(
  database:
    Db,

  migration:
    GenericCmsMigrationPayload,

  now:
    Date,
): Promise<void> {
  console.log(
    "Applying generic CMS migration...",
  );

  const homepagePageId =
    await writeHomepage(
      database,
      migration,
      now,
    );

  console.log(
    `✓ Homepage persisted (${homepagePageId})`,
  );

  /*
   * Convert temporary migration
   * reference "home" into the real
   * MongoDB page ID.
   */
  const resolved =
    resolveGenericCmsMigrationReferences(
      migration,
      {
        homepagePageId,
      },
    );

  await writeBlocks(
    database,
    resolved,
  );

  console.log(
    `✓ ${resolved.blocks.length} homepage blocks persisted`,
  );

  const menuIds =
    await writeMenus(
      database,
      resolved,
      now,
    );

  console.log(
    "✓ Header and footer menus persisted",
  );

  await writeSettings(
    database,
    resolved,
    menuIds,
    now,
  );

  console.log(
    "✓ Global CMS settings persisted",
  );

  await verifyHomepageInvariant(
    database,
  );

  console.log(
    "✓ Homepage invariant verified",
  );
}

async function migrate() {
  const client =
    new MongoClient(
      uri,
    );

  try {
    await client.connect();

    console.log(
      "Connected to MongoDB.",
    );

    const database =
      client.db(
        databaseName,
      );

    /*
     * Everything above this point
     * and throughout preview mode
     * is read-only.
     */
    const legacy =
      await readLegacySnapshot(
        database,
      );

    const now =
      new Date();

    const migration =
      buildGenericCmsMigration(
        legacy,
        now,
      );

    printMigrationSummary(
      legacy,
      migration,
    );

    if (
      !options.apply
    ) {
      console.log(
        "DRY RUN — no database writes performed.",
      );

      console.log(
        "Run the apply command only after reviewing this output.",
      );

      return;
    }

    console.log(
      "APPLY MODE — generic CMS collections will be updated.",
    );

    console.log("");

    await applyMigration(
      database,
      migration,
      now,
    );

    console.log("");
    console.log(
      "Generic CMS migration completed successfully.",
    );

    console.log(
      "Legacy collections were preserved.",
    );
  } finally {
    await client.close();

    console.log(
      "MongoDB connection closed.",
    );
  }
}

migrate().catch(
  (
    error,
  ) => {
    console.error(
      "Generic CMS migration failed:",
      error,
    );

    process.exitCode =
      1;
  },
);