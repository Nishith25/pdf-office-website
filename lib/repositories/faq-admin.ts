import {
  ObjectId,
} from "mongodb";

import {
  faqSchema,
} from "../cms/schemas";

import type {
  FAQAdminItem,
} from "../admin/faq-editor";

import {
  getDatabase,
} from "../db/database";

export async function getFaqAdminItems(): Promise<
  FAQAdminItem[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        "faqs",
      )
      .find({})
      .sort({
        order: 1,
      })
      .toArray();

  return documents.map(
    (document) => {
      const faq =
        faqSchema.parse(
          document,
        );

      return {
        id:
          document._id.toString(),

        ...faq,
      };
    },
  );
}

export async function saveFaqAdminItems(
  items:
    readonly FAQAdminItem[],
): Promise<void> {
  const database =
    await getDatabase();

  const collection =
    database.collection(
      "faqs",
    );

  const existing =
    await collection
      .find(
        {},
        {
          projection: {
            _id: 1,
          },
        },
      )
      .toArray();

  const existingIds =
    new Set(
      existing.map(
        (document) =>
          document._id.toString(),
      ),
    );

  const submittedExistingIds =
    new Set<
      string
    >();

  const now =
    new Date();

  for (
    const item of
    items
  ) {
    const {
      id,
      ...faqInput
    } = item;

    const faq =
      faqSchema.parse(
        faqInput,
      );

    if (
      id.startsWith(
        "new:",
      )
    ) {
      await collection.insertOne({
        ...faq,

        createdAt:
          now,

        updatedAt:
          now,
      });

      continue;
    }

    if (
      !existingIds.has(
        id,
      )
    ) {
      throw new Error(
        `Unknown FAQ id: ${id}`,
      );
    }

    if (
      !ObjectId.isValid(
        id,
      )
    ) {
      throw new Error(
        "Invalid FAQ id",
      );
    }

    submittedExistingIds.add(
      id,
    );

    await collection.updateOne(
      {
        _id:
          new ObjectId(
            id,
          ),
      },
      {
        $set: {
          ...faq,

          updatedAt:
            now,
        },
      },
    );
  }

  const removedIds =
    existing
      .map(
        (document) =>
          document._id.toString(),
      )
      .filter(
        (id) =>
          !submittedExistingIds.has(
            id,
          ),
      );

  if (
    removedIds.length >
    0
  ) {
    await collection.deleteMany({
      _id: {
        $in:
          removedIds.map(
            (id) =>
              new ObjectId(
                id,
              ),
          ),
      },
    });
  }
}