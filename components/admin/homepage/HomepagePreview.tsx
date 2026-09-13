import {
  Check,
  FileText,
  ScanLine,
  Signature,
  Sparkles,
  Type,
} from "lucide-react";

import type {
  HomepageEditorInput,
} from "../../../lib/admin/homepage-editor";

type HomepagePreviewProps = {
  value:
    HomepageEditorInput;
};

function PreviewSection({
  eyebrow,
  title,
  description,
  visible,
  icon:
    Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  visible: boolean;
  icon:
    typeof FileText;
}) {
  if (!visible) {
    return null;
  }

  return (
    <section className="border-t border-[#E9E7E2] px-5 py-7">
      <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#3157E7]">
        <Icon className="h-3 w-3" />

        {eyebrow}
      </div>

      <h3 className="mt-3 max-w-[330px] text-[20px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#191C24]">
        {title}
      </h3>

      <p className="mt-3 max-w-[360px] text-[10px] leading-[1.7] text-[#727883]">
        {description}
      </p>
    </section>
  );
}

export default function HomepagePreview({
  value,
}: HomepagePreviewProps) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#DADDE3] bg-[#ECEDEF]">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-[#D9DCE1] bg-[#F8F8F9] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#D2D5DA]" />
          <span className="h-2 w-2 rounded-full bg-[#D2D5DA]" />
          <span className="h-2 w-2 rounded-full bg-[#D2D5DA]" />
        </div>

        <div className="rounded-full border border-[#E2E4E8] bg-white px-5 py-1 text-[7px] text-[#999EA7]">
          pdf-office-website.vercel.app
        </div>

        <span className="w-8" />
      </div>

      <div className="max-h-[700px] overflow-y-auto bg-[#FAF9F6]">
        {/* Preview navigation */}
        <div className="flex items-center justify-between border-b border-[#EBE9E4] bg-[#FAF9F6] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#3157E7]">
              <FileText className="h-3 w-3 text-white" />
            </div>

            <span className="text-[9px] font-bold text-[#20242C]">
              PDF Office
            </span>
          </div>

          <div className="flex gap-3 text-[7px] font-medium text-[#767C86]">
            <span>
              Tools
            </span>

            <span>
              Scanner
            </span>

            <span>
              OCR
            </span>
          </div>
        </div>

        {/* Hero */}
        {value.hero.visible && (
          <section className="relative overflow-hidden px-5 py-9">
            <div className="grid grid-cols-[1.12fr_0.88fr] gap-5">
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.17em] text-[#3157E7]">
                  {
                    value.hero
                      .eyebrow
                  }
                </p>

                <h2 className="mt-3 text-[26px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#161920]">
                  {
                    value.hero
                      .titleTop
                  }

                  <span className="mt-1 block text-[#3157E7]">
                    {
                      value.hero
                        .titleBottom
                    }
                  </span>
                </h2>

                <p className="mt-4 max-w-[245px] text-[9px] leading-[1.7] text-[#707680]">
                  {
                    value.hero
                      .description
                  }
                </p>

                <div className="mt-4 inline-flex rounded-[7px] bg-[#20242C] px-3 py-2 text-[7px] font-semibold text-white">
                  {
                    value.hero
                      .primaryCta
                  }
                </div>
              </div>

              {/* Document workspace visual */}
              <div className="relative min-h-[190px]">
                <div className="absolute right-0 top-3 h-[165px] w-[120px] rotate-[4deg] rounded-[8px] border border-[#DADDE2] bg-white shadow-[0_10px_30px_rgba(33,38,49,0.1)]">
                  <div className="border-b border-[#ECEDEF] px-3 py-3">
                    <div className="h-2 w-12 rounded-full bg-[#DCE3FD]" />
                  </div>

                  <div className="space-y-2 px-3 py-3">
                    <div className="h-1.5 w-full rounded bg-[#EBEDF0]" />
                    <div className="h-1.5 w-[88%] rounded bg-[#EBEDF0]" />

                    <div className="rounded-[4px] bg-[#FFF1D9] px-1 py-1">
                      <div className="h-1.5 w-[80%] rounded bg-[#EDC377]" />
                    </div>

                    <div className="h-1.5 w-full rounded bg-[#EBEDF0]" />
                    <div className="h-1.5 w-[70%] rounded bg-[#EBEDF0]" />
                  </div>

                  <div className="absolute bottom-4 right-3 rotate-[-8deg] text-[11px] italic text-[#2E8B57]">
                    Signed
                  </div>
                </div>

                <div className="absolute left-0 top-7 flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#DCE1F2] bg-white shadow-sm">
                  <ScanLine className="h-3.5 w-3.5 text-[#3157E7]" />
                </div>

                <div className="absolute bottom-2 left-6 flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#E6DDF0] bg-white shadow-sm">
                  <Type className="h-3.5 w-3.5 text-[#8A55B1]" />
                </div>
              </div>
            </div>
          </section>
        )}

        <PreviewSection
          eyebrow={
            value
              .scanWorkflow
              .eyebrow
          }
          title={
            value
              .scanWorkflow
              .title
          }
          description={
            value
              .scanWorkflow
              .description
          }
          visible={
            value
              .scanWorkflow
              .visible
          }
          icon={
            ScanLine
          }
        />

        <PreviewSection
          eyebrow={
            value.ocr
              .eyebrow
          }
          title={
            value.ocr
              .title
          }
          description={
            value.ocr
              .description
          }
          visible={
            value.ocr
              .visible
          }
          icon={Type}
        />

        <PreviewSection
          eyebrow={
            value
              .convertOrganize
              .eyebrow
          }
          title={
            value
              .convertOrganize
              .title
          }
          description={
            value
              .convertOrganize
              .description
          }
          visible={
            value
              .convertOrganize
              .visible
          }
          icon={
            Sparkles
          }
        />

        <PreviewSection
          eyebrow={
            value.esign
              .eyebrow
          }
          title={
            value.esign
              .title
          }
          description={
            value.esign
              .description
          }
          visible={
            value.esign
              .visible
          }
          icon={
            Signature
          }
        />

        {value.download.visible && (
          <section className="border-t border-[#E7E4DD] bg-[#1D2230] px-5 py-7 text-white">
            <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-[#96AAFF]">
              {
                value.download
                  .eyebrow
              }
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <h3 className="max-w-[250px] text-[18px] font-semibold leading-[1.08] tracking-[-0.04em]">
                  {
                    value.download
                      .title
                  }
                </h3>

                <p className="mt-2 max-w-[280px] text-[8px] leading-5 text-white/55">
                  {
                    value.download
                      .description
                  }
                </p>
              </div>

              <div className="shrink-0 rounded-[6px] bg-white px-3 py-2 text-[7px] font-semibold text-[#20242C]">
                {
                  value.download
                    .cta
                }
              </div>
            </div>
          </section>
        )}

        <footer className="flex items-center justify-between border-t border-[#E6E4DE] px-5 py-4 text-[7px] text-[#999EA5]">
          <span>
            PDF Office
          </span>

          <div className="flex items-center gap-1">
            <Check className="h-2.5 w-2.5" />

            Preview only
          </div>
        </footer>
      </div>
    </div>
  );
}