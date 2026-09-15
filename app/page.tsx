import type {
  Metadata,
} from "next";

import PublicHomepage from "../components/site/PublicHomepage";

import {
  getPublicHomepageModel,
} from "../lib/repositories/public-homepage";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const model =
    await getPublicHomepageModel();

  const images =
    model.seo.ogImage
      ? [
          {
            url:
              model.seo
                .ogImage,
          },
        ]
      : undefined;

  return {
    title:
      model.seo.title,

    description:
      model.seo.description,

    keywords:
      model.seo.keywords,

    alternates: {
      canonical:
        model.seo
          .canonicalUrl,
    },

    openGraph: {
      type:
        "website",

      url:
        model.seo
          .canonicalUrl,

      title:
        model.seo
          .ogTitle,

      description:
        model.seo
          .ogDescription,

      siteName:
        model.brand
          .shortName,

      images,
    },

    twitter: {
      card:
        model.seo
          .ogImage
          ? "summary_large_image"
          : "summary",

      title:
        model.seo
          .ogTitle,

      description:
        model.seo
          .ogDescription,

      images:
        model.seo
          .ogImage
          ? [
              model.seo
                .ogImage,
            ]
          : undefined,
    },
  };
}

export default async function HomePage() {
  const model =
    await getPublicHomepageModel();

  return (
    <PublicHomepage
      model={
        model
      }
    />
  );
}