import {
  redirect,
} from "next/navigation";

import {
  getCmsHomepage,
} from "../../../../lib/repositories/cms-pages";

import {
  getSiteConfig,
} from "../../../../lib/site/config";

export const dynamic =
  "force-dynamic";

export function generateMetadata() {
  const site =
    getSiteConfig();

  return {
    title:
      `Homepage | ${site.shortName} Admin`,
  };
}

export default async function AdminHomepagePage() {
  const homepage =
    await getCmsHomepage();

  if (!homepage) {
    redirect(
      "/admin/pages",
    );
  }

  redirect(
    `/admin/pages/${homepage.id}`,
  );
}
