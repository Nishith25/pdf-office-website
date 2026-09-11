"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  Bookmark,
  Camera,
  Check,
  Download,
  FileImage,
  FileSignature,
  FileText,
  FolderPlus,
  Grid2X2,
  Import,
  PenLine,
  QrCode,
  RefreshCw,
  ScanLine,
  Search,
  Scissors,
  Settings,
  Tags,
  Type,
} from "lucide-react";

type HeroProps = {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  playStoreUrl: string;

  stats: {
    value: string;
    label: string;
  }[];
};

const topTools = [
  {
    icon: FileText,
    label: "Merge PDF",
    bg: "#FFF2D9",
    color: "#B87400",
  },
  {
    icon: Scissors,
    label: "Split PDF",
    bg: "#FFEAF2",
    color: "#D13E78",
  },
  {
    icon: FileSignature,
    label: "eSign",
    bg: "#DFFBE8",
    color: "#09A94D",
  },
  {
    icon: Type,
    label: "Watermark",
    bg: "#F9E7FF",
    color: "#9015A8",
  },
  {
    icon: Grid2X2,
    label: "All Tools",
    bg: "#E2F0FF",
    color: "#167DD6",
  },
];

function PDFOfficePhone() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative mx-auto w-[300px] max-w-full sm:w-[340px] lg:w-[360px]"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-14 -z-10 rounded-full bg-[#4F6FFF]/10 blur-[85px]" />

      {/* Floating scan badge */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-5 top-[175px] z-40 hidden items-center gap-2 rounded-[16px] border border-[#E6E9F3] bg-white px-3 py-2 shadow-[0_14px_35px_rgba(30,39,70,0.10)] sm:flex lg:-left-14"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EAF0FF]">
          <ScanLine className="h-4 w-4 text-[#4F6FFF]" />
        </div>

        <div>
          <p className="text-[9px] font-bold text-[#222735]">
            Smart Scan
          </p>

          <p className="text-[7px] text-[#9298A7]">
            Auto crop & enhance
          </p>
        </div>
      </motion.div>

      {/* OCR badge */}
      <motion.div
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-4 top-[315px] z-40 hidden items-center gap-2 rounded-[16px] border border-[#E6E9F3] bg-white px-3 py-2 shadow-[0_14px_35px_rgba(30,39,70,0.10)] sm:flex lg:-right-12"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F4E9FF]">
          <Type className="h-4 w-4 text-[#8B18A8]" />
        </div>

        <div>
          <p className="text-[9px] font-bold text-[#222735]">
            OCR
          </p>

          <p className="text-[7px] text-[#9298A7]">
            Extract text
          </p>
        </div>
      </motion.div>

      {/* Phone shell */}
      <div className="relative overflow-hidden rounded-[46px] border-[8px] border-[#151821] bg-white shadow-[0_35px_95px_rgba(25,34,64,0.22)]">
        {/* Camera island */}
        <div className="absolute left-1/2 top-2 z-40 h-5 w-[82px] -translate-x-1/2 rounded-full bg-[#151821]" />

        <div className="relative h-[625px] overflow-hidden bg-white sm:h-[665px]">
          {/* Status bar */}
          <div className="flex h-9 items-center justify-between px-5 pt-1 text-[9px] font-semibold text-[#151821]">
            <span>4:08</span>

            <div className="flex items-center gap-1.5">
              <span>Wi-Fi</span>
              <span>96%</span>
            </div>
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#C8D2FF] bg-[#F4F6FF]">
                <Camera className="h-4 w-4 text-[#4F6FFF]" />
              </div>

              <div>
                <p className="text-[11px] font-bold leading-none">
                  <span className="text-[#F29A14]">
                    PDF
                  </span>{" "}
                  <span className="text-[#8A7DE4]">
                    Office
                  </span>
                </p>

                <p className="mt-1 text-[6px] font-medium uppercase tracking-[0.22em] text-[#D6A04A]">
                  Cam Scanner
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-[#161A22]" />
              <RefreshCw className="h-4 w-4 text-[#161A22]" />
              <Settings className="h-4 w-4 text-[#161A22]" />
            </div>
          </div>

          {/* Top tools */}
          <div className="mt-5 grid grid-cols-5 gap-2 px-3">
            {topTools.map(
              ({
                icon: Icon,
                label,
                bg,
                color,
              }) => (
                <div
                  key={label}
                  className="text-center"
                >
                  <div
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px]"
                    style={{
                      backgroundColor:
                        bg,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color,
                      }}
                    />
                  </div>

                  <p className="mt-1.5 text-[6.5px] font-medium leading-3 text-[#252A35]">
                    {label}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Search */}
          <div className="mx-4 mt-5 flex items-center gap-2 rounded-full border border-[#CACDD4] px-3 py-2.5">
            <Search className="h-4 w-4 text-[#646B77]" />

            <p className="text-[9px] text-[#8B909B]">
              Search documents...
            </p>

            <div className="ml-auto flex gap-2">
              <Tags className="h-4 w-4 text-[#171B25]" />
              <FolderPlus className="h-4 w-4 text-[#171B25]" />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-hidden px-4">
            <span className="shrink-0 rounded-full bg-[#4F6FFF] px-4 py-2 text-[8px] font-semibold text-white">
              All Docs
            </span>

            <span className="shrink-0 rounded-full border border-[#777C86] px-4 py-2 text-[8px] text-[#626873]">
              Business Card
            </span>

            <span className="shrink-0 rounded-full border border-[#777C86] px-4 py-2 text-[8px] text-[#626873]">
              ID Card
            </span>
          </div>

          {/* Empty state illustration */}
          <div className="absolute inset-x-0 top-[300px] flex flex-col items-center text-center">
            <div className="relative h-[165px] w-[205px]">
              <div className="absolute left-[20px] top-[45px] h-[105px] w-[165px] rounded-[45%] bg-[#F0EFFF]" />

              <div className="absolute left-[45px] top-[70px] flex h-[75px] w-[75px] items-center justify-center rounded-full bg-[#8980E8]">
                <FileImage className="h-8 w-8 text-white" />
              </div>

              <div className="absolute right-[20px] top-[92px] flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#272746]">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>

            <p className="mt-1 text-[15px] font-semibold tracking-[-0.03em] text-[#171A22]">
              Start Scanning!
            </p>

            <p className="mt-1 text-[10px] text-[#4E535D]">
              We don't see any files
            </p>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-[88px] rounded-t-[28px] border-t border-[#ECEEF2] bg-white shadow-[0_-8px_25px_rgba(40,46,70,0.05)]">
            <div className="grid h-full grid-cols-5 items-end pb-3 text-center">
              <div>
                <FileText className="mx-auto h-4 w-4 text-[#676D77]" />
                <p className="mt-1 text-[7px] text-[#676D77]">
                  Home
                </p>
              </div>

              <div>
                <QrCode className="mx-auto h-4 w-4 text-[#676D77]" />
                <p className="mt-1 text-[7px] text-[#676D77]">
                  QR Scan
                </p>
              </div>

              <div className="relative h-full">
                <div className="absolute left-1/2 top-[-24px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#4F6FFF] shadow-[0_10px_26px_rgba(79,111,255,0.32)]">
                  <Camera className="h-7 w-7 text-white" />
                </div>
              </div>

              <div>
                <ScanLine className="mx-auto h-4 w-4 text-[#676D77]" />
                <p className="mt-1 text-[7px] text-[#676D77]">
                  OCR Scan
                </p>
              </div>

              <div>
                <Import className="mx-auto h-4 w-4 text-[#676D77]" />
                <p className="mt-1 text-[7px] text-[#676D77]">
                  Import
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero({
  eyebrow,
  titleTop,
  titleBottom,
  description,
  primaryCta,
  secondaryCta,
  playStoreUrl,
  stats,
}: HeroProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-28"
    >
      {/* Subtle document grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,35,52,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(30,35,52,0.035) 1px, transparent 1px)",
          backgroundSize:
            "40px 40px",
        }}
      />

      {/* Brand glows */}
      <div className="pointer-events-none absolute right-[10%] top-[160px] h-[360px] w-[360px] rounded-full bg-[#4F6FFF]/[0.075] blur-[110px]" />

      <div className="pointer-events-none absolute left-[5%] top-[420px] h-[260px] w-[260px] rounded-full bg-[#FF9800]/[0.05] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#E5E7ED] bg-white px-4 py-2 text-xs font-semibold text-[#60687A] shadow-[0_8px_28px_rgba(25,32,55,0.04)] lg:mx-0"
          >
            <span className="h-2 w-2 rounded-full bg-[#4F6FFF]" />

            {eyebrow}
          </motion.div>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="mt-6 text-[46px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#111318] sm:text-[62px] lg:text-[72px] xl:text-[78px]"
          >
            {titleTop}

            <span className="mt-2 block text-[#4F6FFF]">
              {titleBottom}
            </span>
          </motion.h1>

          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.13,
              ease: "easeOut",
            }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6E7586] sm:text-lg lg:mx-0"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4F6FFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(79,111,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#405FE6] sm:w-auto"
            >
              {primaryCta}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#tools"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#DDE1E8] bg-white px-6 py-3.5 text-sm font-semibold text-[#313746] transition hover:-translate-y-0.5 hover:border-[#C7CCD7] sm:w-auto"
            >
              {secondaryCta}
            </a>
          </motion.div>

          {/* Quick capabilities */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.27,
            }}
            className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {[
              "Smart scanning",
              "OCR text extraction",
              "PDF conversion",
              "Digital signatures",
            ].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-[#E7E9EF] bg-white px-3 py-2 text-[11px] font-medium text-[#596175]"
                >
                  <Check className="h-3.5 w-3.5 text-[#18B865]" />

                  {item}
                </div>
              ),
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.33,
            }}
            className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-[#E7E9EF] lg:mx-0"
          >
            {stats.map(
              (
                stat,
                index,
              ) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="px-2 text-center sm:px-5 lg:first:pl-0"
                >
                  <p className="text-xl font-semibold tracking-[-0.04em] text-[#151924] sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-[#9298A7] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* Phone */}
        <div className="relative mx-auto w-full max-w-[530px] lg:justify-self-end">
          <PDFOfficePhone />
        </div>
      </div>
    </section>
  );
}