"use client";

import {
  useState,
} from "react";

import {
  ImageIcon,
  Loader2,
  X,
} from "lucide-react";

import type {
  MediaItem,
} from "../../../lib/media/validation";

type MediaPickerFieldProps = {
  label:
    string;

  name:
    string;

  value:
    string;

  onChange:
    (
      value:
        string,
    ) => void;

  hint?:
    string;
};

export default function MediaPickerField({
  label,
  name,
  value,
  onChange,
  hint,
}: MediaPickerFieldProps) {
  const [
    open,
    setOpen,
  ] =
    useState(false);

  const [
    media,
    setMedia,
  ] =
    useState<
      MediaItem[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    loaded,
    setLoaded,
  ] =
    useState(false);

  async function openPicker() {
    setOpen(
      true,
    );

    if (loaded) {
      return;
    }

    setLoading(
      true,
    );

    try {
      const response =
        await fetch(
          "/api/admin/media",
        );

      if (
        !response.ok
      ) {
        return;
      }

      const result =
        await response.json();

      setMedia(
        result.media ??
          [],
      );

      setLoaded(
        true,
      );
    } finally {
      setLoading(
        false,
      );
    }
  }

  return (
    <div>
      <input
        type="hidden"
        name={
          name
        }
        value={
          value
        }
      />

      <div className="flex items-end justify-between gap-3">
        <label className="text-[11px] font-semibold text-[#343A46]">
          {label}
        </label>

        {hint && (
          <span className="text-[9px] text-[#9BA1AC]">
            {hint}
          </span>
        )}
      </div>

      <div className="mt-2 rounded-[11px] border border-[#DDE0E6] bg-white p-3">
        {value ? (
          <div className="flex items-center gap-3">
            <img
              src={
                value
              }
              alt=""
              className="h-14 w-14 rounded-[8px] border border-[#E2E4E8] object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] text-[#747B88]">
                {value}
              </p>

              <button
                type="button"
                onClick={() =>
                  onChange(
                    "",
                  )
                }
                className="mt-2 text-[9px] font-semibold text-[#A14B4B]"
              >
                Remove selection
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-[#969CA7]">
            No image selected.
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            void openPicker()
          }
          className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-[8px] border border-[#DDE0E6] px-3 text-[9px] font-semibold text-[#555C68]"
        >
          <ImageIcon className="h-3.5 w-3.5" />

          Choose from Media Library
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[120] bg-[#171A22]/55 p-4 backdrop-blur-sm">
          <div className="mx-auto flex max-h-full max-w-5xl flex-col overflow-hidden rounded-[18px] bg-[#F6F7F8] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E4E8] bg-white px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#262B35]">
                  Choose media
                </p>

                <p className="mt-1 text-[9px] text-[#9298A3]">
                  Select an image already uploaded to Cloudinary.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(
                    false,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#E0E3E8] bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {loading ? (
                <div className="flex min-h-[250px] items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#3157E7]" />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {media.map(
                    (
                      item,
                    ) => (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        onClick={() => {
                          onChange(
                            item.url,
                          );

                          setOpen(
                            false,
                          );
                        }}
                        className="overflow-hidden rounded-[12px] border border-[#DFE2E7] bg-white text-left transition hover:border-[#7C91E8] hover:ring-2 hover:ring-[#3157E7]/10"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-[#EFF0F2]">
                          <img
                            src={
                              item.url
                            }
                            alt={
                              item.name
                            }
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <p className="truncate px-3 py-2.5 text-[9px] font-semibold text-[#505763]">
                          {
                            item.name
                          }
                        </p>
                      </button>
                    ),
                  )}
                </div>
              )}

              {!loading &&
                media.length ===
                  0 && (
                  <p className="py-16 text-center text-[10px] text-[#9298A3]">
                    No images have been uploaded yet.
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}