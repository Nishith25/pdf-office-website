import {
  LockKeyhole,
} from "lucide-react";

import PasswordEditor from "../../../../components/admin/settings/PasswordEditor";

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
      `Admin Security | ${site.shortName} CMS`,
  };
}

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-[800px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Admin Security
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Administrator security
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Manage the password used to access the GPS Maps CMS.
          Website content and branding are managed from Homepage
          and Appearance.
        </p>
      </div>

      <PasswordEditor />
    </div>
  );
}
