import {
  Settings,
} from "lucide-react";

import PasswordEditor from "../../../../components/admin/settings/PasswordEditor";
import SiteSettingsEditor from "../../../../components/admin/settings/SiteSettingsEditor";

import {
  createSiteSettingsEditorState,
} from "../../../../lib/admin/settings-editor";

import {
  getSiteSettings,
} from "../../../../lib/repositories/site-content";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Settings | PDF Office Admin",
};

export default async function AdminSettingsPage() {
  const settings =
    await getSiteSettings();

  const initialValue =
    createSiteSettingsEditorState(
      settings,
    );

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            Settings
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Website settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Manage global website information and administrator security.
        </p>
      </div>

      <div className="space-y-7">
        <SiteSettingsEditor
          initialValue={
            initialValue
          }
        />

        <PasswordEditor />
      </div>
    </div>
  );
}