import type {
  FAQItem,
  SitePage,
  SiteSection,
  SiteSettings,
  ToolItem,
} from "../cms/types";

import type {
  MediaItem,
} from "../media/validation";

export type PublicHomepageSource = {
  page:
    SitePage | null;

  settings:
    SiteSettings | null;

  sections:
    SiteSection[];

  tools:
    ToolItem[];

  faqs:
    FAQItem[];

  media:
    MediaItem[];
};

export type PublicSection = {
  visible:
    boolean;

  eyebrow:
    string;

  title:
    string;

  description:
    string;

  mediaId:
    string;

  mediaUrl:
    string;
};

export type PublicHomepageModel = {
  brand: {
    brandName:
      string;

    shortName:
      string;

    siteUrl:
      string;

    playStoreUrl:
      string;

    appIconUrl:
      string;

    footerText:
      string;

    privacyUrl:
      string;

    termsUrl:
      string;
  };

  seo: {
    title:
      string;

    description:
      string;

    keywords:
      string[];

    ogTitle:
      string;

    ogDescription:
      string;

    ogImage:
      string;

    canonicalUrl:
      string;
  };

  hero:
    PublicSection & {
      titleTop:
        string;

      titleBottom:
        string;

      primaryCta:
        string;
    };

  scan:
    PublicSection & {
      steps:
        string[];
    };

  ocr:
    PublicSection & {
      features:
        string[];
    };

  organize:
    PublicSection & {
      categories:
        string[];
    };

  esign:
    PublicSection & {
      steps:
        string[];
    };

  download:
    PublicSection & {
      cta:
        string;
    };

  tools:
    ToolItem[];

  faqs:
    FAQItem[];

  proofMedia:
    MediaItem[];
};

function getSection(
  sections:
    SiteSection[],
  key:
    string,
) {
  return sections.find(
    (section) =>
      section.key ===
      key,
  );
}

function getData(
  section:
    SiteSection | undefined,
): Record<
  string,
  unknown
> {
  if (
    section?.data &&
    typeof section.data ===
      "object"
  ) {
    return section.data as Record<
      string,
      unknown
    >;
  }

  return {};
}

function dataString(
  data:
    Record<
      string,
      unknown
    >,
  key:
    string,
  fallback:
    string,
) {
  const value =
    data[key];

  return typeof value ===
    "string" &&
    value.trim()
    ? value.trim()
    : fallback;
}

function dataStrings(
  data:
    Record<
      string,
      unknown
    >,
  key:
    string,
  fallback:
    string[],
) {
  const value =
    data[key];

  if (
    !Array.isArray(
      value,
    )
  ) {
    return fallback;
  }

  const values =
    value.filter(
      (
        item,
      ): item is string =>
        typeof item ===
          "string" &&
        item.trim().length >
          0,
    );

  return values.length
    ? values
    : fallback;
}

function mediaUrl(
  id:
    string | undefined,
  media:
    MediaItem[],
) {
  if (!id) {
    return "";
  }

  return (
    media.find(
      (item) =>
        item.id === id,
    )?.url ?? ""
  );
}

