"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";

import {
  saveFaqsAction,
} from "../../../app/admin/(protected)/faq/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import type {
  FAQAdminItem,
} from "../../../lib/admin/faq-editor";

import {
  normalizeFaqOrders,
} from "../../../lib/admin/faq-editor";

import {
  moveArrayItem,
} from "../../../lib/admin/list-editor";

import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";

type FaqEditorProps = {
  initialFaqs:
    FAQAdminItem[];
};

export default function FaqEditor({
  initialFaqs,
}: FaqEditorProps) {
  const [
    faqs,
    setFaqs,
  ] =
    useState(
      normalizeFaqOrders(
        initialFaqs,
      ),
    );

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveFaqsAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

  function updateFaq(
    index:
      number,

    changes:
      Partial<FAQAdminItem>,
  ) {
    setFaqs(
      (current) =>
        normalizeFaqOrders(
          current.map(
            (
              faq,
              currentIndex,
            ) =>
              currentIndex ===
              index
                ? {
                    ...faq,
                    ...changes,
                  }
                : faq,
          ),
        ),
    );
  }

  function moveFaq(
    index: number,
    direction:
      -1 | 1,
  ) {
    setFaqs(
      (current) =>
        normalizeFaqOrders(
          moveArrayItem(
            current,
            index,
            index +
              direction,
          ),
        ),
    );
  }

  function addFaq() {
    setFaqs(
      (current) =>
        normalizeFaqOrders([
          ...current,

          {
            id:
              `new:${crypto.randomUUID()}`,

            question:
              "New question",

            answer:
              "Add the answer here.",

            visible: true,

            order:
              current.length +
              1,
          },
        ]),
    );
  }

  function deleteFaq(
    index:
      number,
  ) {
    const confirmed =
      window.confirm(
        "Remove this FAQ? It will be deleted from the website when you save changes.",
      );

    if (!confirmed) {
      return;
    }

    setFaqs(
      (current) =>
        normalizeFaqOrders(
          current.filter(
            (
              _faq,
              currentIndex,
            ) =>
              currentIndex !==
              index,
          ),
        ),
    );
  }

  return (
    <form
      action={
        formAction
      }
    >
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify(
          normalizeFaqOrders(
            faqs,
          ),
        )}
      />

      {notice && (
        <div className="mb-5">
          <AdminNotice
            tone={
              notice.tone
            }
            message={
              notice.message
            }
          />
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] text-[#9298A3]">
          {faqs.length} FAQ
          {faqs.length ===
          1
            ? ""
            : "s"}
        </p>

        <button
          type="button"
          onClick={
            addFaq
          }
          className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#20242C] px-4 text-[10px] font-semibold text-white transition hover:bg-[#303641]"
        >
          <Plus className="h-3.5 w-3.5" />

          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map(
          (
            faq,
            index,
          ) => (
            <section
              key={
                faq.id
              }
              className="overflow-hidden rounded-[16px] border border-[#E2E4E8] bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEEF1] bg-[#FAFAFB] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#EEF2FF] text-[9px] font-bold text-[#3157E7]">
                    {index +
                      1}
                  </span>

                  <span className="text-[10px] font-semibold text-[#555C68]">
                    FAQ item
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={
                      index ===
                      0
                    }
                    onClick={() =>
                      moveFaq(
                        index,
                        -1,
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E0E3E8] bg-white disabled:opacity-30"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={
                      index ===
                      faqs.length -
                        1
                    }
                    onClick={() =>
                      moveFaq(
                        index,
                        1,
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E0E3E8] bg-white disabled:opacity-30"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateFaq(
                        index,
                        {
                          visible:
                            !faq.visible,
                        },
                      )
                    }
                    className={`flex min-h-8 items-center gap-1.5 rounded-[8px] border px-2.5 text-[9px] font-semibold ${
                      faq.visible
                        ? "border-[#CFE2D5] bg-[#F2FAF4] text-[#3D7750]"
                        : "border-[#E0E2E6] bg-white text-[#858B95]"
                    }`}
                  >
                    {faq.visible
                      ? (
                        <Eye className="h-3 w-3" />
                      )
                      : (
                        <EyeOff className="h-3 w-3" />
                      )}

                    {faq.visible
                      ? "Visible"
                      : "Hidden"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteFaq(
                        index,
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#EACFCF] bg-white text-[#B04C4C] transition hover:bg-[#FFF5F5]"
                    aria-label="Delete FAQ"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <label className="text-[10px] font-semibold text-[#343A46]">
                    Question
                  </label>

                  <textarea
                    value={
                      faq.question
                    }
                    onChange={(
                      event,
                    ) =>
                      updateFaq(
                        index,
                        {
                          question:
                            event
                              .target
                              .value,
                        },
                      )
                    }
                    className="mt-2 min-h-[105px] w-full resize-y rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 py-3 text-sm font-medium leading-6 text-[#242832] outline-none focus:border-[#617CE4]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-[#343A46]">
                    Answer
                  </label>

                  <textarea
                    value={
                      faq.answer
                    }
                    onChange={(
                      event,
                    ) =>
                      updateFaq(
                        index,
                        {
                          answer:
                            event
                              .target
                              .value,
                        },
                      )
                    }
                    className="mt-2 min-h-[105px] w-full resize-y rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 py-3 text-sm leading-6 text-[#555C68] outline-none focus:border-[#617CE4]"
                  />
                </div>
              </div>
            </section>
          ),
        )}

        {faqs.length ===
          0 && (
          <div className="rounded-[16px] border border-dashed border-[#D6D9DF] bg-white px-6 py-14 text-center">
            <p className="text-sm font-semibold text-[#444A56]">
              No FAQs
            </p>

            <p className="mt-2 text-[10px] text-[#9298A3]">
              Add your first FAQ using the button above.
            </p>
          </div>
        )}
      </div>

      <AdminSaveBar
        saving={
          saving
        }
      />
    </form>
  );
}