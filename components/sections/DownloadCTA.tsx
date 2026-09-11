"use client";

import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  FileSignature,
  ScanLine,
  Type,
} from "lucide-react";

type DownloadCTAProps = {
  appName: string;
  playStoreUrl: string;
};

export default function DownloadCTA({
  appName,
  playStoreUrl,
}: DownloadCTAProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 32,
                scale: 0.985,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.18,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-[#DFE4F5] bg-[#F3F6FF] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#4F6FFF]/10 blur-[105px]" />

        <div className="pointer-events-none absolute -bottom-32 left-[30%] h-80 w-80 rounded-full bg-[#FF9800]/[0.07] blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          {/* Left side */}
          <div>
            <p className="text-sm font-semibold text-[#4F6FFF]">
              Ready when you are
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.055em] text-[#111318] sm:text-5xl lg:text-6xl">
              Your document toolkit,
              always with you.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#70788B] sm:text-lg">
              Scan documents,
              extract text, convert
              files, sign PDFs and
              organize your work
              from one mobile app.
            </p>

            {/* Feature chips */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Document scanner",
                "OCR",
                "PDF tools",
                "eSign",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#DDE3F6] bg-white px-3.5 py-2 text-xs font-medium text-[#555E70]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            {/* CTA */}
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#4F6FFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(79,111,255,0.24)] transition hover:-translate-y-0.5 hover:bg-[#405FE6]"
            >
              Get it on Google Play

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <p className="mt-4 text-xs text-[#959BA9]">
              Scan · Convert ·
              Sign · Organize
            </p>
          </div>

          {/* App identity card */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                    scale: 0.96,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="mx-auto w-full max-w-[350px] lg:ml-auto"
          >
            <div className="rounded-[30px] border border-white bg-white/90 p-6 shadow-[0_24px_70px_rgba(55,67,115,0.12)] backdrop-blur-sm">
              {/* Real app icon */}
              <div className="flex items-center gap-4">
                <Image
                  src="/app-icon.png"
                  alt={`${appName} app icon`}
                  width={80}
                  height={80}
                  className="h-[72px] w-[72px] shrink-0 rounded-[20px] object-cover shadow-[0_10px_28px_rgba(48,58,100,0.14)]"
                />

                <div className="min-w-0">
                  <p className="font-bold leading-5 tracking-[-0.025em] text-[#171C2B]">
                    {appName}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#9A9FAC]">
                    Scanner • OCR •
                    PDF
                  </p>
                </div>
              </div>

              {/* App capabilities */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-[16px] bg-[#EAF0FF] p-3 text-center">
                  <ScanLine className="mx-auto h-4 w-4 text-[#4F6FFF]" />

                  <p className="mt-2 text-[9px] font-semibold text-[#555D6E]">
                    Scan
                  </p>
                </div>

                <div className="rounded-[16px] bg-[#F7E8FC] p-3 text-center">
                  <Type className="mx-auto h-4 w-4 text-[#8B18A8]" />

                  <p className="mt-2 text-[9px] font-semibold text-[#555D6E]">
                    OCR
                  </p>
                </div>

                <div className="rounded-[16px] bg-[#E3F9EA] p-3 text-center">
                  <FileSignature className="mx-auto h-4 w-4 text-[#18A957]" />

                  <p className="mt-2 text-[9px] font-semibold text-[#555D6E]">
                    eSign
                  </p>
                </div>
              </div>

              {/* Install strip */}
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex min-h-12 items-center justify-between rounded-[16px] bg-[#4F6FFF] px-4 text-white transition hover:bg-[#405FE6]"
              >
                <div>
                  <p className="text-[8px] text-white/70">
                    Available on
                  </p>

                  <p className="text-xs font-semibold">
                    Google Play
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}