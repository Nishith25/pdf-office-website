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
    id: string;
  };

export async function writeCmsActivity(
  activity: CmsActivity,
): Promise<
  CmsActivityRecord
> {
  const validated =
    cmsActivitySchema.parse(
      activity,
    );

  const database =
    await getDatabase();

  const result =
    await database
      .collection(
        CMS_COLLECTIONS.activity,
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

export async function getRecentCmsActivity(
  limit = 10,
): Promise<
  CmsActivityRecord[]
> {
  const safeLimit =
    Math.max(
      1,
      Math.min(
        50,
        Math.floor(
          limit,
        ),
      ),
    );

  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        CMS_COLLECTIONS.activity,
      )
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(
        safeLimit,
      )
      .toArray();

  return documents.map(
    (document) => {
      const validated =
        cmsActivitySchema.parse(
          document,
        );

      return {
        id:
          (
            document._id as ObjectId
          ).toString(),

        ...validated,
      };
    },
  );
}