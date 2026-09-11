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
  QrCode,
  RefreshCw,
  ScanLine,
  Scissors,
  Search,
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
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        ease: "easeOut",
      }}
      className="relative mx-auto w-[280px] max-w-full sm:w-[305px] lg:w-[325px]"
    >
      <div className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-[#4F6FFF]/10 blur-[75px]" />

      {/* Floating Scan */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-8 top-[175px] z-40 hidden items-center gap-2 rounded-[14px] border border-[#E6E9F3] bg-white px-3 py-2 shadow-[0_12px_30px_rgba(30,39,70,0.10)] sm:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#EAF0FF]">
          <ScanLine className="h-3.5 w-3.5 text-[#4F6FFF]" />
        </div>

        <div>
          <p className="text-[8px] font-bold text-[#222735]">
            Smart Scan
          </p>

          <p className="text-[6px] text-[#9298A7]">
            Auto crop & enhance
          </p>
        </div>
      </motion.div>

      {/* OCR */}
      <motion.div
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-7 top-[315px] z-40 hidden items-center gap-2 rounded-[14px] border border-[#E6E9F3] bg-white px-3 py-2 shadow-[0_12px_30px_rgba(30,39,70,0.10)] sm:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#F4E9FF]">
          <Type className="h-3.5 w-3.5 text-[#8B18A8]" />
        </div>

        <div>
          <p className="text-[8px] font-bold text-[#222735]">
            OCR
          </p>

          <p className="text-[6px] text-[#9298A7]">
            Extract text
          </p>
        </div>
      </motion.div>

      {/* Phone */}
      <div className="relative overflow-hidden rounded-[40px] border-[7px] border-[#151821] bg-white shadow-[0_30px_80px_rgba(25,34,64,0.20)]">
        <div className="absolute left-1/2 top-2 z-40 h-5 w-[76px] -translate-x-1/2 rounded-full bg-[#151821]" />

        <div className="relative h-[555px] overflow-hidden bg-white sm:h-[585px]">
          {/* Status */}
          <div className="flex h-8 items-center justify-between px-5 pt-1 text-[8px] font-semibold">
            <span>4:08</span>

            <span>Wi-Fi&nbsp; 96%</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#C8D2FF] bg-[#F4F6FF]">
                <Camera className="h-3.5 w-3.5 text-[#4F6FFF]" />
              </div>

              <div>
                <p className="text-[10px] font-bold leading-none">
                  <span className="text-[#F29A14]">
                    PDF
                  </span>{" "}
                  <span className="text-[#8A7DE4]">
                    Office
                  </span>
                </p>

                <p className="mt-1 text-[5px] uppercase tracking-[0.2em] text-[#D6A04A]">
                  Cam Scanner
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Bookmark className="h-3.5 w-3.5" />
              <RefreshCw className="h-3.5 w-3.5" />
              <Settings className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Tools */}
          <div className="mt-4 grid grid-cols-5 gap-1.5 px-3">
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
                    className="mx-auto flex h-9 w-9 items-center justify-center rounded-[12px]"
                    style={{
                      backgroundColor: bg,
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{
                        color,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-[5.5px] text-[#252A35]">
                    {label}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Search */}
          <div className="mx-4 mt-4 flex items-center gap-2 rounded-full border border-[#CACDD4] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#646B77]" />

            <p className="text-[8px] text-[#8B909B]">
              Search documents...
            </p>

            <div className="ml-auto flex gap-2">
              <Tags className="h-3.5 w-3.5" />
              <FolderPlus className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-3 flex gap-1.5 overflow-hidden px-4">
            <span className="shrink-0 rounded-full bg-[#4F6FFF] px-3 py-1.5 text-[7px] font-semibold text-white">
              All Docs
            </span>

            <span className="shrink-0 rounded-full border border-[#777C86] px-3 py-1.5 text-[7px]">
              Business Card
            </span>

            <span className="shrink-0 rounded-full border border-[#777C86] px-3 py-1.5 text-[7px]">
              ID Card
            </span>
          </div>

          {/* Empty state */}
          <div className="absolute inset-x-0 top-[260px] flex flex-col items-center text-center">
            <div className="relative h-[125px] w-[175px]">
              <div className="absolute left-[22px] top-[30px] h-[85px] w-[135px] rounded-[45%] bg-[#F0EFFF]" />

              <div className="absolute left-[43px] top-[52px] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#8980E8]">
                <FileImage className="h-7 w-7 text-white" />
              </div>

              <div className="absolute right-[22px] top-[70px] flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#272746]">
                <Download className="h-5 w-5 text-white" />
              </div>
            </div>

            <p className="text-[13px] font-semibold text-[#171A22]">
              Start Scanning!
            </p>

            <p className="mt-1 text-[8px] text-[#4E535D]">
              We don't see any files
            </p>
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 h-[74px] rounded-t-[25px] border-t border-[#ECEEF2] bg-white">
            <div className="grid h-full grid-cols-5 items-end pb-3 text-center">
              <div>
                <FileText className="mx-auto h-3.5 w-3.5 text-[#676D77]" />
                <p className="mt-1 text-[6px]">
                  Home
                </p>
              </div>

              <div>
                <QrCode className="mx-auto h-3.5 w-3.5 text-[#676D77]" />
                <p className="mt-1 text-[6px]">
                  QR
                </p>
              </div>

              <div className="relative h-full">
                <div className="absolute left-1/2 top-[-20px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#4F6FFF] shadow-lg">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>

              <div>
                <ScanLine className="mx-auto h-3.5 w-3.5 text-[#676D77]" />
                <p className="mt-1 text-[6px]">
                  OCR
                </p>
              </div>

              <div>
                <Import className="mx-auto h-3.5 w-3.5 text-[#676D77]" />
                <p className="mt-1 text-[6px]">
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
      className="relative overflow-hidden bg-white px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-30 lg:pb-18"
    >
      {/* kept for SEO/accessibility but hidden visually */}
      <span className="sr-only">
        {eyebrow}
      </span>

      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,35,52,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(30,35,52,0.035) 1px, transparent 1px)",
          backgroundSize:
            "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute right-[10%] top-[130px] h-[320px] w-[320px] rounded-full bg-[#4F6FFF]/[0.07] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-12">
        {/* Text */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="text-[44px] font-semibold leading-[0.94] tracking-[-0.06em] text-[#111318] sm:text-[58px] lg:text-[68px]"
          >
            {titleTop}

            <span className="mt-1 block text-[#4F6FFF]">
              {titleBottom}
            </span>
          </motion.h1>

          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
            }}
            className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6E7586] sm:text-lg lg:mx-0"
          >
            {description}
          </motion.p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#4F6FFF] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,111,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#405FE6] sm:w-auto"
            >
              {primaryCta}

              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <a
              href="#tools"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#DDE1E8] bg-white px-5 text-sm font-semibold text-[#313746] transition hover:border-[#C7CCD7] sm:w-auto"
            >
              {secondaryCta}
            </a>
          </div>

          {/* Capabilities */}
          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            {[
              "Smart scanning",
              "OCR",
              "PDF conversion",
              "eSign",
            ].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-[#E7E9EF] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#596175]"
                >
                  <Check className="h-3 w-3 text-[#18B865]" />

                  {item}
                </div>
              ),
            )}
          </div>

          {/* Stats */}
          <div className="mx-auto mt-7 grid max-w-lg grid-cols-3 divide-x divide-[#E7E9EF] lg:mx-0">
            {stats.map(
              (stat) => (
                <div
                  key={stat.label}
                  className="px-3 text-center lg:first:pl-0"
                >
                  <p className="text-xl font-semibold tracking-[-0.04em] text-[#151924]">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[9px] text-[#9298A7]">
                    {stat.label}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <PDFOfficePhone />
      </div>
    </section>
  );
}