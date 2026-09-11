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
    description: "Choose your PDF.",
  },
  {
    icon: PenLine,
    title: "Add signature",
    description: "Place your signature.",
  },
  {
    icon: Send,
    title: "Save & share",
    description: "Export the signed PDF.",
  },
];

export default function ESignShowcase() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="esign"
      className="scroll-mt-24 relative overflow-hidden border-y border-[#ECEEF3] bg-[#F7FCF9] px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
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
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#DDF8E6]">
            <FileSignature className="h-4 w-4 text-[#16A957]" />
          </div>

          <p className="mt-4 text-xs font-semibold text-[#16A957]">
            eSign
          </p>

          <h2 className="mt-2 max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
            Sign PDFs without printing them.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#727A8C] sm:text-base">
            Add a digital signature directly from your phone and keep
            the entire document workflow digital.
          </p>

          <div className="mt-5 grid gap-2">
            {[
              "Add signatures directly",
              "Keep workflows digital",
              "Save and share PDFs",
            ].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDF8E6]">
                    <Check className="h-3 w-3 text-[#16A957]" />
                  </div>

                  <p className="text-xs font-medium text-[#535B6D]">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 24,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="rounded-[24px] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_50px_rgba(30,63,45,0.06)]"
        >
          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
            <div className="mx-auto w-full max-w-[220px] rounded-[18px] border border-[#E3E8E5] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 w-20 rounded-full bg-[#DDE2E5]" />
                  <div className="mt-2 h-1.5 w-12 rounded-full bg-[#ECEFF1]" />
                </div>

                <ShieldCheck className="h-4 w-4 text-[#18A95B]" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-1.5 w-full rounded bg-[#ECEFF1]" />
                <div className="h-1.5 w-[85%] rounded bg-[#ECEFF1]" />
                <div className="h-1.5 w-full rounded bg-[#ECEFF1]" />
              </div>

              <div className="mt-6">
                <p className="text-[8px] uppercase tracking-[0.12em] text-[#9AA0AA]">
                  Signature
                </p>

                <div className="mt-3 rotate-[-5deg] border-b-2 border-[#18A957] pb-1 font-serif text-lg italic text-[#148947]">
                  Signature
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#EDF0EE] pt-3">
                <p className="text-[8px] text-[#9A9FA8]">
                  Signed digitally
                </p>

                <Check className="h-3.5 w-3.5 text-[#18A957]" />
              </div>
            </div>

            <div className="grid gap-2">
              {steps.map(
                (
                  step,
                  index,
                ) => {
                  const Icon =
                    step.icon;

                  return (
                    <motion.div
                      key={
                        step.title
                      }
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              x: 12,
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
                        delay:
                          index *
                          0.07,
                      }}
                      className="flex gap-3 rounded-[14px] bg-[#F5FBF7] p-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#DFF7E7]">
                        <Icon className="h-3.5 w-3.5 text-[#18A957]" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#262B38]">
                          {
                            step.title
                          }
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#7B8391]">
                          {
                            step.description
                          }
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