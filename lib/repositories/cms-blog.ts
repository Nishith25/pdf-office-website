import {
  ObjectId,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsBlogPostSchema,
} from "../cms/core/schemas";

import {
  normalizeCmsSlug,
} from "../cms/core/slug";

import type {
  CmsBlogPost,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

export type CmsBlogPostRecord =
  CmsBlogPost & {
    id:
      string;
  };

function toRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
): CmsBlogPostRecord {
  const parsed =
    cmsBlogPostSchema.parse(
      document,
    );

  return {
    id:
      document._id.toString(),

    ...parsed,
  };
}

export async function ensureCmsBlogIndexes(): Promise<void> {
  const database =
    await getDatabase();

  const collection =
    database.collection(
      CMS_COLLECTIONS.blogPosts,
    );

  await collection.createIndex(
    {
      slug:
        1,
    },
    {
      unique:
        true,

      name:
        "cms_blog_slug_unique",
    },
  );

  await collection.createIndex(
    {
      status:
        1,

      publishedAt:
        -1,
    },
    {
      name:
        "cms_blog_status_published",
    },
  );

  await collection.createIndex(
    {
      category:
        1,

      publishedAt:
        -1,
    },
    {
      name:
        "cms_blog_category_published",
    },
  );
}

export async function listCmsBlogPosts(): Promise<
  CmsBlogPostRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
      )
      .find({})
      .sort({
        updatedAt:
          -1,
      })
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toRecord(
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

export async function listPublishedCmsBlogPosts(): Promise<
  CmsBlogPostRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
      )
      .find({
        status:
          "published",
      })
      .sort({
        featured:
          -1,

        publishedAt:
          -1,
      })
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toRecord(
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

export async function getCmsBlogPostById(
  id:
    string,
): Promise<
  CmsBlogPostRecord | null
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
        CMS_COLLECTIONS.blogPosts,
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

  return toRecord(
    document as Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
  );
}

export async function getCmsBlogPostBySlug(
  slug:
    string,
): Promise<
  CmsBlogPostRecord | null
> {
  const normalized =
    normalizeCmsSlug(
      slug,
    );

  if (!normalized) {
    return null;
  }

  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
      )
      .findOne({
        slug:
          normalized,
      });

  if (!document) {
    return null;
  }

  return toRecord(
    document as Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
  );
}

export async function getPublishedCmsBlogPostBySlug(
  slug:
    string,
): Promise<
  CmsBlogPostRecord | null
> {
  const normalized =
    normalizeCmsSlug(
      slug,
    );

  if (!normalized) {
    return null;
  }

  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
      )
      .findOne({
        slug:
          normalized,

        status:
          "published",
      });

  if (!document) {
    return null;
  }

  return toRecord(
    document as Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
  );
}

export async function findAvailableCmsBlogSlug(
  value:
    string,

  excludeId?:
    string,
): Promise<string> {
  const base =
    normalizeCmsSlug(
      value,
    );

  if (!base) {
    throw new Error(
      "Blog slug is invalid.",
    );
  }

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
      await getCmsBlogPostBySlug(
        candidate,
      );

    if (
      !existing ||
      existing.id ===
        excludeId
    ) {
      return candidate;
    }
  }

  throw new Error(
    "Unable to create a unique blog slug.",
  );
}

export async function insertCmsBlogPost(
  post:
    CmsBlogPost,
): Promise<
  CmsBlogPostRecord
> {
  await ensureCmsBlogIndexes();

  const validated =
    cmsBlogPostSchema.parse(
      post,
    );

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
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

export async function replaceCmsBlogPost(
  id:
    string,

  post:
    CmsBlogPost,
): Promise<boolean> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return false;
  }

  await ensureCmsBlogIndexes();

  const validated =
    cmsBlogPostSchema.parse(
      post,
    );

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.blogPosts,
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

export async function deleteCmsBlogPost(
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
        CMS_COLLECTIONS.blogPosts,
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
