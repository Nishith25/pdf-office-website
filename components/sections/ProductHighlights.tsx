"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Crop,
  FileSignature,
  ScanLine,
  Sparkles,
} from "lucide-react";

type HighlightItem = {
  title: string;
  description: string;
  type: string;
};

type ProductHighlightsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: HighlightItem[];
};

const styles = [
  {
    icon: ScanLine,
    label: "Smart Scanner",
    background: "#EEF3FF",
    iconBackground: "#DCE6FF",
    accent: "#4F6FFF",
  },
  {
    icon: Crop,
    label: "Auto Enhancement",
    background: "#FFF5E6",
    iconBackground: "#FFE7BE",
    accent: "#EE9200",
  },
  {
    icon: FileSignature,
    label: "Digital Signature",
    background: "#EAFBF0",
    iconBackground: "#D6F6E0",
    accent: "#17A957",
  },
];

export default function ProductHighlights({
  eyebrow,
  title,
  description,
  items,
}: ProductHighlightsProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="features"
      className="scroll-mt-24 border-y border-[#ECEEF3] bg-[#FAFBFD] px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
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
            duration: 0.55,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold text-[#4F6FFF]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#737B8D] sm:text-base">
            {description}
          </p>
        </motion.div>

        <div className="mt-9 grid gap-3 lg:grid-cols-3">
          {items
            .slice(0, 3)
            .map(
              (
                item,
                index,
              ) => {
                const style =
                  styles[index];

                const Icon =
                  style.icon;

                return (
                  <motion.article
                    key={item.title}
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
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="rounded-[22px] border border-white p-5 shadow-[0_12px_35px_rgba(34,41,65,0.045)]"
                    style={{
                      backgroundColor:
                        style.background,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[13px]"
                        style={{
                          backgroundColor:
                            style.iconBackground,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{
                            color:
                              style.accent,
                          }}
                        />
                      </div>

                      <span
                        className="rounded-full bg-white/75 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.11em]"
                        style={{
                          color:
                            style.accent,
                        }}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* compact visual */}
                    <div className="relative mx-auto mt-4 h-[80px] max-w-[180px]">
                      {index === 0 && (
                        <>
                          <div className="absolute left-1/2 top-1 h-[68px] w-[52px] -translate-x-[65%] rotate-[-5deg] rounded-[9px] border border-[#AFC0FF] bg-white" />

                          <div className="absolute left-1/2 top-2 h-[68px] w-[52px] -translate-x-[35%] rotate-[5deg] rounded-[9px] bg-white shadow" />

                          <div className="absolute left-1/2 top-[21px] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#4F6FFF]">
                            <ScanLine className="h-4 w-4 text-white" />
                          </div>
                        </>
                      )}

                      {index === 1 && (
                        <>
                          <div className="absolute left-1/2 top-2 h-[62px] w-[125px] -translate-x-1/2 rounded-[12px] bg-white shadow" />

                          <div className="absolute left-[38px] top-[20px] h-8 w-10 rounded bg-[#FFE7C4]" />

                          <div className="absolute right-[28px] top-[18px] space-y-1.5">
                            <div className="h-1.5 w-10 rounded bg-[#FFD093]" />
                            <div className="h-1.5 w-8 rounded bg-[#E8E9ED]" />
                            <div className="h-1.5 w-9 rounded bg-[#E8E9ED]" />
                          </div>

                          <div className="absolute bottom-0 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF9800]">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                          </div>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <div className="absolute left-1/2 top-1 h-[70px] w-[55px] -translate-x-1/2 rounded-[9px] bg-white shadow" />

                          <div className="absolute left-1/2 top-[20px] h-1.5 w-8 -translate-x-1/2 rounded bg-[#D9DEE5]" />

                          <div className="absolute left-1/2 top-[31px] h-1.5 w-6 -translate-x-1/2 rounded bg-[#D9DEE5]" />

                          <div className="absolute bottom-0 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#18B865]">
                            <FileSignature className="h-3.5 w-3.5 text-white" />
                          </div>
                        </>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#191E2C]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-[#6E7688]">
                      {item.description}
                    </p>
                  </motion.article>
                );
              },
            )}
        </div>
      </div>
    </section>
  );
}