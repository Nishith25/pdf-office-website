import type {
  WithId,
} from "mongodb";

import {
  getDatabase,
} from "../db/database";

export type AdminDocument = {
  key:
    "primary";

  email:
    string;

  passwordHash:
    string;

  createdAt:
    Date;

  updatedAt:
    Date;
};

export function normalizeAdminEmail(
  email:
    string,
): string {
  return email
    .trim()
    .toLowerCase();
}

export async function findAdminByEmail(
  email:
    string,
): Promise<
  WithId<AdminDocument> | null
> {
  const database =
    await getDatabase();

  return database
    .collection<AdminDocument>(
      "admin",
    )
    .findOne({
      key:
        "primary",

      email:
        normalizeAdminEmail(
          email,
        ),
    });
}

export async function updateAdminPassword(
  email:
    string,

  passwordHash:
    string,
): Promise<boolean> {
  const database =
    await getDatabase();

  const result =
    await database
      .collection<AdminDocument>(
        "admin",
      )
      .updateOne(
        {
          key:
            "primary",

          email:
            normalizeAdminEmail(
              email,
            ),
        },
        {
          $set: {
            passwordHash,

            updatedAt:
              new Date(),
          },
        },
      );

  return (
    result.matchedCount ===
    1
  );
}