import type {
  LucideIcon,
} from "lucide-react";

import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  Crop,
  FileImage,
  FileOutput,
  FilePenLine,
  FileStack,
  Files,
  FolderOpen,
  ImageIcon,
  Merge,
  MoveRight,
  ScanLine,
  Search,
  ShieldCheck,
  Signature,
  Sparkles,
  Split,
  Type,
  Upload,
} from "lucide-react";

import type {
  ToolItem,
} from "../../lib/cms/types";

import type {
  PublicHomepageModel,
} from "../../lib/public/homepage-model";

type Props = {
  model:
    PublicHomepageModel;
};

function toolIcon(
  tool:
    ToolItem,
): LucideIcon {
  const type =
    tool.type.toLowerCase();

  if (
    type.includes(
      "merge",
    )
  ) {
    return Merge;
  }

  if (
    type.includes(
      "split",
    )
  ) {
    return Split;
  }

  if (
    type.includes(
      "sign",
    )
  ) {
    return Signature;
  }

  if (
    type.includes(
      "scan",
    )
  ) {
    return ScanLine;
  }

  if (
    type.includes(
      "ocr",
    )
  ) {
    return Type;
  }

  if (
    type.includes(
      "image",
    )
  ) {
    return FileImage;
  }

  if (
    type.includes(
      "word",
    ) ||
    type.includes(
      "excel",
    ) ||
    type.includes(
      "convert",
    )
  ) {
    return FileOutput;
  }

  if (
    type.includes(
      "water",
    )
  ) {
    return FilePenLine;
  }

  return Files;
}

