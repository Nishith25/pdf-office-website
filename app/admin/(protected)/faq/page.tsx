import {
  HelpCircle,
} from "lucide-react";

import FaqEditor from "../../../../components/admin/faq/FaqEditor";

import {
  getFaqAdminItems,
} from "../../../../lib/repositories/faq-admin";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "FAQ | PDF Office Admin",
};

export default async function AdminFaqPage() {
  const faqs =
    await getFaqAdminItems();

  return (
    <div className="mx-auto max-w-[1300px]">
      <div className="mb-7 border-b border-[#E3E5E9] pb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-[#3157E7]" />

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3157E7]">
            FAQ
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#181B23] sm:text-4xl">
          Frequently asked questions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747B88]">
          Add, edit, reorder or hide questions displayed on the
          PDF Office website.
        </p>
      </div>

      <FaqEditor
        initialFaqs={
          faqs
        }
      />
    </div>
  );
}