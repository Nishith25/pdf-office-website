import {
  ObjectId,
} from "mongodb";

import {
  normalizeCmsBlockOrder,
} from "../cms/core/blocks";

import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsBlockSchema,
} from "../cms/core/schemas";

import type {
  CmsBlock,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

export type CmsBlockRecord =
  CmsBlock & {
    id: string;
  };

function toBlockRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
): CmsBlockRecord {
  const parsed =
    cmsBlockSchema.parse(
      document,
    );

  return {
    id:
      document._id.toString(),

    ...parsed,
  };
}

export async function ensureCmsBlockIndexes(): Promise<void> {
  const database =
    await getDatabase();

  await database
    .collection(
      CMS_COLLECTIONS.blocks,
    )
    .createIndex(
      {
        pageId: 1,
        order: 1,
      },
      {
        name:
          "cms_blocks_page_order",
      },
    );
}

export async function getCmsBlocksForPage(
  pageId: string,
): Promise<
  CmsBlockRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.blocks,
      )
      .find({
        pageId,
      })
      .sort({
        order: 1,
      })
      .toArray();

  return documents.map(
    (document) =>
      toBlockRecord(
        document as Record<
          string,
          unknown
        > & {
          _id: ObjectId;
        },
      ),
  );
}

export async function getCmsBlockById(
  id: string,
): Promise<
  CmsBlockRecord | null
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
        CMS_COLLECTIONS.blocks,
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

  return toBlockRecord(
    document as Record<
      string,
      unknown
    > & {
      _id: ObjectId;
    },
  );
}

export async function insertCmsBlock(
  block: CmsBlock,
): Promise<
  CmsBlockRecord
> {
  await ensureCmsBlockIndexes();

  const database =
    await getDatabase();

  const validated =
    cmsBlockSchema.parse(
      block,
    );

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.blocks,
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

export async function replaceCmsBlock(
  id: string,
  block: CmsBlock,
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

  const validated =
    cmsBlockSchema.parse(
      block,
    );

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.blocks,
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

export async function deleteCmsBlockById(
  id: string,
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
        CMS_COLLECTIONS.blocks,
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

export async function persistCmsBlockOrder(
  blocks:
    readonly Pick<
      CmsBlockRecord,
      "id" | "order"
    >[],
): Promise<void> {
  const operations =
    blocks
      .filter(
        (block) =>
          ObjectId.isValid(
            block.id,
          ),
      )
      .map(
        (block) => ({
          updateOne: {
            filter: {
              _id:
                new ObjectId(
                  block.id,
                ),
            },

            update: {
              $set: {
                order:
                  block.order,

                updatedAt:
                  new Date(),
              },
            },
          },
        }),
      );

  if (
    operations.length ===
    0
  ) {
    return;
  }

  const database =
    await getDatabase();

  await database
    .collection(
      CMS_COLLECTIONS.blocks,
    )
    .bulkWrite(
      operations,
      {
        ordered: true,
      },
    );
}

export async function replaceCmsBlocksForPage(
  pageId: string,

  blocks:
    readonly CmsBlock[],
): Promise<void> {
  await ensureCmsBlockIndexes();

  const database =
    await getDatabase();

  const normalized =
    normalizeCmsBlockOrder(
      blocks,
    ).map(
      (block) =>
        cmsBlockSchema.parse({
          ...block,
          pageId,
        }),
    );

  const collection =
    database.collection(
      CMS_COLLECTIONS.blocks,
    );

  await collection.deleteMany({
    pageId,
  });

  if (
    normalized.length ===
    0
  ) {
    return;
  }

  await collection.insertMany(
    normalized,
  );
}

export async function deleteCmsBlocksForPage(
  pageId: string,
): Promise<void> {
  const database =
    await getDatabase();

  await database
    .collection(
      CMS_COLLECTIONS.blocks,
    )
    .deleteMany({
      pageId,
    });
}