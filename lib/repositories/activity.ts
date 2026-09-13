import {
  getDatabase,
} from "../db/database";

export type ActivityTarget =
  | "section"
  | "tool"
  | "faq"
  | "seo"
  | "settings"
  | "media"
  | "auth";

export type ActivityRecord = {
  action: string;

  targetType:
    ActivityTarget;

  targetName:
    string;

  createdAt:
    Date;
};

export async function writeActivity(
  action: string,
  targetType:
    ActivityTarget,
  targetName: string,
): Promise<void> {
  const database =
    await getDatabase();

  await database
    .collection(
      "activity_log",
    )
    .insertOne({
      action,
      targetType,
      targetName,
      createdAt:
        new Date(),
    });
}

export async function getRecentActivity(
  limit = 6,
): Promise<
  ActivityRecord[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        "activity_log",
      )
      .find({})
      .sort({
        createdAt: -1,
      })
      .limit(
        Math.max(
          1,
          Math.min(
            limit,
            20,
          ),
        ),
      )
      .toArray();

  return documents.map(
    (document) => ({
      action:
        typeof document.action ===
        "string"
          ? document.action
          : "Updated content",

      targetType:
        document
          .targetType as ActivityTarget,

      targetName:
        typeof document.targetName ===
        "string"
          ? document.targetName
          : "Website",

      createdAt:
        document.createdAt instanceof
        Date
          ? document.createdAt
          : new Date(
              document.createdAt,
            ),
    }),
  );
}