function StoreButton({
  href,
  label,
}: {
  href:
    string;

  label:
    string;
}) {
  return (
    <a
      href={
        href
      }
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-12 items-center gap-3 bg-[#181A1F] px-5 text-sm font-semibold text-white transition hover:bg-[#2A2D34]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#181A1F]">
        <ArrowDownRight className="h-3.5 w-3.5" />
      </span>

      {label}
    </a>
  );
}

function SectionMarker({
  index,
  label,
}: {
  index:
    string;

  label:
    string;
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#777C86]">
      <span className="font-mono text-[#BC4A35]">
        {index}
      </span>

      <span className="h-px w-8 bg-[#C9CBCF]" />

      {label}
    </div>
  );
}

function MediaPanel({
  url,
  alt,
  className = "",
}: {
  url:
    string;

  alt:
    string;

  className?:
    string;
}) {
  if (!url) {
    return null;
  }

  return (
    <div
      className={`overflow-hidden border border-[#D9D9D5] bg-white ${className}`}
    >
      <img
        src={
          url
        }
        alt={
          alt
        }
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function PublicHomepage({
  model,
}: Props) {
  const featuredTools =
    model.tools.filter(
      (tool) =>
        tool.featured,
    );

  const displayedTools =
    (
      featuredTools.length
        ? featuredTools
        : model.tools
    ).slice(
      0,
      9,
    );

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F4F0] text-[#191B20] selection:bg-[#191B20] selection:text-white">
      {/* Navigation */}
      <header className="border-b border-[#DCDCD7] bg-[#F8F7F3]/95">
        <div className="mx-auto flex min-h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="flex items-center gap-3"
          >
            {model.brand
              .appIconUrl ? (
              <img
                src={
                  model.brand
                    .appIconUrl
                }
                alt=""
                className="h-9 w-9 rounded-[9px] object-cover"
              />
            ) : (
              <div className="relative flex h-9 w-9 items-center justify-center border border-[#C8C9C5] bg-white">
                <div className="absolute right-0 top-0 h-3 w-3 border-b border-l border-[#C8C9C5] bg-[#F5F4F0]" />

                <span className="text-[9px] font-black tracking-[-0.08em] text-[#D94C36]">
                  PDF
                </span>
              </div>
            )}

            <div>
              <p className="text-[13px] font-bold tracking-[-0.025em]">
                {
                  model.brand
                    .shortName
                }
              </p>

              <p className="text-[8px] uppercase tracking-[0.14em] text-[#8B8E95]">
                Document Workspace
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#scanner"
              className="text-[11px] font-medium text-[#60636B] transition hover:text-black"
            >
              Scanner
            </a>

            <a
              href="#tools"
              className="text-[11px] font-medium text-[#60636B] transition hover:text-black"
            >
              PDF Tools
            </a>

            <a
              href="#ocr"
              className="text-[11px] font-medium text-[#60636B] transition hover:text-black"
            >
              OCR
            </a>

            <a
              href="#organize"
              className="text-[11px] font-medium text-[#60636B] transition hover:text-black"
            >
              Organize
            </a>

            <a
              href="#faq"
              className="text-[11px] font-medium text-[#60636B] transition hover:text-black"
            >
              FAQ
            </a>
          </nav>

          <a
            href={
              model.brand
                .playStoreUrl
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 border border-[#1C1E23] bg-[#1C1E23] px-4 text-[10px] font-semibold text-white transition hover:bg-transparent hover:text-[#1C1E23]"
          >
            Download

            <ArrowDownRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      {model.hero.visible && (
        <section
          id="top"
          className="relative border-b border-[#D8D8D3]"
        >
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.93fr_1.07fr]">
            <div className="flex min-h-[650px] flex-col justify-between border-[#D8D8D3] px-5 py-12 sm:px-8 lg:border-r lg:px-12 lg:py-16">
              <div>
                <SectionMarker
                  index="01"
                  label={
                    model.hero
                      .eyebrow
                  }
                />

                <h1 className="mt-12 max-w-[680px] text-[52px] font-semibold leading-[0.93] tracking-[-0.065em] sm:text-[70px] lg:text-[82px]">
                  <span className="block">
                    {
                      model.hero
                        .titleTop
                    }
                  </span>

                  <span className="mt-2 block text-[#767A82]">
                    {
                      model.hero
                        .titleBottom
                    }
                  </span>
                </h1>

                <p className="mt-8 max-w-[560px] text-[15px] leading-7 text-[#656971]">
                  {
                    model.hero
                      .description
                  }
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <StoreButton
                  href={
                    model.brand
                      .playStoreUrl
                  }
                  label={
                    model.hero
                      .primaryCta
                  }
                />

                <div className="max-w-[225px] border-l border-[#C9CAC6] pl-4 text-[9px] leading-5 text-[#82858B]">
                  Scan documents.
                  Convert files.
                  Extract text.
                  Add signatures.
                  Keep everything moving
                  from one app.
                </div>
              </div>
            </div>

            <div className="relative min-h-[650px] bg-[#E9E8E3] p-5 sm:p-8 lg:p-12">
              <div className="absolute left-7 top-7 font-mono text-[9px] uppercase tracking-[0.18em] text-[#81848A]">
                LIVE DOCUMENT
                WORKSPACE
              </div>

              <div className="mx-auto mt-12 max-w-[620px] border border-[#C5C6C1] bg-[#F8F8F5] shadow-[8px_10px_0_0_#D4D4CF]">
                <div className="flex h-11 items-center justify-between border-b border-[#D5D5D0] px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#D04C38]" />

                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#7C7F85]">
                      scan_092.pdf
                    </span>
                  </div>

                  <span className="font-mono text-[8px] text-[#94969B]">
                    04 PAGES
                  </span>
                </div>

                <div className="grid min-h-[470px] md:grid-cols-[76px_1fr]">
                  <div className="hidden border-r border-[#D8D8D3] p-2 md:block">
                    {[
                      1,
                      2,
                      3,
                    ].map(
                      (
                        page,
                      ) => (
                        <div
                          key={
                            page
                          }
                          className="mb-2 aspect-[3/4] border border-[#D5D5D0] bg-white p-2"
                        >
                          <div className="h-1 w-2/3 bg-[#BDBFBE]" />

                          <div className="mt-2 h-1 w-full bg-[#E0E0DC]" />

                          <div className="mt-1 h-1 w-4/5 bg-[#E0E0DC]" />
                        </div>
                      ),
                    )}
                  </div>

                  <div className="relative flex items-center justify-center overflow-hidden bg-[#DADBDA] p-7">
                    {model.hero
                      .mediaUrl ? (
                      <img
                        src={
                          model.hero
                            .mediaUrl
                        }
                        alt="PDF Office application"
                        className="relative z-10 max-h-[400px] w-auto max-w-full object-contain shadow-xl"
                      />
                    ) : (
                      <div className="relative aspect-[3/4] w-full max-w-[320px] border border-[#C8C9C5] bg-white p-8 shadow-lg">
                        <div className="flex justify-between border-b border-[#E0E0DC] pb-4">
                          <div>
                            <div className="h-2 w-20 bg-[#282B31]" />

                            <div className="mt-2 h-1.5 w-28 bg-[#D5D6D2]" />
                          </div>

                          <div className="h-8 w-8 border border-[#D8D8D3]" />
                        </div>

                        <div className="mt-8 h-2 w-3/4 bg-[#B7BAB9]" />

                        {[
                          "100%",
                          "92%",
                          "84%",
                          "96%",
                          "70%",
                        ].map(
                          (
                            width,
                            index,
                          ) => (
                            <div
                              key={
                                `${width}-${index}`
                              }
                              className="mt-3 h-1.5 bg-[#E3E3DF]"
                              style={{
                                width,
                              }}
                            />
                          ),
                        )}

                        <div className="absolute inset-5 border border-[#D85A43]">
                          <span className="absolute -left-[3px] -top-[3px] h-2 w-2 bg-[#D85A43]" />

                          <span className="absolute -right-[3px] -top-[3px] h-2 w-2 bg-[#D85A43]" />

                          <span className="absolute -bottom-[3px] -left-[3px] h-2 w-2 bg-[#D85A43]" />

                          <span className="absolute -bottom-[3px] -right-[3px] h-2 w-2 bg-[#D85A43]" />
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#181A1F] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
                      <Crop className="h-3 w-3" />

                      Auto edge
                      detection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Scanner */}
      {model.scan.visible && (
        <section
          id="scanner"
          className="border-b border-[#D8D8D3]"
        >
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <SectionMarker
              index="02"
              label={
                model.scan
                  .eyebrow
              }
            />

            <div className="mt-10 grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <h2 className="max-w-[520px] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                  {
                    model.scan
                      .title
                  }
                </h2>

                <p className="mt-6 max-w-[470px] text-sm leading-7 text-[#6E7178]">
                  {
                    model.scan
                      .description
                  }
                </p>

                <div className="mt-12">
                  {model.scan.steps.map(
                    (
                      step,
                      index,
                    ) => (
                      <div
                        key={
                          `${step}-${index}`
                        }
                        className="grid grid-cols-[45px_1fr_auto] items-center border-t border-[#D2D3CF] py-5 last:border-b"
                      >
                        <span className="font-mono text-[9px] text-[#96999E]">
                          0
                          {index +
                            1}
                        </span>

                        <span className="text-sm font-semibold">
                          {
                            step
                          }
                        </span>

                        <ChevronRight className="h-4 w-4 text-[#9A9CA0]" />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="relative border border-[#D3D4CF] bg-[#E8E7E2] p-6 sm:p-10">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#80838A]">
                    CAMERA INPUT /
                    LIVE
                  </span>

                  <ScanLine className="h-5 w-5 text-[#D64D37]" />
                </div>

                {model.scan
                  .mediaUrl ? (
                  <MediaPanel
                    url={
                      model.scan
                        .mediaUrl
                    }
                    alt="PDF Office scanner"
                    className="mx-auto max-h-[540px]"
                  />
                ) : (
                  <div className="relative mx-auto aspect-[4/5] max-w-[460px] overflow-hidden bg-[#282B30] p-8">
                    <div className="absolute inset-8 border border-white/70">
                      <span className="absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-[#EE624A]" />

                      <span className="absolute -right-1 -top-1 h-6 w-6 border-r-2 border-t-2 border-[#EE624A]" />

                      <span className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-[#EE624A]" />

                      <span className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-[#EE624A]" />
                    </div>

                    <div className="h-full bg-[#F4F3ED] p-8">
                      <div className="h-2 w-1/2 bg-[#585B61]" />

                      <div className="mt-5 h-1.5 w-full bg-[#D5D5D0]" />

                      <div className="mt-2 h-1.5 w-11/12 bg-[#D5D5D0]" />

                      <div className="mt-2 h-1.5 w-4/5 bg-[#D5D5D0]" />
                    </div>

                    <div className="absolute left-8 right-8 top-1/2 h-px bg-[#EF634C] shadow-[0_0_10px_#ef634c]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      <section
        id="tools"
        className="border-b border-[#D8D8D3] bg-[#1D1F24] text-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-between gap-7 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A6A9AF]">
                <span className="font-mono text-[#F06B50]">
                  03
                </span>

                <span className="h-px w-8 bg-white/30" />

                PDF Tools
              </div>

              <h2 className="mt-9 max-w-[670px] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                A utility drawer,
                not a maze.
              </h2>
            </div>

            <p className="max-w-[400px] text-sm leading-7 text-[#AEB1B7]">
              The everyday PDF
              operations stay visible
              and accessible instead
              of hiding behind layers
              of menus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {displayedTools.map(
              (
                tool,
                index,
              ) => {
                const Icon =
                  toolIcon(
                    tool,
                  );

                return (
                  <article
                    key={
                      tool.type
                    }
                    className="group min-h-[215px] border-b border-white/15 p-6 transition hover:bg-white hover:text-[#1D1F24] md:border-r"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[9px] text-[#888C94]">
                        T
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <Icon className="h-5 w-5 text-[#F06B50]" />
                    </div>

                    <h3 className="mt-10 text-xl font-semibold tracking-[-0.03em]">
                      {
                        tool.name
                      }
                    </h3>

                    <p className="mt-3 max-w-[280px] text-[11px] leading-5 text-[#9EA2AA] transition group-hover:text-[#666A71]">
                      {tool.description ||
                        "Built into the PDF Office document workflow."}
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* OCR */}
      {model.ocr.visible && (
        <section
          id="ocr"
          className="border-b border-[#D8D8D3]"
        >
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            <div className="border-[#D8D8D3] px-5 py-20 sm:px-8 lg:border-r lg:px-12 lg:py-28">
              <SectionMarker
                index="04"
                label={
                  model.ocr
                    .eyebrow
                }
              />

              <h2 className="mt-10 max-w-[580px] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                {
                  model.ocr
                    .title
                }
              </h2>

              <p className="mt-6 max-w-[500px] text-sm leading-7 text-[#696D74]">
                {
                  model.ocr
                    .description
                }
              </p>

              <div className="mt-10 grid gap-2 sm:grid-cols-2">
                {model.ocr.features.map(
                  (
                    feature,
                  ) => (
                    <div
                      key={
                        feature
                      }
                      className="flex min-h-12 items-center gap-3 border border-[#D6D7D2] bg-[#FAF9F6] px-4 text-[11px] font-medium"
                    >
                      <Check className="h-3.5 w-3.5 text-[#4B8B65]" />

                      {
                        feature
                      }
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="relative bg-[#EBE5DA] p-5 sm:p-8 lg:p-12">
              {model.ocr
                .mediaUrl ? (
                <MediaPanel
                  url={
                    model.ocr
                      .mediaUrl
                  }
                  alt="PDF Office OCR"
                  className="h-full min-h-[500px]"
                />
              ) : (
                <div className="mx-auto max-w-[520px] border border-[#C9C3B9] bg-[#FAF8F2] p-7 shadow-[8px_8px_0_#D6CFC2]">
                  <div className="flex items-center justify-between border-b border-[#D7D1C7] pb-5">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8A847B]">
                        TEXT RECOGNITION
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        Document OCR
                      </p>
                    </div>

                    <Search className="h-5 w-5 text-[#855EA7]" />
                  </div>

                  <div className="mt-8 space-y-4 text-[13px] leading-7 text-[#55555A]">
                    <p>
                      A scanned
                      document becomes
                      searchable,
                      selectable text.
                    </p>

                    <p className="bg-[#DCCCF0] px-1.5 py-0.5">
                      Extract the useful
                      information.
                    </p>

                    <p>
                      Copy it. Reuse it.
                      Keep the original
                      PDF intact.
                    </p>

                    <p className="bg-[#DCCCF0] px-1.5 py-0.5">
                      No manual
                      retyping required.
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-[#D7D1C7] pt-5">
                    <span className="font-mono text-[8px] text-[#888279]">
                      96% CONFIDENCE
                    </span>

                    <button className="bg-[#26272C] px-4 py-2 text-[9px] font-semibold text-white">
                      COPY TEXT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Organize */}
      {model.organize
        .visible && (
        <section
          id="organize"
          className="border-b border-[#D8D8D3]"
        >
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <SectionMarker
              index="05"
              label={
                model.organize
                  .eyebrow
              }
            />

            <div className="mt-10 grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                  {
                    model.organize
                      .title
                  }
                </h2>

                <p className="mt-6 max-w-[460px] text-sm leading-7 text-[#6C7077]">
                  {
                    model.organize
                      .description
                  }
                </p>

                <div className="mt-10 flex items-center gap-3">
                  <FolderOpen className="h-5 w-5 text-[#3D69D4]" />

                  <span className="text-[11px] font-semibold">
                    Structured document
                    categories
                  </span>
                </div>
              </div>

              <div className="border border-[#CDCEC9] bg-[#F9F8F5]">
                <div className="flex h-12 items-center justify-between border-b border-[#D8D8D3] px-4">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-[#4E73CC]" />

                    <span className="text-[10px] font-semibold">
                      My Documents
                    </span>
                  </div>

                  <Search className="h-4 w-4 text-[#8C8F95]" />
                </div>

                <div className="grid min-h-[390px] md:grid-cols-[170px_1fr]">
                  <aside className="border-r border-[#D8D8D3] p-3">
                    {model.organize.categories.map(
                      (
                        category,
                        index,
                      ) => (
                        <div
                          key={
                            category
                          }
                          className={`mb-1 flex min-h-10 items-center gap-2 px-3 text-[9px] font-medium ${
                            index ===
                            0
                              ? "bg-[#E8EDF8] text-[#345EA9]"
                              : "text-[#73767D]"
                          }`}
                        >
                          <FolderOpen className="h-3.5 w-3.5" />

                          {
                            category
                          }
                        </div>
                      ),
                    )}
                  </aside>

                  <div className="p-5">
                    {model.organize
                      .mediaUrl ? (
                      <MediaPanel
                        url={
                          model.organize
                            .mediaUrl
                        }
                        alt="PDF Office organizer"
                        className="h-full"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {[
                          "Invoice.pdf",
                          "Passport.pdf",
                          "Report.pdf",
                          "Contract.pdf",
                          "Notes.pdf",
                          "Receipt.pdf",
                        ].map(
                          (
                            name,
                            index,
                          ) => (
                            <div
                              key={
                                name
                              }
                              className="border border-[#DEDFDB] bg-white p-3"
                            >
                              <div className="aspect-[4/3] bg-[#F1F1EE] p-3">
                                <div className="h-full border border-[#D8D8D3] bg-white p-2">
                                  <div className="h-1 w-2/3 bg-[#A6A8A8]" />

                                  <div className="mt-2 h-1 w-full bg-[#E0E0DD]" />

                                  <div className="mt-1 h-1 w-4/5 bg-[#E0E0DD]" />
                                </div>
                              </div>

                              <p className="mt-2 truncate text-[8px] font-medium text-[#666A71]">
                                {
                                  name
                                }
                              </p>

                              <p className="mt-1 font-mono text-[7px] text-[#A0A2A6]">
                                {index +
                                  1}
                                .
                                {
                                  "2 MB"
                                }
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* eSign */}
      {model.esign.visible && (
        <section className="border-b border-[#D8D8D3] bg-[#ECECE8]">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-5 sm:p-8 lg:p-12">
              <div className="relative mx-auto max-w-[590px] border border-[#CDCEC9] bg-white p-8 shadow-[7px_9px_0_#D3D4CF] sm:p-12">
                {model.esign
                  .mediaUrl ? (
                  <img
                    src={
                      model.esign
                        .mediaUrl
                    }
                    alt="PDF Office eSign"
                    className="max-h-[500px] w-full object-contain"
                  />
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <div className="h-2 w-32 bg-[#36393E]" />

                        <div className="mt-2 h-1.5 w-20 bg-[#C6C8C5]" />
                      </div>

                      <FilePenLine className="h-6 w-6 text-[#4B8B65]" />
                    </div>

                    <div className="mt-10 space-y-3">
                      <div className="h-1.5 w-full bg-[#E1E1DD]" />
                      <div className="h-1.5 w-11/12 bg-[#E1E1DD]" />
                      <div className="h-1.5 w-5/6 bg-[#E1E1DD]" />
                    </div>

                    <div className="mt-20 border-b border-[#888B8D] pb-2">
                      <div className="-rotate-3 text-4xl italic tracking-[-0.08em] text-[#3157A8]">
                        Signature
                      </div>
                    </div>

                    <div className="mt-2 text-[8px] uppercase tracking-[0.14em] text-[#999B9D]">
                      Authorized
                      signature
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-[#D8D8D3] px-5 py-20 sm:px-8 lg:border-l lg:border-t-0 lg:px-12 lg:py-28">
              <SectionMarker
                index="06"
                label={
                  model.esign
                    .eyebrow
                }
              />

              <h2 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                {
                  model.esign
                    .title
                }
              </h2>

              <p className="mt-6 max-w-[480px] text-sm leading-7 text-[#6C7077]">
                {
                  model.esign
                    .description
                }
              </p>

              <ol className="mt-10">
                {model.esign.steps.map(
                  (
                    step,
                    index,
                  ) => (
                    <li
                      key={
                        step
                      }
                      className="flex items-center gap-4 border-t border-[#CFD0CC] py-4 last:border-b"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#BFC1BD] font-mono text-[8px]">
                        {index +
                          1}
                      </span>

                      <span className="text-[11px] font-semibold">
                        {
                          step
                        }
                      </span>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Product proof */}
      {model.proofMedia.length >
        0 && (
        <section className="border-b border-[#D8D8D3]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-8">
              <div>
                <SectionMarker
                  index="07"
                  label="Product View"
                />

                <h2 className="mt-8 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Built around the
                  document.
                </h2>
              </div>

              <ImageIcon className="hidden h-6 w-6 text-[#777B82] sm:block" />
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {model.proofMedia
                .slice(
                  0,
                  6,
                )
                .map(
                  (
                    item,
                    index,
                  ) => (
                    <figure
                      key={
                        item.id
                      }
                      className="border border-[#D4D5D0] bg-white p-3"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-[#ECECE8]">
                        <img
                          src={
                            item.url
                          }
                          alt={
                            item.name
                          }
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <figcaption className="flex items-center justify-between px-1 pb-1 pt-3">
                        <span className="max-w-[75%] truncate text-[9px] font-semibold text-[#5C6067]">
                          {
                            item.name
                          }
                        </span>

                        <span className="font-mono text-[8px] text-[#9A9CA1]">
                          0
                          {index +
                            1}
                        </span>
                      </figcaption>
                    </figure>
                  ),
                )}
            </div>
          </div>
        </section>
      )}

      {/* Download */}
      {model.download
        .visible && (
        <section className="border-b border-[#D8D8D3] bg-[#D9543E] text-white">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_auto]">
            <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                <Sparkles className="h-4 w-4" />

                {
                  model.download
                    .eyebrow
                }
              </div>

              <h2 className="mt-8 max-w-[920px] text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {
                  model.download
                    .title
                }
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">
                {
                  model.download
                    .description
                }
              </p>
            </div>

            <div className="flex items-center border-t border-white/20 px-5 pb-16 sm:px-8 lg:border-l lg:border-t-0 lg:px-12 lg:pb-0">
              <a
                href={
                  model.brand
                    .playStoreUrl
                }
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-28 w-full min-w-[250px] items-center justify-between border border-white/50 px-6 text-sm font-semibold transition hover:bg-white hover:text-[#D9543E] lg:w-auto"
              >
                {
                  model.download
                    .cta
                }

                <MoveRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {model.faqs.length >
        0 && (
        <section
          id="faq"
          className="border-b border-[#D8D8D3]"
        >
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-28">
            <div>
              <SectionMarker
                index="08"
                label="Questions"
              />

              <h2 className="mt-9 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
                FAQ
              </h2>

              <p className="mt-5 max-w-[350px] text-sm leading-7 text-[#73767C]">
                Straight answers about
                PDF Office and its
                document tools.
              </p>
            </div>

            <div>
              {model.faqs.map(
                (
                  faq,
                  index,
                ) => (
                  <details
                    key={`${faq.question}-${index}`}
                    className="group border-t border-[#CACBC7] last:border-b"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-sm font-semibold">
                      <span className="flex items-start gap-5">
                        <span className="font-mono text-[8px] text-[#A0A2A5]">
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        {
                          faq.question
                        }
                      </span>

                      <span className="text-xl font-light text-[#8A8D92] transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="pb-6 pl-10 pr-8 text-[12px] leading-6 text-[#6F7278]">
                      {
                        faq.answer
                      }
                    </div>
                  </details>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#1B1D22] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-12 border-b border-white/15 pb-10 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-3">
                <FileStack className="h-5 w-5 text-[#ED674E]" />

                <p className="text-sm font-bold">
                  {
                    model.brand
                      .shortName
                  }
                </p>
              </div>

              <p className="mt-4 max-w-md text-[10px] leading-5 text-[#9699A0]">
                {
                  model.brand
                    .footerText
                }
              </p>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[9px] font-semibold text-[#A6A9AF]">
              <a
                href="#scanner"
                className="hover:text-white"
              >
                Scanner
              </a>

              <a
                href="#tools"
                className="hover:text-white"
              >
                PDF Tools
              </a>

              <a
                href="#ocr"
                className="hover:text-white"
              >
                OCR
              </a>

              <a
                href="#organize"
                className="hover:text-white"
              >
                Organize
              </a>

              {model.brand
                .privacyUrl && (
                <a
                  href={
                    model.brand
                      .privacyUrl
                  }
                  className="hover:text-white"
                >
                  Privacy
                </a>
              )}

              {model.brand
                .termsUrl && (
                <a
                  href={
                    model.brand
                      .termsUrl
                  }
                  className="hover:text-white"
                >
                  Terms
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#74777E]">
              PDF OFFICE · DOCUMENT
              WORKSPACE
            </p>

            <div className="flex items-center gap-2 text-[8px] text-[#74777E]">
              <ShieldCheck className="h-3 w-3" />

              Designed for practical
              document workflows.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}