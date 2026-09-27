import type {
  Db,
} from "mongodb";

import {
  getSiteConfig,
} from "../site/config";

export async function getDatabase(): Promise<Db> {
  const {
    default:
      clientPromise,
  } = await import(
    "../mongodb"
  );

  const client =
    await clientPromise;

  const site =
    getSiteConfig();

  return client.db(
    site.databaseName,
  );
}
