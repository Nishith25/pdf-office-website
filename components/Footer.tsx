import Image from "next/image";

import {
  ArrowUpRight,
  FileText,
  ScanLine,
} from "lucide-react";

type FooterProps = {
  brandName: string;
  shortName: string;
  playStoreUrl: string;
};

export default function Footer({
  brandName,
  shortName,
  playStoreUrl,
}: FooterProps) {
  const year =
    new Date().getFullYear();

  return (
    <footer className="border-t border-[#E3E6EE] bg-[#F4F6FB] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/app-icon.png"
                alt={`${brandName} app icon`}
                width={52}
                height={52}
                className="h-12 w-12 shrink-0 rounded-[14px] object-cover shadow-[0_8px_20px_rgba(45,55,100,0.12)]"
              />

              <div>
                <p className="font-bold tracking-[-0.025em] text-[#171B2B]">
                  {brandName}
                </p>

                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[#999EAD]">
                  Scanner • OCR • PDF Tools • eSign
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#747C8E]">
              Scan, convert, sign and organize documents from one
              mobile workspace.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-[#5D6577] shadow-sm">
                <ScanLine className="h-3 w-3 text-[#4F6FFF]" />

                Smart scanning
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-[#5D6577] shadow-sm">
                <FileText className="h-3 w-3 text-[#E79100]" />

                PDF utilities
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#949AA8]">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#features"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                Features
              </a>

              <a
                href="#tools"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                PDF Tools
              </a>

              <a
                href="#scanner"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                Scanner & OCR
              </a>

              <a
                href="#organize"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                Convert & Organize
              </a>

              <a
                href="#esign"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                eSign
              </a>

              <a
                href="#faq"
                className="w-fit text-sm font-medium text-[#555D70] transition hover:text-[#4F6FFF]"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Download */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#949AA8]">
              Get {shortName}
            </p>

            <p className="mt-5 max-w-[220px] text-sm leading-6 text-[#747C8D]">
              Take your scanner and PDF toolkit wherever you go.
            </p>

            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#4F6FFF] px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(79,111,255,0.20)] transition hover:-translate-y-0.5 hover:bg-[#405FE6]"
            >
              Google Play

              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#DEE2EB] pt-6 text-xs text-[#969CAA] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>

          <p>
            Scan · Convert · Sign · Organize
          </p>
        </div>
      </div>
    </footer>
  );
}