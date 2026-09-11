"use client";

import {
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FAQItem[];
};

export default function FAQ({
  eyebrow,
  title,
  description,
  items,
}: FAQProps) {
  const [openItem, setOpenItem] =
    useState<number | null>(0);

  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-y border-[#ECEEF3] bg-[#FAFBFD] px-4 py-12 sm:px-6 sm:py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-12">
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
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#E7EDFF]">
            <HelpCircle className="h-4 w-4 text-[#4F6FFF]" />
          </div>

          <p className="mt-4 text-xs font-semibold text-[#4F6FFF]">
            {eyebrow}
          </p>

          <h2 className="mt-2 max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl">
            {title}
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-[#747C8F]">
            {description}
          </p>
        </motion.div>

        <div className="space-y-2">
          {items.map(
            (
              item,
              index,
            ) => {
              const open =
                openItem ===
                index;

              return (
                <motion.div
                  key={
                    item.question
                  }
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity:
                            0,
                          y: 10,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className={`overflow-hidden rounded-[15px] border transition-colors ${
                    open
                      ? "border-[#CED8FF] bg-[#F2F5FF]"
                      : "border-[#E6E8EE] bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenItem(
                        open
                          ? null
                          : index,
                      )
                    }
                    className="flex min-h-[58px] w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-5"
                  >
                    <span className="text-sm font-semibold tracking-[-0.02em] text-[#191E31] sm:text-base">
                      {
                        item.question
                      }
                    </span>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        open
                          ? "bg-[#DDE5FF] text-[#4F6FFF]"
                          : "bg-[#F3F4F7] text-[#666D7B]"
                      }`}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          open
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-4 pb-4 text-xs leading-6 text-[#6F778A] sm:px-5 sm:text-sm">
                        {
                          item.answer
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}