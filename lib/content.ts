import {
  siteData,
} from "@/data/site";

import type {
  SiteData,
} from "@/data/site";

import clientPromise from "@/lib/mongodb";

type HomepageDocument =
  Partial<SiteData> & {
    key: string;
  };

function isRecord(
  value: unknown,
): value is Record<
  string,
  unknown
> {
  return (
    typeof value ===
      "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function deepMerge<T>(
  base: T,
  override: unknown,
): T {
  if (
    Array.isArray(base)
  ) {
    return (
      Array.isArray(
        override,
      )
        ? override
        : base
    ) as T;
  }

  if (
    !isRecord(base)
  ) {
    return (
      override ===
      undefined
        ? base
        : override
    ) as T;
  }

  if (
    !isRecord(override)
  ) {
    return base;
  }

  const result: Record<
    string,
    unknown
  > = {
    ...base,
  };

  for (const [
    key,
    value,
  ] of Object.entries(
    override,
  )) {
    if (
      value === undefined
    ) {
      continue;
    }

    const baseValue =
      result[key];

    if (
      isRecord(baseValue) &&
      isRecord(value)
    ) {
      result[key] =
        deepMerge(
          baseValue,
          value,
        );

      continue;
    }

    result[key] = value;
  }

  return result as T;
}

export async function getSiteContent(): Promise<SiteData> {
  try {
    const client =
      await clientPromise;

    const databaseName =
      process.env
        .MONGODB_DB ||
      "pdf_office_website";

    const database =
      client.db(
        databaseName,
      );

    const collection =
      database.collection<HomepageDocument>(
        "site_content",
      );

    const document =
      await collection.findOne(
        {
          key: "homepage",
        },
      );

    /*
     * No MongoDB document yet:
     * keep using local site.ts.
     */
    if (!document) {
      return siteData;
    }

    const {
      _id,
      key,
      ...mongoContent
    } = document;

    void _id;
    void key;

    /*
     * MongoDB values override
     * data/site.ts while local
     * values remain as fallback.
     */
    return deepMerge(
      siteData,
      mongoContent,
    );
  } catch (error) {
    console.error(
      "Unable to load website content from MongoDB:",
      error,
    );

    /*
     * The website still works if
     * MongoDB is temporarily
     * unavailable.
     */
    return siteData;
  }
}