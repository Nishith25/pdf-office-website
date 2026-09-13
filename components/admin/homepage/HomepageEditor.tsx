"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  Eye,
  FileText,
  FolderKanban,
  ScanLine,
  Signature,
  Type,
  X,
} from "lucide-react";

import type {
  HomepageEditorInput,
} from "../../../lib/admin/homepage-editor";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import {
  saveHomepageAction,
} from "../../../app/admin/(protected)/homepage/actions";

import AdminField from "../forms/AdminField";
import AdminNotice from "../forms/AdminNotice";
import AdminSaveBar from "../forms/AdminSaveBar";
import AdminTextarea from "../forms/AdminTextarea";
import AdminToggle from "../forms/AdminToggle";

import HomepagePreview from "./HomepagePreview";

type HomepageEditorProps = {
  initialValue:
    HomepageEditorInput;
};

type SectionCardProps = {
  number: string;
  title: string;
  description: string;
  icon:
    typeof FileText;
  children:
    React.ReactNode;
};

function SectionCard({
  number,
  title,
  description,
  icon: Icon,
  children,
}: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#E2E4E8] bg-white">
      <div className="flex items-start gap-3 border-b border-[#ECEEF1] px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F0F3FF]">
          <Icon className="h-4 w-4 text-[#3157E7]" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#3157E7]">
              {number}
            </span>

            <h2 className="text-sm font-semibold text-[#222631]">
              {title}
            </h2>
          </div>

          <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {children}
      </div>
    </section>
  );
}

