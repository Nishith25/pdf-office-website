import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import PublicCmsPage from "../components/cms/public/PublicCmsPage";

import PublicSiteShell from "../components/cms/public/PublicSiteShell";

import {
  buildNextCmsMetadata,
} from "../lib/cms/public/next-metadata";

import {
  getCmsPublicHomepageModel,
} from "../lib/cms/public/site-data";

import {
  buildHomepageStructuredData,
  serializeStructuredData,
} from "../lib/cms/public/structured-data";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<
  Metadata
> {
  const model =
    await getCmsPublicHomepageModel();

  if (!model) {
    return {};
  }

  return buildNextCmsMetadata(
    model.page,
    model.settings,
  );
}

export default async function HomePage() {
  const model =
    await getCmsPublicHomepageModel();

  if (!model) {
    notFound();
  }

  const structuredData =
    buildHomepageStructuredData(
      model.page,
      model.settings,
    );

  return (
    <PublicSiteShell
      settings={
        model.settings
      }
      headerNavigation={
        model.headerNavigation
      }
      footerNavigation={
        model.footerNavigation
      }
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
      >
        {
          serializeStructuredData(
            structuredData,
          )
        }
      </script>

      <PublicCmsPage
        page={
          model.page
        }
        blocks={
          model.blocks
        }
      />
    </PublicSiteShell>
  );
}