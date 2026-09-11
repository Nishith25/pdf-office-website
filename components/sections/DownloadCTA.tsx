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
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-14">
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 20,
                scale: 0.99,
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
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-[#DFE4F5] bg-[#F3F6FF] px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#4F6FFF]/10 blur-[90px]" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold text-[#4F6FFF]">
              Ready when you are
            </p>

            <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#111318] sm:text-4xl lg:text-5xl">
              Your document toolkit, always with you.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#70788B] sm:text-base">
              Scan, OCR, convert, sign and organize documents from one
              mobile app.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Scanner",
                "OCR",
                "PDF tools",
                "eSign",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#DDE3F6] bg-white px-3 py-1.5 text-[10px] font-medium text-[#555E70]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            <a
              href={
                playStoreUrl
              }
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#4F6FFF] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,111,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#405FE6]"
            >
              Get it on Google Play

              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mx-auto w-full max-w-[300px] lg:ml-auto">
            <div className="rounded-[22px] border border-white bg-white/90 p-5 shadow-[0_18px_50px_rgba(55,67,115,0.09)]">
              <div className="flex items-center gap-3">
                <Image
                  src="/app-icon.png"
                  alt={`${appName} app icon`}
                  width={64}
                  height={64}
                  className="h-14 w-14 rounded-[16px] object-cover shadow-sm"
                />

                <div className="min-w-0">
                  <p className="text-sm font-bold tracking-[-0.02em] text-[#171C2B]">
                    {appName}
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.11em] text-[#9A9FAC]">
                    PDF workspace
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-[12px] bg-[#EAF0FF] p-2.5 text-center">
                  <ScanLine className="mx-auto h-3.5 w-3.5 text-[#4F6FFF]" />
                  <p className="mt-1 text-[8px]">
                    Scan
                  </p>
                </div>

                <div className="rounded-[12px] bg-[#F7E8FC] p-2.5 text-center">
                  <Type className="mx-auto h-3.5 w-3.5 text-[#8B18A8]" />
                  <p className="mt-1 text-[8px]">
                    OCR
                  </p>
                </div>

                <div className="rounded-[12px] bg-[#E3F9EA] p-2.5 text-center">
                  <FileSignature className="mx-auto h-3.5 w-3.5 text-[#18A957]" />
                  <p className="mt-1 text-[8px]">
                    eSign
                  </p>
                </div>
              </div>

              <a
                href={
                  playStoreUrl
                }
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex min-h-10 items-center justify-between rounded-[13px] bg-[#4F6FFF] px-4 text-xs font-semibold text-white"
              >
                Google Play

                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}