export default function HomepageEditor({
  initialValue,
}: HomepageEditorProps) {
  const [
    value,
    setValue,
  ] =
    useState<HomepageEditorInput>(
      initialValue,
    );

  const [
    showMobilePreview,
    setShowMobilePreview,
  ] =
    useState(false);

  const [
    result,
    formAction,
    saving,
  ] =
    useActionState(
      saveHomepageAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

  return (
    <>
      <form
        action={
          formAction
        }
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* Editor */}
          <div className="min-w-0 space-y-5">
            {notice && (
              <AdminNotice
                tone={
                  notice.tone
                }
                message={
                  notice.message
                }
              />
            )}

            {/* HERO */}
            <SectionCard
              number="01"
              title="Hero"
              description="Primary message shown at the top of the public website."
              icon={
                FileText
              }
            >
              <input
                type="hidden"
                name="hero.visible"
                value={
                  value.hero
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show hero"
                description="Hide this section from the public homepage without deleting its content."
                checked={
                  value.hero
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      hero: {
                        ...current.hero,
                        visible,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                hint="Max 100 characters"
                name="hero.eyebrow"
                value={
                  value.hero
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      hero: {
                        ...current.hero,

                        eyebrow:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField
                  label="Main title"
                  name="hero.titleTop"
                  value={
                    value.hero
                      .titleTop
                  }
                  onChange={(
                    event,
                  ) =>
                    setValue(
                      (
                        current,
                      ) => ({
                        ...current,

                        hero: {
                          ...current.hero,

                          titleTop:
                            event
                              .target
                              .value,
                        },
                      }),
                    )
                  }
                />

                <AdminField
                  label="Accent title"
                  name="hero.titleBottom"
                  value={
                    value.hero
                      .titleBottom
                  }
                  onChange={(
                    event,
                  ) =>
                    setValue(
                      (
                        current,
                      ) => ({
                        ...current,

                        hero: {
                          ...current.hero,

                          titleBottom:
                            event
                              .target
                              .value,
                        },
                      }),
                    )
                  }
                />
              </div>

              <AdminTextarea
                label="Description"
                hint="Public hero description"
                name="hero.description"
                value={
                  value.hero
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      hero: {
                        ...current.hero,

                        description:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Primary button text"
                name="hero.primaryCta"
                value={
                  value.hero
                    .primaryCta
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      hero: {
                        ...current.hero,

                        primaryCta:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />
            </SectionCard>

            {/* SCANNER */}
            <SectionCard
              number="02"
              title="Scan workflow"
              description="Document scanning, edge detection and enhancement section."
              icon={
                ScanLine
              }
            >
              <input
                type="hidden"
                name="scanWorkflow.visible"
                value={
                  value
                    .scanWorkflow
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show scan workflow"
                checked={
                  value
                    .scanWorkflow
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      scanWorkflow:
                        {
                          ...current.scanWorkflow,
                          visible,
                        },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                name="scanWorkflow.eyebrow"
                value={
                  value
                    .scanWorkflow
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      scanWorkflow:
                        {
                          ...current.scanWorkflow,

                          eyebrow:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />

              <AdminField
                label="Title"
                name="scanWorkflow.title"
                value={
                  value
                    .scanWorkflow
                    .title
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      scanWorkflow:
                        {
                          ...current.scanWorkflow,

                          title:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />

              <AdminTextarea
                label="Description"
                name="scanWorkflow.description"
                value={
                  value
                    .scanWorkflow
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      scanWorkflow:
                        {
                          ...current.scanWorkflow,

                          description:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />
            </SectionCard>

            {/* OCR */}
            <SectionCard
              number="03"
              title="Scanner & OCR"
              description="Controls the document-to-text transformation section."
              icon={
                Type
              }
            >
              <input
                type="hidden"
                name="ocr.visible"
                value={
                  value.ocr
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show OCR section"
                checked={
                  value.ocr
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      ocr: {
                        ...current.ocr,
                        visible,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                name="ocr.eyebrow"
                value={
                  value.ocr
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      ocr: {
                        ...current.ocr,

                        eyebrow:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Title"
                name="ocr.title"
                value={
                  value.ocr
                    .title
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      ocr: {
                        ...current.ocr,

                        title:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminTextarea
                label="Description"
                name="ocr.description"
                value={
                  value.ocr
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      ocr: {
                        ...current.ocr,

                        description:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />
            </SectionCard>

            {/* CONVERT */}
            <SectionCard
              number="04"
              title="Convert & Organize"
              description="File conversion and document workspace messaging."
              icon={
                FolderKanban
              }
            >
              <input
                type="hidden"
                name="convertOrganize.visible"
                value={
                  value
                    .convertOrganize
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show Convert & Organize"
                checked={
                  value
                    .convertOrganize
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      convertOrganize:
                        {
                          ...current.convertOrganize,
                          visible,
                        },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                name="convertOrganize.eyebrow"
                value={
                  value
                    .convertOrganize
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      convertOrganize:
                        {
                          ...current.convertOrganize,

                          eyebrow:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />

              <AdminField
                label="Title"
                name="convertOrganize.title"
                value={
                  value
                    .convertOrganize
                    .title
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      convertOrganize:
                        {
                          ...current.convertOrganize,

                          title:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />

              <AdminTextarea
                label="Description"
                name="convertOrganize.description"
                value={
                  value
                    .convertOrganize
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      convertOrganize:
                        {
                          ...current.convertOrganize,

                          description:
                            event
                              .target
                              .value,
                        },
                    }),
                  )
                }
              />
            </SectionCard>

            {/* ESIGN */}
            <SectionCard
              number="05"
              title="eSign"
              description="Digital signature and paperless document messaging."
              icon={
                Signature
              }
            >
              <input
                type="hidden"
                name="esign.visible"
                value={
                  value.esign
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show eSign"
                checked={
                  value.esign
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      esign: {
                        ...current.esign,
                        visible,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                name="esign.eyebrow"
                value={
                  value.esign
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      esign: {
                        ...current.esign,

                        eyebrow:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Title"
                name="esign.title"
                value={
                  value.esign
                    .title
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      esign: {
                        ...current.esign,

                        title:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminTextarea
                label="Description"
                name="esign.description"
                value={
                  value.esign
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      esign: {
                        ...current.esign,

                        description:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />
            </SectionCard>

            {/* DOWNLOAD */}
            <SectionCard
              number="06"
              title="Download CTA"
              description="Final Google Play download call-to-action."
              icon={
                Eye
              }
            >
              <input
                type="hidden"
                name="download.visible"
                value={
                  value.download
                    .visible
                    ? "true"
                    : "false"
                }
              />

              <AdminToggle
                label="Show download CTA"
                checked={
                  value.download
                    .visible
                }
                onChange={(
                  visible,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      download: {
                        ...current.download,
                        visible,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Eyebrow"
                name="download.eyebrow"
                value={
                  value.download
                    .eyebrow
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      download: {
                        ...current.download,

                        eyebrow:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Title"
                name="download.title"
                value={
                  value.download
                    .title
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      download: {
                        ...current.download,

                        title:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminTextarea
                label="Description"
                name="download.description"
                value={
                  value.download
                    .description
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      download: {
                        ...current.download,

                        description:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />

              <AdminField
                label="Button text"
                name="download.cta"
                value={
                  value.download
                    .cta
                }
                onChange={(
                  event,
                ) =>
                  setValue(
                    (
                      current,
                    ) => ({
                      ...current,

                      download: {
                        ...current.download,

                        cta:
                          event
                            .target
                            .value,
                      },
                    }),
                  )
                }
              />
            </SectionCard>

            <AdminSaveBar
              saving={
                saving
              }
              onPreview={() =>
                setShowMobilePreview(
                  true,
                )
              }
            />
          </div>

          {/* Desktop preview */}
          <aside className="hidden xl:block">
            <div className="sticky top-[88px]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#3157E7]">
                    Unsaved preview
                  </p>

                  <p className="mt-1 text-[9px] text-[#969CA7]">
                    Updates while you type
                  </p>
                </div>

                <div className="rounded-full border border-[#DCE0E7] bg-white px-2.5 py-1 text-[8px] font-semibold text-[#737A87]">
                  Preview only
                </div>
              </div>

              <HomepagePreview
                value={
                  value
                }
              />
            </div>
          </aside>
        </div>
      </form>

      {/* Mobile / tablet preview */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-[100] bg-[#171A22]/50 p-3 backdrop-blur-sm xl:hidden">
          <div className="mx-auto flex h-full max-w-2xl flex-col overflow-hidden rounded-[18px] bg-[#F5F6F8] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E4E8] bg-white px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-[#222631]">
                  Homepage preview
                </p>

                <p className="mt-0.5 text-[9px] text-[#969CA7]">
                  Unsaved changes
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMobilePreview(
                    false,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#E0E3E8] bg-white"
                aria-label="Close preview"
              >
                <X className="h-4 w-4 text-[#555C69]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
              <HomepagePreview
                value={
                  value
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}