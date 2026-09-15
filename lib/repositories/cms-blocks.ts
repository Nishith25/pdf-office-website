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
    id:
      string;
  };

function toBlockRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
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

export async function getCmsBlocksForPage(
  pageId:
    string,
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
        order:
          1,
      })
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toBlockRecord(
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

export async function replaceCmsBlocksForPage(
  pageId:
    string,

  blocks:
    readonly CmsBlock[],
): Promise<void> {
  const database =
    await getDatabase();

  const normalized =
    normalizeCmsBlockOrder(
      blocks,
    ).map(
      (
        block,
      ) =>
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
  pageId:
    string,
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