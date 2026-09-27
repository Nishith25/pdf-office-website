"use client";

import {
  useEffect,
} from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error:
    Error & {
      digest?:
        string;
    };

  reset:
    () => void;
}) {
  useEffect(
    () => {
      console.error(
        error,
      );
    },
    [
      error,
    ],
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-[#111827]">
      <div className="w-full max-w-xl text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#3157E7]">
          Website error
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Something went wrong.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#707784]">
          The page could not be loaded correctly. You can retry the
          request without losing your place.
        </p>

        <button
          type="button"
          onClick={
            reset
          }
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[10px] bg-[#3157E7] px-5 text-sm font-semibold text-white transition hover:bg-[#2849C7]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
