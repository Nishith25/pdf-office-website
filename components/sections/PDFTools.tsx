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
      className="scroll-mt-24 relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-[120px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#4F6FFF]/[0.03] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
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
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold text-[#4F6FFF]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#747C8F] sm:text-base">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
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
            duration: 0.55,
            ease: "easeOut",
          }}
          className="mt-8 rounded-[24px] border border-[#E8EAF0] bg-[#FCFCFD] p-4 shadow-[0_16px_45px_rgba(31,38,65,0.045)] sm:p-5"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#999EAB]">
                All tools
              </p>

              <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-[#1C2130]">
                Everything you need for PDFs.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-[#E4E7ED] bg-white px-3 py-2 text-[10px] font-medium text-[#626A7B] sm:inline-flex">
              <Upload className="h-3 w-3 text-[#4F6FFF]" />
              Import or create
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
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
                            opacity: 0,
                            y: 12,
                            scale: 0.98,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.3,
                      delay:
                        reduceMotion
                          ? 0
                          : index *
                            0.025,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    className="group min-h-[112px] rounded-[17px] border border-white p-3 shadow-[0_6px_18px_rgba(34,41,66,0.03)]"
                    style={{
                      backgroundColor:
                        style.bg,
                    }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[11px]"
                      style={{
                        backgroundColor:
                          style.iconBg,
                      }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{
                          color:
                            style.color,
                        }}
                      />
                    </div>

                    <h3 className="mt-3 text-xs font-semibold tracking-[-0.02em] text-[#202534] sm:text-sm">
                      {tool.name}
                    </h3>

                    <p className="mt-1 text-[8px] text-[#858C9B]">
                      PDF Office
                    </p>
                  </motion.article>
                );
              },
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}