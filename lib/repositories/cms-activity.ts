import {
  ObjectId,
} from "mongodb";

import {
  CMS_COLLECTIONS,
} from "../cms/core/collections";

import {
  cmsActivitySchema,
} from "../cms/core/schemas";

import type {
  CmsActivity,
} from "../cms/core/types";

import {
  getDatabase,
} from "../db/database";

export type CmsActivityRecord =
  CmsActivity & {
    id:
      string;
  };

function toActivityRecord(
  document:
    Record<
      string,
      unknown
    > & {
      _id:
        ObjectId;
    },
): CmsActivityRecord {
  const parsed =
    cmsActivitySchema.parse(
      document,
    );

  return {
    id:
      document._id.toString(),

    ...parsed,
  };
}

export async function writeCmsActivity(
  action:
    string,

  entityType:
    CmsActivity["entityType"],

  entityId:
    string,

  entityName:
    string,
): Promise<void> {
  const database =
    await getDatabase();

  const document =
    cmsActivitySchema.parse({
      action,
      entityType,
      entityId,
      entityName,

      createdAt:
        new Date(),
    });

  await database
    .collection(
      CMS_COLLECTIONS.activity,
    )
    .insertOne(
      document,
    );
}

export async function getRecentCmsActivity(
  limit =
    10,
): Promise<
  CmsActivityRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.activity,
      )
      .find({})
      .sort({
        createdAt:
          -1,
      })
      .limit(
        Math.max(
          1,
          Math.min(
            limit,
            50,
          ),
        ),
      )
      .toArray();

  return documents.map(
    (
      document,
    ) =>
      toActivityRecord(
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