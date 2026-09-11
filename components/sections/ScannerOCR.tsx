"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Camera,
  Check,
  FileText,
  Image,
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
      className="scroll-mt-24 overflow-hidden border-y border-[#ECEEF3] bg-[#FAFBFD] px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
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
            Scanner & OCR
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.055em] text-[#111318] sm:text-5xl lg:text-6xl">
            Turn paper into
            something useful.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#747C8F] sm:text-lg">
            Capture documents,
            clean them up and
            extract reusable text
            directly from your
            phone.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Scanner visual */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -28,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.16,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-[30px] border border-[#DDE4F4] bg-[#EEF3FF] p-5 sm:p-7 lg:p-8"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4F6FFF]/10 blur-[85px]" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#4F6FFF]">
                  Smart Scanner
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#191E2D] sm:text-3xl">
                  Capture cleaner
                  documents.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#DCE6FF]">
                <ScanLine className="h-5 w-5 text-[#4F6FFF]" />
              </div>
            </div>

            {/* Scanner mockup */}
            <div className="relative mx-auto mt-8 max-w-[430px]">
              <div className="rounded-[26px] border-[7px] border-[#171A23] bg-white p-3 shadow-[0_24px_60px_rgba(43,55,95,0.14)]">
                <div className="relative h-[355px] overflow-hidden rounded-[18px] bg-[#252A34] sm:h-[400px]">
                  {/* Camera view */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#777C86] via-[#555B65] to-[#343943]" />

                  <div className="absolute inset-7 rounded-[16px] border-2 border-dashed border-white/70" />

                  {/* Document */}
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
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-[235px] w-[165px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-white p-4 shadow-xl sm:h-[265px] sm:w-[185px]"
                  >
                    <div className="h-4 w-24 rounded-full bg-[#DDE2EB]" />

                    <div className="mt-5 h-2 w-full rounded-full bg-[#E8EBF0]" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-[#E8EBF0]" />
                    <div className="mt-2 h-2 w-full rounded-full bg-[#E8EBF0]" />

                    <div className="mt-6 rounded-[9px] bg-[#EEF3FF] p-3">
                      <div className="h-16 rounded-[6px] bg-[#D8E3FF]" />
                    </div>

                    <div className="mt-5 h-2 w-full rounded-full bg-[#E8EBF0]" />
                    <div className="mt-2 h-2 w-3/4 rounded-full bg-[#E8EBF0]" />
                  </motion.div>

                  {/* Corners */}
                  <div className="absolute left-7 top-7 h-8 w-8 border-l-[3px] border-t-[3px] border-[#4F8AFF]" />

                  <div className="absolute right-7 top-7 h-8 w-8 border-r-[3px] border-t-[3px] border-[#4F8AFF]" />

                  <div className="absolute bottom-7 left-7 h-8 w-8 border-b-[3px] border-l-[3px] border-[#4F8AFF]" />

                  <div className="absolute bottom-7 right-7 h-8 w-8 border-b-[3px] border-r-[3px] border-[#4F8AFF]" />

                  <div className="absolute bottom-5 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#4F6FFF] shadow-[0_8px_24px_rgba(79,111,255,0.3)]">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [
                          0,
                          -5,
                          0,
                        ],
                      }
                }
                transition={{
                  duration: 3,
                  repeat:
                    Infinity,
                  ease:
                    "easeInOut",
                }}
                className="absolute -right-2 top-8 rounded-[16px] border border-[#E5E9F3] bg-white px-3 py-2 shadow-[0_14px_35px_rgba(30,39,70,0.11)] sm:-right-5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFF0D7]">
                    <Sparkles className="h-4 w-4 text-[#F19300]" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold text-[#242938]">
                      Auto enhance
                    </p>

                    <p className="text-[7px] text-[#969CAA]">
                      Clean result
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features */}
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {scannerFeatures.map(
                (feature) => (
                  <div
                    key={
                      feature
                    }
                    className="flex items-center gap-2 rounded-[13px] bg-white/75 px-3 py-2.5"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDF9E7]">
                      <Check className="h-3 w-3 text-[#16A754]" />
                    </div>

                    <span className="text-[11px] font-medium text-[#596174]">
                      {feature}
                    </span>
                  </div>
                ),
              )}
            </div>
          </motion.div>

          {/* OCR */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.16,
            }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="overflow-hidden rounded-[30px] border border-[#E8E0F0] bg-[#FAF3FF] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#9015A8]">
                  OCR
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1A1F2E] sm:text-3xl">
                  Extract text from
                  anything.
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F2DEFA]">
                <Type className="h-5 w-5 text-[#9015A8]" />
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#747C8D]">
              Choose an image from
              your camera or gallery
              and turn visible text
              into reusable digital
              content.
            </p>

            {/* OCR source dialog */}
            <div className="mt-8 rounded-[26px] border border-[#E4DCE9] bg-white p-5 shadow-[0_18px_45px_rgba(62,45,78,0.08)] sm:p-6">
              <p className="text-xl font-semibold tracking-[-0.035em] text-[#191E2B]">
                Select OCR Source
              </p>

              <div className="mt-6 space-y-3">
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                  className="flex items-center gap-3 rounded-[18px] border border-[#E9EBF0] bg-[#FAFBFD] p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EAF0FF]">
                    <Camera className="h-5 w-5 text-[#4F6FFF]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#272C3A]">
                      Camera
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8D93A2]">
                      Capture and
                      extract text
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                  className="flex items-center gap-3 rounded-[18px] border border-[#E9EBF0] bg-[#FAFBFD] p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#FFF0D9]">
                    <Image className="h-5 w-5 text-[#E79500]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#272C3A]">
                      Gallery
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8D93A2]">
                      Extract from an
                      existing image
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Output */}
            <div className="mt-5 rounded-[22px] bg-[#F1E8F8] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white">
                  <FileText className="h-4 w-4 text-[#9015A8]" />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#252A38]">
                    Text extracted
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#7A8291]">
                    Copy, edit and
                    reuse
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {ocrFeatures.map(
                (feature) => (
                  <span
                    key={
                      feature
                    }
                    className="rounded-full bg-white px-3 py-2 text-[10px] font-medium text-[#626A7B]"
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