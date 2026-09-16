import {
  cmsBlockSchema,
  cmsMenuSchema,
  cmsPageSchema,
  cmsSettingsSchema,
} from "../core/schemas";

import {
  createDefaultCmsSettings,
} from "../core/settings";

import type {
  CmsBlock,
  CmsBlockType,
  CmsMenu,
} from "../core/types";

import type {
  GenericCmsMigrationPayload,
  LegacyCmsMigrationSnapshot,
} from "./types";

const HOMEPAGE_REFERENCE =
  "home";

const DEFAULT_SITE_NAME =
  "PDF Office – Doc Scanner";

const DEFAULT_SHORT_NAME =
  "PDF Office";

const DEFAULT_TAGLINE =
  "Scanner • OCR • PDF Tools • eSign";

const DEFAULT_SITE_URL =
  "https://pdf-office-website.vercel.app";

function readString(
  value:
    unknown,
): string {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readStringArray(
  value:
    unknown,
): string[] {
  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value
    .map(
      (
        item,
      ) =>
        readString(
          item,
        ),
    )
    .filter(Boolean);
}

function readObjectArray(
  value:
    unknown,
): Array<
  Record<
    string,
    unknown
  >
> {
  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value.filter(
    (
      item,
    ): item is Record<
      string,
      unknown
    > =>
      typeof item ===
        "object" &&
      item !==
        null &&
      !Array.isArray(
        item,
      ),
  );
}

function joinNonEmpty(
  parts:
    readonly string[],

  separator =
    " — ",
): string {
  return parts
    .map(
      (
        part,
      ) =>
        part.trim(),
    )
    .filter(Boolean)
    .join(
      separator,
    );
}

function stableMenuItemId(
  menuKey:
    string,

  index:
    number,
): string {
  return `${menuKey}-${index + 1}`;
}

function findSection(
  legacy:
    LegacyCmsMigrationSnapshot,

  key:
    string,
) {
  return legacy.sections.find(
    (
      section,
    ) =>
      section.key ===
      key,
  );
}

function createBlock(
  type:
    CmsBlockType,

  order:
    number,

  data:
    Record<
      string,
      unknown
    >,

  now:
    Date,
): CmsBlock {
  return cmsBlockSchema.parse({
    pageId:
      HOMEPAGE_REFERENCE,

    type,

    order,

    visible:
      true,

    data,

    createdAt:
      now,

    updatedAt:
      now,
  });
}

function createHeaderMenu(
  playStoreUrl:
    string,

  now:
    Date,
): CmsMenu {
  const items:
    CmsMenu["items"] = [
      {
        id:
          stableMenuItemId(
            "header",
            0,
          ),

        label:
          "Home",

        type:
          "page",

        pageId:
          HOMEPAGE_REFERENCE,

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          1,

        enabled:
          true,
      },
  ];

  if (playStoreUrl) {
    items.push({
      id:
        stableMenuItemId(
          "header",
          1,
        ),

      label:
        "Get the app",

      type:
        "custom",

      pageId:
        null,

      customUrl:
        playStoreUrl,

      target:
        "new-tab",

      parentId:
        null,

      order:
        2,

      enabled:
        true,
    });
  }

  return cmsMenuSchema.parse({
    name:
      "Header Menu",

    key:
      "header",

    location:
      "header",

    items,

    createdAt:
      now,

    updatedAt:
      now,
  });
}

function createFooterMenu(
  legacy:
    LegacyCmsMigrationSnapshot,

  playStoreUrl:
    string,

  now:
    Date,
): CmsMenu {
  const items:
    CmsMenu["items"] = [
      {
        id:
          stableMenuItemId(
            "footer",
            0,
          ),

        label:
          "Home",

        type:
          "page",

        pageId:
          HOMEPAGE_REFERENCE,

        customUrl:
          "",

        target:
          "same-tab",

        parentId:
          null,

        order:
          1,

        enabled:
          true,
      },
  ];

  let itemIndex =
    1;

  if (playStoreUrl) {
    items.push({
      id:
        stableMenuItemId(
          "footer",
          itemIndex,
        ),

      label:
        "Google Play",

      type:
        "custom",

      pageId:
        null,

      customUrl:
        playStoreUrl,

      target:
        "new-tab",

      parentId:
        null,

      order:
        itemIndex +
        1,

      enabled:
        true,
    });

    itemIndex +=
      1;
  }

  const privacyUrl =
    readString(
      legacy.settings
        .privacyUrl,
    );

  if (privacyUrl) {
    items.push({
      id:
        stableMenuItemId(
          "footer",
          itemIndex,
        ),

      label:
        "Privacy",

      type:
        "custom",

      pageId:
        null,

      customUrl:
        privacyUrl,

      target:
        "same-tab",

      parentId:
        null,

      order:
        itemIndex +
        1,

      enabled:
        true,
    });

    itemIndex +=
      1;
  }

  const termsUrl =
    readString(
      legacy.settings
        .termsUrl,
    );

  if (termsUrl) {
    items.push({
      id:
        stableMenuItemId(
          "footer",
          itemIndex,
        ),

      label:
        "Terms",

      type:
        "custom",

      pageId:
        null,

      customUrl:
        termsUrl,

      target:
        "same-tab",

      parentId:
        null,

      order:
        itemIndex +
        1,

      enabled:
        true,
    });
  }

  return cmsMenuSchema.parse({
    name:
      "Footer Menu",

    key:
      "footer",

    location:
      "footer",

    items,

    createdAt:
      now,

    updatedAt:
      now,
  });
}

export function buildGenericCmsMigration(
  legacy:
    LegacyCmsMigrationSnapshot,

  now =
    new Date(),
): GenericCmsMigrationPayload {
  const siteName =
    readString(
      legacy.settings
        .brandName,
    ) ||
    DEFAULT_SITE_NAME;

  const shortName =
    readString(
      legacy.settings
        .shortName,
    ) ||
    DEFAULT_SHORT_NAME;

  const siteUrl =
    readString(
      legacy.settings
        .siteUrl,
    ) ||
    DEFAULT_SITE_URL;

  const playStoreUrl =
    readString(
      legacy.settings
        .playStoreUrl,
    );

  const appIconUrl =
    readString(
      legacy.settings
        .appIconUrl,
    );

  const heroSection =
    findSection(
      legacy,
      "hero",
    );

  const heroData =
    heroSection?.data ??
    {};

  const heroTitleTop =
    readString(
      heroData.titleTop,
    ) ||
    readString(
      heroSection?.title,
    );

  const heroTitleBottom =
    readString(
      heroData.titleBottom,
    );

  const heroTitle =
    joinNonEmpty(
      [
        heroTitleTop,
        heroTitleBottom,
      ],
      " ",
    ) ||
    siteName;

  const heroDescription =
    readString(
      heroSection
        ?.description,
    );

  const legacySeo =
    legacy.page.seo;

  const seoTitle =
    readString(
      legacySeo.title,
    ) ||
    siteName;

  const seoDescription =
    readString(
      legacySeo.description,
    ) ||
    heroDescription;

  const canonicalUrl =
    readString(
      legacySeo
        .canonicalUrl,
    ) ||
    siteUrl;

  const ogTitle =
    readString(
      legacySeo
        .ogTitle,
    ) ||
    seoTitle;

  const ogDescription =
    readString(
      legacySeo
        .ogDescription,
    ) ||
    seoDescription;

  const ogImage =
    readString(
      legacySeo
        .ogImage,
    ) ||
    appIconUrl;

  const keywords =
    Array.isArray(
      legacySeo.keywords,
    )
      ? legacySeo.keywords
          .map(
            (
              keyword,
            ) =>
              readString(
                keyword,
              ),
          )
          .filter(Boolean)
      : [];

  const page =
    cmsPageSchema.parse({
      title:
        seoTitle,

      slug:
        "home",

      status:
        "published",

      isHomepage:
        true,

      seo: {
        title:
          seoTitle,

        description:
          seoDescription,

        keywords:
          keywords.length >
          0
            ? keywords
            : [
                "PDF Office",
                "PDF scanner",
                "document scanner",
                "OCR",
                "PDF tools",
                "eSign",
              ],

        canonicalUrl,

        ogTitle,

        ogDescription,

        ogImage,

        noIndex:
          false,
      },

      publishedAt:
        now,

      createdAt:
        now,

      updatedAt:
        now,
    });

  const defaultSettings =
    createDefaultCmsSettings();

  const settings =
    cmsSettingsSchema.parse({
      ...defaultSettings,

      key:
        "global",

      identity: {
        ...defaultSettings
          .identity,

        siteName,

        shortName,

        tagline:
          readString(
            heroSection
              ?.eyebrow,
          ) ||
          DEFAULT_TAGLINE,

        logoUrl:
          appIconUrl,

        faviconUrl:
          appIconUrl,

        siteUrl,
      },

      externalLinks: {
        ...defaultSettings
          .externalLinks,

        primaryCtaLabel:
          readString(
            heroData
              .primaryCta,
          ) ||
          "Get it on Google Play",

        primaryCtaUrl:
          playStoreUrl,

        googlePlayUrl:
          playStoreUrl,
      },

      footer: {
        ...defaultSettings
          .footer,

        text:
          readString(
            legacy.settings
              .footerText,
          ) ||
          "Scan · Convert · Sign · Organize",
      },

      globalSeo: {
        ...defaultSettings
          .globalSeo,

        title:
          seoTitle,

        description:
          seoDescription,

        keywords:
          keywords.length >
          0
            ? keywords
            : [
                "PDF Office",
                "PDF scanner",
                "document scanner",
                "OCR",
                "PDF tools",
                "eSign",
              ],

        canonicalUrl,

        ogTitle,

        ogDescription,

        ogImage,

        noIndex:
          false,
      },

      updatedAt:
        now,
    });

  const blockSeeds:
    Array<{
      type:
        CmsBlockType;

      data:
        Record<
          string,
          unknown
        >;
    }> = [];

  if (
    !heroSection ||
    heroSection.visible
  ) {
    blockSeeds.push({
      type:
        "hero",

      data: {
        eyebrow:
          readString(
            heroSection
              ?.eyebrow,
          ),

        title:
          heroTitle,

        description:
          heroDescription,

        image:
          "",

        buttonLabel:
          readString(
            heroData
              .primaryCta,
          ),

        buttonUrl:
          playStoreUrl,

        alignment:
          "left",
      },
    });

    const stats =
      readObjectArray(
        heroData.stats,
      )
        .map(
          (
            item,
          ) =>
            joinNonEmpty([
              readString(
                item.value,
              ),

              readString(
                item.label,
              ),
            ]),
        )
        .filter(Boolean);

    if (
      stats.length >
      0
    ) {
      blockSeeds.push({
        type:
          "stats",

        data: {
          title:
            "Highlights",

          items:
            stats,
        },
      });
    }
  }

  const scanWorkflow =
    findSection(
      legacy,
      "scanWorkflow",
    );

  if (
    scanWorkflow?.visible
  ) {
    const cards =
      readObjectArray(
        scanWorkflow.data
          .items,
      )
        .map(
          (
            item,
          ) =>
            joinNonEmpty([
              readString(
                item.title,
              ),

              readString(
                item.description,
              ),
            ]),
        )
        .filter(Boolean);

    blockSeeds.push({
      type:
        "cardGrid",

      data: {
        title:
          readString(
            scanWorkflow.title,
          ),

        description:
          readString(
            scanWorkflow
              .description,
          ),

        cards,
      },
    });
  }

  const ocrSection =
    findSection(
      legacy,
      "ocr",
    );

  if (
    ocrSection?.visible
  ) {
    blockSeeds.push({
      type:
        "featureGrid",

      data: {
        title:
          readString(
            ocrSection.title,
          ),

        description:
          readString(
            ocrSection
              .description,
          ),

        items:
          readStringArray(
            ocrSection.data
              .features,
          ),
      },
    });
  }

  const visibleTools =
    [...legacy.tools]
      .filter(
        (
          tool,
        ) =>
          tool.visible,
      )
      .sort(
        (
          a,
          b,
        ) =>
          a.order -
          b.order,
      );

  if (
    visibleTools.length >
    0
  ) {
    blockSeeds.push({
      type:
        "cardGrid",

      data: {
        title:
          "Powerful PDF tools. No clutter.",

        description:
          "Create, convert, organize and work with documents from one simple mobile workspace.",

        cards:
          visibleTools.map(
            (
              tool,
            ) =>
              tool.name,
          ),
      },
    });
  }

  const organizeSection =
    findSection(
      legacy,
      "convertOrganize",
    );

  if (
    organizeSection?.visible
  ) {
    blockSeeds.push({
      type:
        "featureGrid",

      data: {
        title:
          readString(
            organizeSection
              .title,
          ),

        description:
          readString(
            organizeSection
              .description,
          ),

        items:
          readStringArray(
            organizeSection
              .data
              .categories,
          ),
      },
    });
  }

  const esignSection =
    findSection(
      legacy,
      "esign",
    );

  if (
    esignSection?.visible
  ) {
    blockSeeds.push({
      type:
        "featureGrid",

      data: {
        title:
          readString(
            esignSection.title,
          ),

        description:
          readString(
            esignSection
              .description,
          ),

        items:
          readStringArray(
            esignSection.data
              .steps,
          ),
      },
    });
  }

  const visibleFaqs =
    [...legacy.faqs]
      .filter(
        (
          faq,
        ) =>
          faq.visible,
      )
      .sort(
        (
          a,
          b,
        ) =>
          a.order -
          b.order,
      );

  if (
    visibleFaqs.length >
    0
  ) {
    blockSeeds.push({
      type:
        "faq",

      data: {
        title:
          "Everything you need to know.",

        items:
          visibleFaqs.map(
            (
              faq,
            ) =>
              joinNonEmpty([
                faq.question,
                faq.answer,
              ]),
          ),
      },
    });
  }

  const downloadSection =
    findSection(
      legacy,
      "download",
    );

  if (
    downloadSection?.visible
  ) {
    const downloadData =
      downloadSection.data;

    blockSeeds.push({
      type:
        "download",

      data: {
        title:
          readString(
            downloadSection
              .title,
          ),

        description:
          readString(
            downloadSection
              .description,
          ),

        buttonLabel:
          readString(
            downloadData.cta,
          ) ||
          "Get it on Google Play",

        buttonUrl:
          readString(
            downloadData
              .playStoreUrl,
          ) ||
          playStoreUrl,

        image:
          "",
      },
    });
  }

  const blocks =
    blockSeeds.map(
      (
        seed,
        index,
      ) =>
        createBlock(
          seed.type,
          index + 1,
          seed.data,
          now,
        ),
    );

  const headerMenu =
    createHeaderMenu(
      playStoreUrl,
      now,
    );

  const footerMenu =
    createFooterMenu(
      legacy,
      playStoreUrl,
      now,
    );

  return {
    page,

    blocks,

    settings,

    menus: [
      {
        key:
          "header",

        menu:
          headerMenu,
      },

      {
        key:
          "footer",

        menu:
          footerMenu,
      },
    ],
  };
}