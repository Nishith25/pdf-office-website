"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import {
  Clipboard,
  ImagePlus,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

import {
  ALLOWED_MEDIA_MIME_TYPES,
  MAX_MEDIA_BYTES,
} from "../../../lib/media/validation";

import type {
  MediaItem,
} from "../../../lib/media/validation";

type MediaLibraryProps = {
  initialMedia:
    MediaItem[];
};

type UploadSignature = {
  cloudName:
    string;

  apiKey:
    string;

  timestamp:
    number;

  folder:
    string;

  signature:
    string;
};

type CloudinaryResponse = {
  secure_url:
    string;

  public_id:
    string;

  width:
    number;

  height:
    number;

  bytes:
    number;
};

export default function MediaLibrary({
  initialMedia,
}: MediaLibraryProps) {
  const [
    media,
    setMedia,
  ] =
    useState(
      initialMedia,
    );

  const [
    uploading,
    setUploading,
  ] =
    useState(false);

  const [
    deletingId,
    setDeletingId,
  ] =
    useState<
      string | null
    >(null);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  const inputRef =
    useRef<
      HTMLInputElement
    >(null);

  async function uploadFile(
    file:
      File,
  ) {
    setError(null);

    if (
      !ALLOWED_MEDIA_MIME_TYPES.includes(
        file.type as never,
      )
    ) {
      setError(
        "Use PNG, JPEG, WebP or AVIF images only.",
      );

      return;
    }

    if (
      file.size >
      MAX_MEDIA_BYTES
    ) {
      setError(
        "The image must be 8 MB or smaller.",
      );

      return;
    }

    setUploading(
      true,
    );

    try {
      const signingResponse =
        await fetch(
          "/api/admin/media/sign",
          {
            method:
              "POST",
          },
        );

      if (
        !signingResponse.ok
      ) {
        throw new Error(
          "Unable to prepare upload.",
        );
      }

      const signature =
        await signingResponse.json() as UploadSignature;

      const cloudinaryData =
        new FormData();

      cloudinaryData.append(
        "file",
        file,
      );

      cloudinaryData.append(
        "api_key",
        signature.apiKey,
      );

      cloudinaryData.append(
        "timestamp",
        String(
          signature.timestamp,
        ),
      );

      cloudinaryData.append(
        "folder",
        signature.folder,
      );

      cloudinaryData.append(
        "signature",
        signature.signature,
      );

      const uploadResponse =
        await fetch(
          `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
          {
            method:
              "POST",

            body:
              cloudinaryData,
          },
        );

      if (
        !uploadResponse.ok
      ) {
        throw new Error(
          "Cloudinary upload failed.",
        );
      }

      const uploaded =
        await uploadResponse.json() as CloudinaryResponse;

      const recordResponse =
        await fetch(
          "/api/admin/media",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                name:
                  file.name,

                url:
                  uploaded.secure_url,

                publicId:
                  uploaded.public_id,

                mimeType:
                  file.type,

                width:
                  uploaded.width,

                height:
                  uploaded.height,

                size:
                  file.size,
              }),
          },
        );

      if (
        !recordResponse.ok
      ) {
        throw new Error(
          "Image uploaded, but the media record could not be saved.",
        );
      }

      const result =
        await recordResponse.json();

      setMedia(
        (
          current,
        ) => [
          result.media,
          ...current.filter(
            (
              item,
            ) =>
              item.id !==
              result.media.id,
          ),
        ],
      );
    } catch (
      uploadError
    ) {
      console.error(
        uploadError,
      );

      setError(
        uploadError instanceof
        Error
          ? uploadError.message
          : "Upload failed.",
      );
    } finally {
      setUploading(
        false,
      );

      if (
        inputRef.current
      ) {
        inputRef.current.value =
          "";
      }
    }
  }

  function handleFile(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target
        .files?.[0];

    if (file) {
      void uploadFile(
        file,
      );
    }
  }

  async function deleteMedia(
    item:
      MediaItem,
  ) {
    if (
      !window.confirm(
        `Delete "${item.name}"?`,
      )
    ) {
      return;
    }

    setError(null);

    setDeletingId(
      item.id,
    );

    try {
      const response =
        await fetch(
          `/api/admin/media/${item.id}`,
          {
            method:
              "DELETE",
          },
        );

      const result =
        await response.json();

      if (
        response.status ===
        409
      ) {
        const usage =
          Array.isArray(
            result.usage,
          )
            ? result.usage.join(
                ", ",
              )
            : "the website";

        throw new Error(
          `Cannot delete this image because it is used by: ${usage}.`,
        );
      }

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to delete image.",
        );
      }

      setMedia(
        (
          current,
        ) =>
          current.filter(
            (
              currentItem,
            ) =>
              currentItem.id !==
              item.id,
          ),
      );
    } catch (
      deleteError
    ) {
      setError(
        deleteError instanceof
        Error
          ? deleteError.message
          : "Delete failed.",
      );
    } finally {
      setDeletingId(
        null,
      );
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#E2E4E8] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#252A34]">
            Media Library
          </p>

          <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
            PNG, JPEG, WebP or AVIF · maximum 8 MB
          </p>
        </div>

        <div>
          <input
            ref={
              inputRef
            }
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            disabled={
              uploading
            }
            onChange={
              handleFile
            }
            className="hidden"
          />

          <button
            type="button"
            disabled={
              uploading
            }
            onClick={() =>
              inputRef.current
                ?.click()
            }
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] bg-[#3157E7] px-4 text-[10px] font-semibold text-white disabled:opacity-60"
          >
            {uploading
              ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              )
              : (
                <Upload className="h-4 w-4" />
              )}

            {uploading
              ? "Uploading..."
              : "Upload image"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-[11px] border border-[#F0D5D5] bg-[#FFF5F5] px-4 py-3 text-[10px] leading-5 text-[#A94444]">
          {error}
        </div>
      )}

      {media.length >
      0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map(
            (
              item,
            ) => (
              <article
                key={
                  item.id
                }
                className="overflow-hidden rounded-[15px] border border-[#E1E4E8] bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F1F2F4]">
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

                <div className="p-3.5">
                  <p className="truncate text-[11px] font-semibold text-[#343A46]">
                    {
                      item.name
                    }
                  </p>

                  <p className="mt-1 text-[8px] text-[#969CA7]">
                    {item.width} ×{" "}
                    {item.height}
                    {" · "}
                    {(
                      item.size /
                      1024 /
                      1024
                    ).toFixed(
                      2,
                    )}{" "}
                    MB
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          item.url,
                        )
                      }
                      className="flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-[#DEE1E6] text-[9px] font-semibold text-[#616875]"
                    >
                      <Clipboard className="h-3 w-3" />

                      Copy URL
                    </button>

                    <button
                      type="button"
                      disabled={
                        deletingId ===
                        item.id
                      }
                      onClick={() =>
                        void deleteMedia(
                          item,
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#EBCFCF] text-[#B14C4C] disabled:opacity-50"
                      aria-label="Delete media"
                    >
                      {deletingId ===
                      item.id
                        ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        )
                        : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                    </button>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="mt-5 flex min-h-[250px] flex-col items-center justify-center rounded-[16px] border border-dashed border-[#D7DAE0] bg-white px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-[#F0F3FF]">
            <ImagePlus className="h-5 w-5 text-[#3157E7]" />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#444A56]">
            No media yet
          </p>

          <p className="mt-2 text-[10px] text-[#9298A3]">
            Upload the first PDF Office image.
          </p>
        </div>
      )}
    </div>
  );
}