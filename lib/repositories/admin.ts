import type {
  WithId,
} from "mongodb";

import {
  getDatabase,
} from "../db/database";

export type AdminDocument = {
  key: "primary";
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export function normalizeAdminEmail(
  email: string,
): string {
  return email
    .trim()
    .toLowerCase();
}

export async function findAdminByEmail(
  email: string,
): Promise<
  WithId<AdminDocument> | null
> {
  const database =
    await getDatabase();

  const normalizedEmail =
    normalizeAdminEmail(
      email,
    );

  return database
    .collection<AdminDocument>(
      "admin",
    )
    .findOne({
      key: "primary",
      email:
        normalizedEmail,
    });
}