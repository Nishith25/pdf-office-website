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

  const sections =
    documents.map(
      (document) =>
        siteSectionSchema.parse(
          document,
        ),
    );

  return sortByOrder(
    sections,
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

  const tools =
    documents.map(
      (document) =>
        toolSchema.parse(
          document,
        ),
    );

  return sortByOrder(
    tools,
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

  const faqs =
    documents.map(
      (document) =>
        faqSchema.parse(
          document,
        ),
    );

  return sortByOrder(
    faqs,
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

  const validatedSections =
    sections.map(
      (section) =>
        siteSectionSchema.parse(
          section,
        ),
    );

  if (
    validatedSections.length ===
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
      validatedSections.map(
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