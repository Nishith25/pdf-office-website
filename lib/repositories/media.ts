import {
  ObjectId,
} from "mongodb";

import {
  mediaCreateSchema,
} from "../media/validation";

import type {
  MediaCreateInput,
  MediaItem,
} from "../media/validation";

import {
  getDatabase,
} from "../db/database";

function documentToMediaItem(
  document: {
    _id:
      ObjectId;

    [key:
      string]:
      unknown;
  },
): MediaItem {
  const parsed =
    mediaCreateSchema.parse(
      document,
    );

  const uploadedAt =
    document.uploadedAt instanceof
    Date
      ? document.uploadedAt
      : new Date(
          String(
            document.uploadedAt,
          ),
        );

  return {
    id:
      document._id.toString(),

    ...parsed,

    uploadedAt,
  };
}

export async function getMediaItems(
  limit = 100,
): Promise<
  MediaItem[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        "media",
      )
      .find({})
      .sort({
        uploadedAt: -1,
      })
      .limit(
        Math.max(
          1,
          Math.min(
            limit,
            250,
          ),
        ),
      )
      .toArray();

  return documents.map(
    (document) =>
      documentToMediaItem(
        document as never,
      ),
  );
}

export async function createMediaItem(
  input:
    MediaCreateInput,
): Promise<
  MediaItem
> {
  const database =
    await getDatabase();

  const collection =
    database.collection(
      "media",
    );

  const validated =
    mediaCreateSchema.parse(
      input,
    );

  const existing =
    await collection.findOne({
      publicId:
        validated.publicId,
    });

  if (existing) {
    return documentToMediaItem(
      existing as never,
    );
  }

  const uploadedAt =
    new Date();

  const result =
    await collection.insertOne({
      ...validated,
      uploadedAt,
    });

  return {
    id:
      result.insertedId.toString(),

    ...validated,

    uploadedAt,
  };
}

export async function getMediaItemById(
  id:
    string,
): Promise<
  MediaItem | null
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
        "media",
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

  return documentToMediaItem(
    document as never,
  );
}

export async function getMediaUsage(
  media:
    MediaItem,
): Promise<
  string[]
> {
  const database =
    await getDatabase();

  const usage:
    string[] = [];

  const sections =
    await database
      .collection(
        "site_sections",
      )
      .find({
        mediaId:
          media.id,
      })
      .project({
        key: 1,
      })
      .toArray();

  for (
    const section of
    sections
  ) {
    usage.push(
      `Homepage section: ${String(
        section.key,
      )}`,
    );
  }

  const settings =
    await database
      .collection(
        "site_settings",
      )
      .findOne({
        key:
          "global",
      });

  if (
    settings?.appIconUrl ===
    media.url
  ) {
    usage.push(
      "Website app icon",
    );
  }

  const homePage =
    await database
      .collection(
        "site_pages",
      )
      .findOne({
        slug:
          "home",
      });

  if (
    homePage?.seo &&
    typeof homePage.seo ===
      "object" &&
    "ogImage" in
      homePage.seo &&
    homePage.seo
      .ogImage ===
      media.url
  ) {
    usage.push(
      "SEO social image",
    );
  }

  return usage;
}

export async function deleteMediaRecord(
  id:
    string,
): Promise<void> {
  if (
    !ObjectId.isValid(
      id,
    )
  ) {
    return;
  }

  const database =
    await getDatabase();

  await database
    .collection(
      "media",
    )
    .deleteOne({
      _id:
        new ObjectId(
          id,
        ),
    });
}