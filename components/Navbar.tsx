"use client";

import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

type NavbarProps = {
  brand: {
    name: string;
    shortName: string;
    subtitle: string;
  };

  navigation: {
    features: string;
    tools: string;
    scanner: string;
    faq: string;
    getApp: string;
  };

  playStoreUrl: string;
};

export default function Navbar({
  brand,
  navigation,
  playStoreUrl,
}: NavbarProps) {
  const [open, setOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 10,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  const links = [
    ["Home", "#top"],
    [
      navigation.features,
      "#features",
    ],
    [
      navigation.tools,
      "#tools",
    ],
    [
      navigation.scanner,
      "#scanner",
    ],
    [
      navigation.faq,
      "#faq",
    ],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#E9EAF0] bg-white/95 shadow-[0_8px_30px_rgba(26,31,49,0.05)] backdrop-blur-xl"
          : "border-transparent bg-white/90 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          onClick={() =>
            setOpen(false)
          }
          className="flex min-w-0 items-center gap-3"
          aria-label={`${brand.name} home`}
        >
          <Image
            src="/app-icon.png"
            alt={`${brand.name} app icon`}
            width={44}
            height={44}
            priority
            className="h-10 w-10 shrink-0 rounded-[12px] object-cover shadow-[0_6px_16px_rgba(79,111,255,0.12)]"
          />

          <div className="min-w-0">
            {/* Desktop name */}
            <p className="hidden max-w-[280px] truncate text-sm font-bold tracking-[-0.025em] text-[#111318] md:block">
              {brand.name}
            </p>

            {/* Mobile name */}
            <p className="truncate text-sm font-bold tracking-[-0.025em] text-[#111318] md:hidden">
              {brand.shortName}
            </p>

            <p className="hidden text-[9px] font-medium uppercase tracking-[0.14em] text-[#9A9EAA] md:block">
              {brand.subtitle}
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(
            ([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#616879] transition-all duration-200 hover:bg-[#F2F5FF] hover:text-[#4F6FFF]"
              >
                {label}
              </a>
            ),
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Desktop / tablet button */}
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[#4F6FFF] px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(79,111,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#405FE6] sm:inline-flex"
          >
            {navigation.getApp}

            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() =>
              setOpen(
                (value) =>
                  !value,
              )
            }
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7ED] bg-white text-[#1B1F2B] shadow-sm transition hover:bg-[#F7F8FB] lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-[#ECEEF3] bg-white px-4 pb-5 pt-3 shadow-[0_18px_35px_rgba(25,30,50,0.05)] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map(
              ([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex min-h-12 items-center rounded-[14px] px-3 text-sm font-medium text-[#555D70] transition hover:bg-[#F2F5FF] hover:text-[#4F6FFF]"
                >
                  {label}
                </a>
              ),
            )}

            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                setOpen(false)
              }
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4F6FFF] px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(79,111,255,0.18)] transition hover:bg-[#405FE6]"
            >
              {navigation.getApp}

              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}