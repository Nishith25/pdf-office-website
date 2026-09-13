import {
  faqSchema,
  sitePageSchema,
  siteSectionSchema,
  siteSettingsSchema,
  toolSchema,
} from "../cms/schemas";

import type {
  FAQItem,
  SitePage,
  SiteSection,
  SiteSettings,
  ToolItem,
} from "../cms/types";

import {
  getDatabase,
} from "../db/database";

type OrderedItem = {
  order: number;
};

export function sortByOrder<
  T extends OrderedItem,
>(
  items:
    readonly T[],
): T[] {
  return [
    ...items,
  ].sort(
    (
      a,
      b,
    ) =>
      a.order -
      b.order,
  );
}

export async function getHomePage(): Promise<
  SitePage | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        "site_pages",
      )
      .findOne({
        slug: "home",
      });

  if (!document) {
    return null;
  }

  return sitePageSchema.parse(
    document,
  );
}

export async function getHomepageSections(): Promise<
  SiteSection[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        "site_sections",
      )
      .find({})
      .sort({
        order: 1,
      })
      .toArray();

  return sortByOrder(
    documents.map(
      (document) =>
        siteSectionSchema.parse(
          document,
        ),
    ),
  );
}

export async function getTools(): Promise<
  ToolItem[]
> {
  const database =
    await getDatabase();

  const documents =
    await database
      .collection(
        "tools",
      )
      .find({})
      .sort({
        order: 1,
      })
      .toArray();

  return sortByOrder(
    documents.map(
      (document) =>
        toolSchema.parse(
          document,
        ),
    ),
  );
}

export async function getFaqs(): Promise<
  FAQItem[]
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

  return sortByOrder(
    documents.map(
      (document) =>
        faqSchema.parse(
          document,
        ),
    ),
  );
}

export async function getSiteSettings(): Promise<
  SiteSettings | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        "site_settings",
      )
      .findOne({
        key: "global",
      });

  if (!document) {
    return null;
  }

  return siteSettingsSchema.parse(
    document,
  );
}

export async function saveHomepageSections(
  sections:
    readonly SiteSection[],
): Promise<void> {
  const database =
    await getDatabase();

  const validated =
    sections.map(
      (section) =>
        siteSectionSchema.parse(
          section,
        ),
    );

  if (
    validated.length ===
    0
  ) {
    return;
  }

  const now =
    new Date();

  await database
    .collection(
      "site_sections",
    )
    .bulkWrite(
      validated.map(
        (section) => ({
          updateOne: {
            filter: {
              key:
                section.key,
            },

            update: {
              $set: {
                ...section,

                updatedAt:
                  now,
              },
            },

            upsert: true,
          },
        }),
      ),
    );
}

export async function saveTools(
  tools:
    readonly ToolItem[],
): Promise<void> {
  if (
    tools.length ===
    0
  ) {
    return;
  }

  const database =
    await getDatabase();

  const validated =
    tools.map(
      (tool) =>
        toolSchema.parse(
          tool,
        ),
    );

  const now =
    new Date();

  await database
    .collection(
      "tools",
    )
    .bulkWrite(
      validated.map(
        (tool) => ({
          updateOne: {
            filter: {
              type:
                tool.type,
            },

            update: {
              $set: {
                ...tool,

                updatedAt:
                  now,
              },
            },

            upsert: true,
          },
        }),
      ),
    );
}

export async function saveHomePage(
  page:
    SitePage,
): Promise<void> {
  const database =
    await getDatabase();

  const validated =
    sitePageSchema.parse(
      page,
    );

  await database
    .collection(
      "site_pages",
    )
    .updateOne(
      {
        slug:
          "home",
      },
      {
        $set: {
          ...validated,

          updatedAt:
            new Date(),
        },
      },
      {
        upsert: true,
      },
    );
}

export async function saveSiteSettings(
  settings:
    SiteSettings,
): Promise<void> {
  const database =
    await getDatabase();

  const validated =
    siteSettingsSchema.parse(
      settings,
    );

  await database
    .collection(
      "site_settings",
    )
    .updateOne(
      {
        key:
          "global",
      },
      {
        $set: {
          ...validated,

          key:
            "global",

          updatedAt:
            new Date(),
        },
      },
      {
        upsert: true,
      },
    );
}
export async function saveSiteSections(
  sections:
    readonly SiteSection[],
): Promise<void> {
  if (
    sections.length ===
    0
  ) {
    return;
  }

  const database =
    await getDatabase();

  const validated =
    sections.map(
      (section) =>
        siteSectionSchema.parse(
          section,
        ),
    );

  const now =
    new Date();

  await database
    .collection(
      "site_sections",
    )
    .bulkWrite(
      validated.map(
        (section) => ({
          updateOne: {
            filter: {
              key:
                section.key,
            },

            update: {
              $set: {
                ...section,

                updatedAt:
                  now,
              },
            },

            upsert: true,
          },
        }),
      ),
    );
}

export async function getSiteSectionByKey(
  key:
    string,
): Promise<
  SiteSection | null
> {
  const database =
    await getDatabase();

  const document =
    await database
      .collection(
        "site_sections",
      )
      .findOne({
        key,
      });

  if (!document) {
    return null;
  }

  return siteSectionSchema.parse(
    document,
  );
}