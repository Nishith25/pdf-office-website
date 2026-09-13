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

export async function writeActivity(
  action: string,
  targetType: ActivityTarget,
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