export function buildPublicHomepageModel({
  page,
  settings,
  sections,
  tools,
  faqs,
  media,
}: PublicHomepageSource): PublicHomepageModel {
  const hero =
    getSection(
      sections,
      "hero",
    );

  const scan =
    getSection(
      sections,
      "scanWorkflow",
    );

  const ocr =
    getSection(
      sections,
      "ocr",
    );

  const organize =
    getSection(
      sections,
      "convertOrganize",
    );

  const esign =
    getSection(
      sections,
      "esign",
    );

  const download =
    getSection(
      sections,
      "download",
    );

  const heroData =
    getData(
      hero,
    );

  const scanData =
    getData(
      scan,
    );

  const ocrData =
    getData(
      ocr,
    );

  const organizeData =
    getData(
      organize,
    );

  const esignData =
    getData(
      esign,
    );

  const downloadData =
    getData(
      download,
    );

  const sectionMediaIds =
    [
      hero?.mediaId,
      scan?.mediaId,
      ocr?.mediaId,
      organize?.mediaId,
      esign?.mediaId,
      download?.mediaId,
    ].filter(
      (
        id,
      ): id is string =>
        Boolean(
          id,
        ),
    );

  const proofMedia =
    media.filter(
      (
        item,
      ) =>
        sectionMediaIds.includes(
          item.id,
        ),
    );

  return {
    brand: {
      brandName:
        settings?.brandName ??
        "PDF Office – Doc Scanner",

      shortName:
        settings?.shortName ??
        "PDF Office",

      siteUrl:
        settings?.siteUrl ??
        "https://pdf-office-website.vercel.app",

      playStoreUrl:
        settings?.playStoreUrl ??
        "https://play.google.com/store/apps/details?id=com.pdfoffice.pdf.scanner.converter.esign",

      appIconUrl:
        settings?.appIconUrl ??
        "",

      footerText:
        settings?.footerText ??
        "Scan · Convert · Sign · Organize",

      privacyUrl:
        settings?.privacyUrl ??
        "",

      termsUrl:
        settings?.termsUrl ??
        "",
    },

    seo: {
      title:
        page?.seo.title ??
        "PDF Office – Doc Scanner",

      description:
        page?.seo.description ??
        "Scan documents, work with PDFs, extract text, convert files and add signatures with PDF Office.",

      keywords:
        page?.seo.keywords ??
        [
          "PDF scanner",
          "document scanner",
          "OCR",
          "PDF tools",
          "eSign",
        ],

      ogTitle:
        page?.seo.ogTitle ??
        page?.seo.title ??
        "PDF Office – Doc Scanner",

      ogDescription:
        page?.seo.ogDescription ??
        page?.seo.description ??
        "A practical PDF and document workspace for mobile.",

      ogImage:
        page?.seo.ogImage ??
        "",

      canonicalUrl:
        page?.seo.canonicalUrl ??
        settings?.siteUrl ??
        "https://pdf-office-website.vercel.app",
    },

    hero: {
      visible:
        hero?.visible ??
        true,

      eyebrow:
        hero?.eyebrow ??
        "PDF Office · Mobile Document Workspace",

      title:
        hero?.title ??
        "Documents without friction.",

      titleTop:
        dataString(
          heroData,
          "titleTop",
          "Scan. Convert. Sign.",
        ),

      titleBottom:
        dataString(
          heroData,
          "titleBottom",
          "Keep documents moving.",
        ),

      description:
        hero?.description ??
        "A focused document workspace for scanning, converting, organizing and signing PDFs from your phone.",

      primaryCta:
        dataString(
          heroData,
          "primaryCta",
          "Get PDF Office",
        ),

      mediaId:
        hero?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          hero?.mediaId,
          media,
        ),
    },

    scan: {
      visible:
        scan?.visible ??
        true,

      eyebrow:
        scan?.eyebrow ??
        "Document Scanner",

      title:
        scan?.title ??
        "Paper in. Clean PDF out.",

      description:
        scan?.description ??
        "Capture pages, detect edges, improve readability and build multi-page documents.",

      mediaId:
        scan?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          scan?.mediaId,
          media,
        ),

      steps:
        dataStrings(
          scanData,
          "steps",
          [
            "Capture",
            "Detect edges",
            "Enhance",
            "Save PDF",
          ],
        ),
    },

    ocr: {
      visible:
        ocr?.visible ??
        true,

      eyebrow:
        ocr?.eyebrow ??
        "OCR",

      title:
        ocr?.title ??
        "Make scanned text usable again.",

      description:
        ocr?.description ??
        "Extract readable text from scanned pages and images instead of retyping it.",

      mediaId:
        ocr?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          ocr?.mediaId,
          media,
        ),

      features:
        dataStrings(
          ocrData,
          "features",
          [
            "Camera OCR",
            "Gallery OCR",
            "Extract text",
            "Copy and reuse",
          ],
        ),
    },

    organize: {
      visible:
        organize?.visible ??
        true,

      eyebrow:
        organize?.eyebrow ??
        "Convert & Organize",

      title:
        organize?.title ??
        "Files that behave like a workspace.",

      description:
        organize?.description ??
        "Convert common file formats and keep important documents easier to find.",

      mediaId:
        organize?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          organize?.mediaId,
          media,
        ),

      categories:
        dataStrings(
          organizeData,
          "categories",
          [
            "All Docs",
            "Business",
            "ID Cards",
            "Academic",
            "Personal",
          ],
        ),
    },

    esign: {
      visible:
        esign?.visible ??
        true,

      eyebrow:
        esign?.eyebrow ??
        "eSign",

      title:
        esign?.title ??
        "Sign the document. Skip the printer.",

      description:
        esign?.description ??
        "Add your signature directly to documents and continue the workflow digitally.",

      mediaId:
        esign?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          esign?.mediaId,
          media,
        ),

      steps:
        dataStrings(
          esignData,
          "steps",
          [
            "Open document",
            "Add signature",
            "Position & confirm",
            "Save & share",
          ],
        ),
    },

    download: {
      visible:
        download?.visible ??
        true,

      eyebrow:
        download?.eyebrow ??
        "PDF Office",

      title:
        download?.title ??
        "Your documents already have enough complexity.",

      description:
        download?.description ??
        "Keep the tools simple.",

      mediaId:
        download?.mediaId ??
        "",

      mediaUrl:
        mediaUrl(
          download?.mediaId,
          media,
        ),

      cta:
        dataString(
          downloadData,
          "cta",
          "Get it on Google Play",
        ),
    },

    tools:
      tools
        .filter(
          (tool) =>
            tool.visible,
        )
        .sort(
          (
            a,
            b,
          ) =>
            a.order -
            b.order,
        ),

    faqs:
      faqs
        .filter(
          (faq) =>
            faq.visible,
        )
        .sort(
          (
            a,
            b,
          ) =>
            a.order -
            b.order,
        ),

    proofMedia,
  };
}