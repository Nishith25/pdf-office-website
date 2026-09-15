import {
  ObjectId,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsPageSchema,
} from "../cms/core/schemas";

import {
  buildCmsSlugCandidate,
} from "../cms/core/slug-candidates";

import {
  isReservedCmsSlug,
  normalizeCmsSlug,
} from "../cms/core/slug";

import type {
  CmsPage,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

import {
  deleteCmsBlocksForPage,
} from "./cms-blocks";

export type CmsPageRecord =
  CmsPage & {
    id: string;
  };

export function canDeleteCmsPage(
  page:
    Pick<
      CmsPage,
      "isHomepage"
    >,
): boolean {
  return !page.isHomepage;
}

function toPageRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
): CmsPageRecord {
  const parsed =
    cmsPageSchema.parse(
      document,
    );

  return {
    id:
      document._id.toString(),

    ...parsed,
  };
}

export async function ensureCmsPageIndexes(): Promise<void> {
  const database =
    await getDatabase();

  const collection =
    database.collection(
      CMS_COLLECTIONS.pages,
    );

  await collection.createIndex(
    {
      slug: 1,
    },
    {
      unique: true,

      name:
        "cms_pages_slug_unique",
    },
  );

  await collection.createIndex(
    {
      isHomepage:
        1,
    },
    {
      unique:
        true,

      partialFilterExpression: {
        isHomepage:
          true,
      },

      name:
        "cms_pages_single_homepage",
    },
  );

  await collection.createIndex(
    {
      status:
        1,

      updatedAt:
        -1,
    },
    {
      name:
        "cms_pages_status_updated",
    },
  );
}

export async function listCmsPages(): Promise<
  CmsPageRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .find({})
      .sort({
        isHomepage:
          -1,

        updatedAt:
          -1,
      })
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toPageRecord(
        document as Record<
          string,
          unknown
        > & {
          _id: ObjectId;
        },
      ),
  );
}

export async function getCmsPageById(
  id: string,
): Promise<
  CmsPageRecord | null
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
        CMS_COLLECTIONS.pages,
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

  return toPageRecord(
    document as Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
  );
}

export async function getCmsPageBySlug(
  slug: string,
): Promise<
  CmsPageRecord | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .findOne({
        slug,
      });

  if (!document) {
    return null;
  }

  return toPageRecord(
    document as Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
  );
}

export async function getCmsHomepage(): Promise<
  CmsPageRecord | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
      )
      .findOne({
        isHomepage:
          true,

        status:
          "published",
      });

  if (!document) {
    return null;
  }

  return toPageRecord(
    document as Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
  );
}

export async function insertCmsPage(
  page: CmsPage,
): Promise<
  CmsPageRecord
> {
  await ensureCmsPageIndexes();

  const database =
    await getDatabase();

  const validated =
    cmsPageSchema.parse(
      page,
    );

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
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

export async function replaceCmsPage(
  id: string,

  page: CmsPage,
): Promise<boolean> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return false;
  }

  await ensureCmsPageIndexes();

  const database =
    await getDatabase();

  const validated =
    cmsPageSchema.parse(
      page,
    );

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
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

export async function deleteCmsPageById(
  id: string,
): Promise<boolean> {
  const page =
    await getCmsPageById(
      id,
    );

  if (
    !page ||
    !canDeleteCmsPage(
      page,
    )
  ) {
    return false;
  }

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.pages,
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

export async function findAvailableCmsSlug(
  requestedSlug: string,

  excludePageId?: string,
): Promise<string> {
  const base =
    normalizeCmsSlug(
      requestedSlug,
    );

  if (
    !base ||
    isReservedCmsSlug(
      base,
    )
  ) {
    throw new Error(
      "Invalid CMS page slug.",
    );
  }

  for (
    let attempt = 1;
    attempt <= 1000;
    attempt += 1
  ) {
    const candidate =
      buildCmsSlugCandidate(
        base,
        attempt,
      );

    const existing =
      await getCmsPageBySlug(
        candidate,
      );

    if (
      !existing ||
      existing.id ===
        excludePageId
    ) {
      return candidate;
    }
  }

  throw new Error(
    "Unable to create a unique page slug.",
  );
}

export async function insertCmsPageWithUniqueSlug(
  page: CmsPage,
): Promise<
  CmsPageRecord
> {
  const slug =
    await findAvailableCmsSlug(
      page.slug ||
        page.title,
    );

  return insertCmsPage({
    ...page,
    slug,
  });
}

export async function setCmsHomepage(
  pageId: string,
): Promise<boolean> {
  if (
    !ObjectId.isValid(
      pageId,
    )
  ) {
    return false;
  }

  const target =
    await getCmsPageById(
      pageId,
    );

  if (!target) {
    return false;
  }

  const database =
    await getDatabase();

  const collection =
    database.collection(
      CMS_COLLECTIONS.pages,
    );

  const now =
    new Date();

  await collection.updateMany(
    {
      isHomepage:
        true,

      _id: {
        $ne:
          new ObjectId(
            pageId,
          ),
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

  const result =
    await collection.updateOne(
      {
        _id:
          new ObjectId(
            pageId,
          ),
      },

      {
        $set: {
          isHomepage:
            true,

          status:
            "published",

          publishedAt:
            target.publishedAt ??
            now,

          updatedAt:
            now,
        },
      },
    );

  return (
    result.matchedCount ===
    1
  );
}

export async function deleteCmsPageWithBlocks(
  pageId: string,
): Promise<boolean> {
  const deleted =
    await deleteCmsPageById(
      pageId,
    );

  if (!deleted) {
    return false;
  }

  await deleteCmsBlocksForPage(
    pageId,
  );

  return true;
}