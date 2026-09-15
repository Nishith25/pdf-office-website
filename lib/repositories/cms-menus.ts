import {
  ObjectId,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsMenuSchema,
} from "../cms/core/schemas";

import {
  normalizeCmsSlug,
} from "../cms/core/slug";

import type {
  CmsMenu,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

export type CmsMenuRecord =
  CmsMenu & {
    id:
      string;
  };

function toMenuRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
): CmsMenuRecord {
  const parsed =
    cmsMenuSchema.parse(
      document,
    );

  return {
    id:
      document._id.toString(),

    ...parsed,
  };
}

export async function ensureCmsMenuIndexes(): Promise<void> {
  const database =
    await getDatabase();

  const collection =
    database.collection(
      CMS_COLLECTIONS.menus,
    );

  await collection.createIndex(
    {
      key:
        1,
    },
    {
      unique:
        true,

      name:
        "cms_menus_key_unique",
    },
  );

  await collection.createIndex(
    {
      location:
        1,

      updatedAt:
        -1,
    },
    {
      name:
        "cms_menus_location_updated",
    },
  );
}

export async function listCmsMenus(): Promise<
  CmsMenuRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .find({})
      .sort({
        location:
          1,

        updatedAt:
          -1,
      })
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toMenuRecord(
        document as Record<
          string,
          unknown
        > & {
          _id:
            ObjectId;
        },
      ),
  );
}

export async function getCmsMenuById(
  id:
    string,
): Promise<
  CmsMenuRecord | null
> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return null;
  }

  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .findOne({
        _id:
          new ObjectId(
            id,
          ),
      });

  if (!document) {
    return null;
  }

  return toMenuRecord(
    document as Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
  );
}

export async function getCmsMenuByKey(
  key:
    string,
): Promise<
  CmsMenuRecord | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .findOne({
        key,
      });

  if (!document) {
    return null;
  }

  return toMenuRecord(
    document as Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
  );
}

export async function findAvailableCmsMenuKey(
  requested:
    string,

  excludeMenuId?:
    string,
): Promise<string> {
  const base =
    normalizeCmsSlug(
      requested,
    ) ||
    "menu";

  for (
    let attempt =
      1;
    attempt <=
      1000;
    attempt +=
      1
  ) {
    const candidate =
      attempt ===
      1
        ? base
        : `${base}-${attempt}`;

    const existing =
      await getCmsMenuByKey(
        candidate,
      );

    if (
      !existing ||
      existing.id ===
        excludeMenuId
    ) {
      return candidate;
    }
  }

  throw new Error(
    "Unable to create a unique menu key.",
  );
}

export async function insertCmsMenu(
  menu:
    CmsMenu,
): Promise<
  CmsMenuRecord
> {
  await ensureCmsMenuIndexes();

  const validated =
    cmsMenuSchema.parse(
      menu,
    );

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .insertOne(
        validated,
      );

  return {
    id:
      result.insertedId.toString(),

    ...validated,
  };
}

export async function replaceCmsMenu(
  id:
    string,

  menu:
    CmsMenu,
): Promise<boolean> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return false;
  }

  await ensureCmsMenuIndexes();

  const validated =
    cmsMenuSchema.parse(
      menu,
    );

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .replaceOne(
        {
          _id:
            new ObjectId(
              id,
            ),
        },

        validated,
      );

  return (
    result.matchedCount ===
    1
  );
}

export async function deleteCmsMenuById(
  id:
    string,
): Promise<boolean> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return false;
  }

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.menus,
      )
      .deleteOne({
        _id:
          new ObjectId(
            id,
          ),
      });

  return (
    result.deletedCount ===
    1
  );
}