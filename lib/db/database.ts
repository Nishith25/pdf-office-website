import type {
  Db,
} from "mongodb";

export async function getDatabase(): Promise<Db> {
  const {
    default:
      clientPromise,
  } = await import(
    "../mongodb"
  );

  const client =
    await clientPromise;

  const databaseName =
    process.env.MONGODB_DB ||
    "pdf_office_website";

  return client.db(
    databaseName,
  );
}