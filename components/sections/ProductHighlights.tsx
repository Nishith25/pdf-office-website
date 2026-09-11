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
  className="scroll-mt-24 relative overflow-hidden border-y border-[#ECEEF3] bg-[#FAFBFD] px-4 py-20 sm:px-6 sm:py-28"
>
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#4F6FFF]/[0.045] blur-[100px]" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#FF9800]/[0.045] blur-[100px]" />

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

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#737B8D] sm:text-lg">
            {description}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
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
                            opacity:
                              0,
                            y: 32,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.22,
                    }}
                    transition={{
                      duration:
                        0.58,
                      delay:
                        reduceMotion
                          ? 0
                          : index *
                            0.09,
                      ease:
                        "easeOut",
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    className="relative min-h-[370px] overflow-hidden rounded-[28px] border border-white p-6 shadow-[0_18px_50px_rgba(34,41,65,0.055)] sm:p-7"
                    style={{
                      backgroundColor:
                        style.background,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[16px]"
                        style={{
                          backgroundColor:
                            style.iconBackground,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{
                            color:
                              style.accent,
                          }}
                        />
                      </div>

                      <span
                        className="rounded-full bg-white/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                        style={{
                          color:
                            style.accent,
                        }}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* Illustration */}
                    <div className="relative mx-auto mt-8 h-[145px] max-w-[245px]">
                      {index === 0 && (
                        <>
                          <div className="absolute left-1/2 top-2 h-[125px] w-[94px] -translate-x-1/2 rotate-[-5deg] rounded-[12px] border-2 border-[#AFC0FF] bg-white shadow-sm" />

                          <div className="absolute left-1/2 top-5 h-[125px] w-[94px] -translate-x-[38%] rotate-[5deg] rounded-[12px] border border-[#DCE3FA] bg-white shadow-md" />

                          <div className="absolute left-1/2 top-[42px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#4F6FFF] shadow-[0_12px_28px_rgba(79,111,255,0.25)]">
                            <ScanLine className="h-7 w-7 text-white" />
                          </div>
                        </>
                      )}

                      {index === 1 && (
                        <>
                          <div className="absolute left-1/2 top-3 h-[120px] w-[180px] -translate-x-1/2 rounded-[18px] border border-[#F2CEA0] bg-white shadow-sm" />

                          <div className="absolute left-[52px] top-[30px] h-16 w-[72px] rounded-[10px] bg-[#FFE7C4]" />

                          <div className="absolute right-[45px] top-[32px] space-y-2">
                            <div className="h-2 w-16 rounded-full bg-[#FFD093]" />
                            <div className="h-2 w-12 rounded-full bg-[#E8E9ED]" />
                            <div className="h-2 w-14 rounded-full bg-[#E8E9ED]" />
                          </div>

                          <div className="absolute bottom-0 right-[28px] flex h-11 w-11 items-center justify-center rounded-full bg-[#FF9800]">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <div className="absolute left-1/2 top-1 h-[130px] w-[105px] -translate-x-1/2 rounded-[14px] border border-[#BCEACB] bg-white shadow-md" />

                          <div className="absolute left-1/2 top-[35px] h-2 w-16 -translate-x-1/2 rounded-full bg-[#D9DEE5]" />

                          <div className="absolute left-1/2 top-[54px] h-2 w-12 -translate-x-1/2 rounded-full bg-[#D9DEE5]" />

                          <div className="absolute left-1/2 top-[78px] h-[1px] w-16 -translate-x-1/2 bg-[#CDD3DA]" />

                          <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2">
                            <div className="h-8 w-20 rotate-[-7deg] rounded-[50%] border-b-2 border-[#14A858]" />
                          </div>

                          <div className="absolute bottom-0 right-[28px] flex h-11 w-11 items-center justify-center rounded-full bg-[#18B865]">
                            <FileSignature className="h-5 w-5 text-white" />
                          </div>
                        </>
                      )}
                    </div>

                    <p
                      className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        color:
                          style.accent,
                      }}
                    >
                      0{index + 1}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[#191E2C]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#6E7688]">
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