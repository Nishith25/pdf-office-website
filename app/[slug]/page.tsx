import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import PublicCmsPage from "../../components/cms/public/PublicCmsPage";

import PublicSiteShell from "../../components/cms/public/PublicSiteShell";

import {
  buildNextCmsMetadata,
} from "../../lib/cms/public/next-metadata";

import {
  getCmsPublicPageModelBySlug,
} from "../../lib/cms/public/site-data";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      slug:
        string;
    }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<
  Metadata
> {
  const {
    slug,
  } =
    await params;

  const model =
    await getCmsPublicPageModelBySlug(
      slug,
    );

  if (!model) {
    return {};
  }

  return buildNextCmsMetadata(
    model.page,
    model.settings,
  );
}

export default async function CmsPublicPageRoute({
  params,
}: Props) {
  const {
    slug,
  } =
    await params;

  const model =
    await getCmsPublicPageModelBySlug(
      slug,
    );

  if (!model) {
    notFound();
  }

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