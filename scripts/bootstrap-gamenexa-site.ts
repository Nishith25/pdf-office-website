import {
  MongoClient,
} from "mongodb";

import {
  hashPassword,
} from "../lib/auth/password";

import {
  createCmsBootstrapSeed,
} from "../lib/cms/bootstrap";

import {
  CMS_COLLECTIONS,
} from "../lib/cms/core/collections";

import {
  cmsBlockSchema,
  cmsMenuSchema,
  cmsSettingsSchema,
} from "../lib/cms/core/schemas";

import {
  normalizeAdminEmail,
} from "../lib/repositories/admin";

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

const apply =
  process.argv.includes(
    "--apply",
  );

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

    const counts = {
      pages:
        await database
          .collection(
            CMS_COLLECTIONS.pages,
          )
          .countDocuments(),

      blocks:
        await database
          .collection(
            CMS_COLLECTIONS.blocks,
          )
          .countDocuments(),

      menus:
        await database
          .collection(
            CMS_COLLECTIONS.menus,
          )
          .countDocuments(),

      settings:
        await database
          .collection(
            CMS_COLLECTIONS.settings,
          )
          .countDocuments(),

      admin:
        await database
          .collection(
            "admin",
          )
          .countDocuments(),
    };

    console.log("");
    console.log(
      "========================================",
    );

    console.log(
      "GAMENEXA CMS Site Bootstrap",
    );

    console.log(
      "========================================",
    );

    console.log(
      `Site: ${site.name}`,
    );

    console.log(
      `Site key: ${site.key}`,
    );

    console.log(
      `Database: ${site.databaseName}`,
    );

    console.log(
      `Media folder: ${site.mediaFolder}`,
    );

    console.log(
      `Theme: ${site.themeKey}`,
    );

    console.log("");

    console.log(
      "Current core records:",
    );

    console.log(
      `  Pages: ${counts.pages}`,
    );

    console.log(
      `  Blocks: ${counts.blocks}`,
    );

    console.log(
      `  Menus: ${counts.menus}`,
    );

    console.log(
      `  Settings: ${counts.settings}`,
    );

    console.log(
      `  Admins: ${counts.admin}`,
    );

    const existing =
      Object
        .values(
          counts,
        )
        .some(
          (
            count,
          ) =>
            count >
            0,
        );

    if (!apply) {
      console.log("");

      console.log(
        existing
          ? "EXISTING SITE DETECTED — bootstrap apply would be refused."
          : "EMPTY SITE — ready for bootstrap apply.",
      );

      console.log(
        "DRY RUN — no database writes performed.",
      );

      return;
    }

    if (existing) {
      throw new Error(
        "Bootstrap refused because this database already contains CMS/admin records.",
      );
    }

    const rawEmail =
      process.env
        .CMS_BOOTSTRAP_ADMIN_EMAIL;

    const password =
      process.env
        .CMS_BOOTSTRAP_ADMIN_PASSWORD;

    if (
      !rawEmail ||
      !password
    ) {
      throw new Error(
        "CMS_BOOTSTRAP_ADMIN_EMAIL and CMS_BOOTSTRAP_ADMIN_PASSWORD are required in apply mode.",
      );
    }

    if (
      password.length <
      12
    ) {
      throw new Error(
        "Bootstrap administrator password must contain at least 12 characters.",
      );
    }

    const adminEmail =
      normalizeAdminEmail(
        rawEmail,
      );

    const now =
      new Date();

    const seed =
      createCmsBootstrapSeed(
        site,
        now,
      );

    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .createIndex(
        {
          slug:
            1,
        },

        {
          unique:
            true,
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .createIndex(
        {
          key:
            1,
        },

        {
          unique:
            true,
        },
      );

    await database
      .collection(
        CMS_COLLECTIONS.settings,
      )
      .createIndex(
        {
          key:
            1,
        },

        {
          unique:
            true,
        },
      );

    await database
      .collection(
        "admin",
      )
      .createIndex(
        {
          key:
            1,
        },

        {
          unique:
            true,
        },
      );

    await database
      .collection(
        "admin",
      )
      .createIndex(
        {
          email:
            1,
        },

        {
          unique:
            true,
        },
      );

    const pageResult =
      await database
        .collection(
          CMS_COLLECTIONS.pages,
        )
        .insertOne(
          seed.homepage,
        );

    const pageId =
      pageResult
        .insertedId
        .toString();

    const blocks =
      seed.blocks.map(
        (
          block,
          index,
        ) =>
          cmsBlockSchema.parse({
            pageId,

            type:
              block.type,

            order:
              index + 1,

            visible:
              true,

            data:
              block.data,

            createdAt:
              now,

            updatedAt:
              now,
          }),
      );

    await database
      .collection(
        CMS_COLLECTIONS.blocks,
      )
      .insertMany(
        blocks,
      );

    const headerMenu =
      cmsMenuSchema.parse({
        name:
          "Header Navigation",

        key:
          "header",

        location:
          "header",

        items: [
          {
            id:
              "header-home",

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
        ],

        createdAt:
          now,

        updatedAt:
          now,
      });

    const footerMenu =
      cmsMenuSchema.parse({
        name:
          "Footer Navigation",

        key:
          "footer",

        location:
          "footer",

        items: [
          {
            id:
              "footer-home",

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
        ],

        createdAt:
          now,

        updatedAt:
          now,
      });

    const headerResult =
      await database
        .collection(
          CMS_COLLECTIONS.menus,
        )
        .insertOne(
          headerMenu,
        );

    const footerResult =
      await database
        .collection(
          CMS_COLLECTIONS.menus,
        )
        .insertOne(
          footerMenu,
        );

    const settings =
      cmsSettingsSchema.parse({
        ...seed.settings,

        footer: {
          ...seed.settings.footer,

          headerMenuId:
            headerResult
              .insertedId
              .toString(),

          footerMenuId:
            footerResult
              .insertedId
              .toString(),
        },

        updatedAt:
          now,
      });

    await database
      .collection(
        CMS_COLLECTIONS.settings,
      )
      .insertOne(
        settings,
      );

    const passwordHash =
      await hashPassword(
        password,
      );

    await database
      .collection(
        "admin",
      )
      .insertOne({
        key:
          "primary",

        email:
          adminEmail,

        passwordHash,

        createdAt:
          now,

        updatedAt:
          now,
      });

    console.log("");
    console.log(
      "✓ Homepage created",
    );

    console.log(
      `✓ Structured homepage blocks created: ${seed.blocks.length}`,
    );

    console.log(
      "✓ Header/footer menus created",
    );

    console.log(
      "✓ Site settings created",
    );

    console.log(
      "✓ Primary administrator created",
    );

    console.log("");
    console.log(
      "GAMENEXA CMS site bootstrap completed.",
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
      "GAMENEXA site bootstrap failed:",
      error,
    );

    process.exitCode =
      1;
  },
);
