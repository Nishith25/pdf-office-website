"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Combine,
  Download,
  FileImage,
  FileSignature,
  FileSpreadsheet,
  FileText,
  QrCode,
  ScanLine,
  Scissors,
  Shrink,
  Type,
  Upload,
  WandSparkles,
} from "lucide-react";

type ToolItem = {
  name: string;
  type: string;
};

type PDFToolsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ToolItem[];
};

const toolStyleMap: Record<
  string,
  {
    icon: typeof FileText;
    bg: string;
    iconBg: string;
    color: string;
  }
> = {
  merge: {
    icon: Combine,
    bg: "#FFF8EC",
    iconBg: "#FFF0D4",
    color: "#B87500",
  },

  split: {
    icon: Scissors,
    bg: "#FFF3F7",
    iconBg: "#FFE6EF",
    color: "#D23E77",
  },

  esign: {
    icon: FileSignature,
    bg: "#EEFFF4",
    iconBg: "#D9F9E4",
    color: "#0AAA4A",
  },

  watermark: {
    icon: Type,
    bg: "#FDF1FF",
    iconBg: "#F7E2FC",
    color: "#9213A6",
  },

  compress: {
    icon: Shrink,
    bg: "#EDF9FF",
    iconBg: "#D8F1FC",
    color: "#0082B8",
  },

  image: {
    icon: FileImage,
    bg: "#FFF8EC",
    iconBg: "#FFEBC9",
    color: "#D88D00",
  },

  scan: {
    icon: ScanLine,
    bg: "#EFF9FF",
    iconBg: "#DDF3FF",
    color: "#1685C2",
  },

  qrGenerate: {
    icon: QrCode,
    bg: "#EFFFF3",
    iconBg: "#D9F9E0",
    color: "#16A447",
  },

  qrReader: {
    icon: QrCode,
    bg: "#FCF1FF",
    iconBg: "#F3E1FA",
    color: "#9217A5",
  },

  ocr: {
    icon: WandSparkles,
    bg: "#FFF7E9",
    iconBg: "#FFEBC7",
    color: "#D98C00",
  },

  import: {
    icon: Download,
    bg: "#FFF1F6",
    iconBg: "#FFE3ED",
    color: "#D83D77",
  },

  word: {
    icon: FileText,
    bg: "#EFF4FF",
    iconBg: "#DDE7FF",
    color: "#5576C5",
  },

  excel: {
    icon: FileSpreadsheet,
    bg: "#EFFFF2",
    iconBg: "#D8F7DD",
    color: "#3D9550",
  },
};

export default function PDFTools({
  eyebrow,
  title,
  description,
  items,
}: PDFToolsProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
  id="tools"
  className="scroll-mt-24 relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
>
      <div className="pointer-events-none absolute left-1/2 top-[160px] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#4F6FFF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold text-[#4F6FFF]">
            {eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.055em] text-[#111318] sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#747C8F] sm:text-lg">
            {description}
          </p>
        </motion.div>

        {/* App-style tools panel */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 34,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mt-14 rounded-[30px] border border-[#E8EAF0] bg-[#FCFCFD] p-4 shadow-[0_20px_65px_rgba(31,38,65,0.055)] sm:p-7 lg:p-9"
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#999EAB]">
                All tools
              </p>

              <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#1C2130]">
                Everything you need for PDFs.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E4E7ED] bg-white px-4 py-2 text-xs font-medium text-[#626A7B]">
              <Upload className="h-3.5 w-3.5 text-[#4F6FFF]" />

              Import or create
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map(
              (
                tool,
                index,
              ) => {
                const style =
                  toolStyleMap[
                    tool.type
                  ] ??
                  toolStyleMap.merge;

                const Icon =
                  style.icon;

                return (
                  <motion.article
                    key={tool.name}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity:
                              0,
                            y: 18,
                            scale:
                              0.97,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration:
                        0.4,
                      delay:
                        reduceMotion
                          ? 0
                          : index *
                            0.035,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -5,
                          }
                    }
                    className="group min-h-[165px] rounded-[22px] border border-white p-4 shadow-[0_8px_25px_rgba(34,41,66,0.035)]"
                    style={{
                      backgroundColor:
                        style.bg,
                    }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[16px]"
                      style={{
                        backgroundColor:
                          style.iconBg,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color:
                            style.color,
                        }}
                      />
                    </div>

                    <h3 className="mt-6 text-sm font-semibold tracking-[-0.025em] text-[#202534] sm:text-base">
                      {tool.name}
                    </h3>

                    <p className="mt-1 text-[10px] leading-4 text-[#858C9B]">
                      PDF Office
                    </p>
                  </motion.article>
                );
              },
            )}
          </div>
        </motion.div>

        {/* Bottom message */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[24px] bg-[#F3F6FF] px-5 py-6 sm:flex-row sm:px-7">
          <div>
            <p className="text-sm font-semibold text-[#202536]">
              Scan, edit, convert and organize.
            </p>

            <p className="mt-1 text-xs leading-5 text-[#747C8D]">
              One workspace instead of multiple document apps.
            </p>
          </div>

          <a
            href="#scanner"
            className="inline-flex min-h-10 items-center rounded-full bg-[#4F6FFF] px-5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#405FE6]"
          >
            Explore scanner
          </a>
        </div>
      </div>
    </section>
  );
}