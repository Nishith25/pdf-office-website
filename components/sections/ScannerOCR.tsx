"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Camera,
  Check,
  FileText,
  Image as ImageIcon,
  ScanLine,
  Sparkles,
  Type,
} from "lucide-react";

const scannerFeatures = [
  "Camera scanning",
  "Automatic edge detection",
  "Auto crop",
  "Scan enhancement",
  "Multi-page documents",
  "PDF output",
];

const ocrFeatures = [
  "Camera OCR",
  "Gallery OCR",
  "Extract text",
  "Copy & reuse text",
];

export default function ScannerOCR() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="scanner"
      className="scroll-mt-24 overflow-hidden border-y border-[#ECEEF3] bg-[#FAFBFD] px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
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
            Scanner & OCR
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
            Turn paper into something useful.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#747C8F] sm:text-base">
            Capture, enhance and extract reusable text directly from
            your phone.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* Scanner */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-[24px] border border-[#DDE4F4] bg-[#EEF3FF] p-5 sm:p-6"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#4F6FFF]/10 blur-[75px]" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#4F6FFF]">
                  Smart Scanner
                </p>

                <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.04em] text-[#191E2D] sm:text-2xl">
                  Capture cleaner documents.
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-[#6C7486]">
                  Detect edges, crop automatically and enhance your
                  scans.
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#DCE6FF]">
                <ScanLine className="h-4 w-4 text-[#4F6FFF]" />
              </div>
            </div>

            <div className="mt-5 grid items-center gap-5 sm:grid-cols-[0.85fr_1.15fr]">
              {/* Visual */}
              <div className="relative mx-auto w-full max-w-[250px]">
                <div className="rounded-[19px] border-[5px] border-[#171A23] bg-white p-2 shadow-[0_18px_45px_rgba(43,55,95,0.14)]">
                  <div className="relative h-[210px] overflow-hidden rounded-[12px] bg-gradient-to-br from-[#737986] to-[#363B45]">
                    <div className="absolute inset-5 rounded-[10px] border border-dashed border-white/70" />

                    <motion.div
                      initial={
                        reduceMotion
                          ? false
                          : {
                              rotate:
                                -3,
                              scale:
                                0.96,
                            }
                      }
                      whileInView={{
                        rotate: 0,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="absolute left-1/2 top-1/2 h-[138px] w-[98px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white p-3 shadow-xl"
                    >
                      <div className="h-2.5 w-14 rounded-full bg-[#DDE2EB]" />

                      <div className="mt-3 h-1.5 w-full rounded-full bg-[#E8EBF0]" />
                      <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-[#E8EBF0]" />

                      <div className="mt-4 rounded-[6px] bg-[#EEF3FF] p-2">
                        <div className="h-8 rounded-[4px] bg-[#D8E3FF]" />
                      </div>

                      <div className="mt-3 h-1.5 w-full rounded-full bg-[#E8EBF0]" />
                      <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-[#E8EBF0]" />
                    </motion.div>

                    <div className="absolute bottom-3 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#4F6FFF]">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute -right-3 top-5 flex items-center gap-2 rounded-[12px] bg-white px-2.5 py-2 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 text-[#EF9400]" />

                  <span className="text-[8px] font-semibold text-[#444B5D]">
                    Auto enhance
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid gap-2">
                {scannerFeatures.map(
                  (feature) => (
                    <div
                      key={
                        feature
                      }
                      className="flex items-center gap-2 rounded-[11px] bg-white/75 px-3 py-2"
                    >
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DDF9E7]">
                        <Check className="h-2.5 w-2.5 text-[#16A754]" />
                      </div>

                      <span className="text-[10px] font-medium text-[#596174]">
                        {feature}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* OCR */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
            className="overflow-hidden rounded-[24px] border border-[#E8E0F0] bg-[#FAF3FF] p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#9015A8]">
                  OCR
                </p>

                <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.04em] text-[#1A1F2E] sm:text-2xl">
                  Extract text from anything.
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-[#747C8D]">
                  Use your camera or gallery and convert visible text
                  into reusable content.
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F2DEFA]">
                <Type className="h-4 w-4 text-[#9015A8]" />
              </div>
            </div>

            <div className="mt-5 rounded-[18px] border border-[#E4DCE9] bg-white p-4 shadow-[0_12px_30px_rgba(62,45,78,0.05)]">
              <p className="text-sm font-semibold text-[#191E2B]">
                Select OCR Source
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-[14px] bg-[#F8F9FC] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Camera className="h-4 w-4 text-[#4F6FFF]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#272C3A]">
                      Camera
                    </p>

                    <p className="mt-0.5 text-[8px] text-[#8D93A2]">
                      Capture text
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-[14px] bg-[#F8F9FC] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#FFF0D9]">
                    <ImageIcon className="h-4 w-4 text-[#E79500]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#272C3A]">
                      Gallery
                    </p>

                    <p className="mt-0.5 text-[8px] text-[#8D93A2]">
                      Existing image
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-[16px] bg-[#F1E8F8] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white">
                <FileText className="h-4 w-4 text-[#9015A8]" />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#252A38]">
                  Text extracted
                </p>

                <p className="text-[8px] text-[#7A8291]">
                  Copy, edit and reuse
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {ocrFeatures.map(
                (feature) => (
                  <span
                    key={
                      feature
                    }
                    className="rounded-full bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#626A7B]"
                  >
                    {feature}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}