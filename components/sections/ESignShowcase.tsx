"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Check,
  FileSignature,
  FileText,
  PenLine,
  Send,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Open document",
    description: "Choose the PDF you want to sign.",
  },
  {
    icon: PenLine,
    title: "Add signature",
    description: "Place your signature where it belongs.",
  },
  {
    icon: Send,
    title: "Save & share",
    description: "Keep or share the completed document.",
  },
];

export default function ESignShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="esign"
      className="scroll-mt-24 relative overflow-hidden border-y border-[#ECEEF3] bg-[#F7FCF9] px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#18B865]/[0.07] blur-[100px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#4F6FFF]/[0.05] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Copy */}
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
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#DDF8E6]">
            <FileSignature className="h-5 w-5 text-[#16A957]" />
          </div>

          <p className="mt-6 text-sm font-semibold text-[#16A957]">
            eSign
          </p>

          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1] tracking-[-0.055em] text-[#111318] sm:text-5xl lg:text-6xl">
            Sign PDFs without printing them.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#727A8C] sm:text-lg">
            Add a digital signature directly from your phone and keep
            document workflows moving without printing, scanning and
            repeating the process.
          </p>

          <div className="mt-7 space-y-3">
            {[
              "Add signatures directly to documents",
              "Keep your workflow completely digital",
              "Save and share completed PDFs",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DDF8E6]">
                  <Check className="h-3.5 w-3.5 text-[#16A957]" />
                </div>

                <p className="text-sm font-medium text-[#535B6D]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Document visual */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 30,
                  y: 15,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="rounded-[32px] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(30,63,45,0.08)] sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-[1fr_0.8fr] sm:items-center">
            {/* Document */}
            <div className="relative mx-auto w-full max-w-[310px]">
              <div className="rounded-[22px] border border-[#E3E8E5] bg-white p-6 shadow-[0_18px_50px_rgba(35,50,43,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-3 w-24 rounded-full bg-[#DDE2E5]" />
                    <div className="mt-2 h-2 w-16 rounded-full bg-[#ECEFF1]" />
                  </div>

                  <ShieldCheck className="h-5 w-5 text-[#18A95B]" />
                </div>

                <div className="mt-8 space-y-3">
                  <div className="h-2 w-full rounded-full bg-[#ECEFF1]" />
                  <div className="h-2 w-[90%] rounded-full bg-[#ECEFF1]" />
                  <div className="h-2 w-full rounded-full bg-[#ECEFF1]" />
                  <div className="h-2 w-[72%] rounded-full bg-[#ECEFF1]" />
                </div>

                <div className="mt-9">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9AA0AA]">
                    Signature
                  </p>

                  <motion.div
                    initial={
                      reduceMotion
                        ? false
                        : {
                            width: 0,
                          }
                    }
                    whileInView={{
                      width: "100%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                    className="mt-5 max-w-[150px] overflow-hidden"
                  >
                    <div className="w-[150px] rotate-[-5deg] border-b-2 border-[#18A957] pb-2 font-serif text-2xl italic text-[#148947]">
                      Signature
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#EDF0EE] pt-4">
                  <p className="text-[9px] text-[#9A9FA8]">
                    Signed digitally
                  </p>

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDF8E6]">
                    <Check className="h-3.5 w-3.5 text-[#18A957]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {steps.map(
                (
                  step,
                  index,
                ) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.title}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: 18,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          reduceMotion
                            ? 0
                            : index * 0.09,
                      }}
                      className="flex gap-3 rounded-[18px] bg-[#F5FBF7] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#DFF7E7]">
                        <Icon className="h-4 w-4 text-[#18A957]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#262B38]">
                          {step.title}
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-[#7B8391]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}