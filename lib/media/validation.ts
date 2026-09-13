import {
  z,
} from "zod";

export const MAX_MEDIA_BYTES =
  8 * 1024 * 1024;

export const ALLOWED_MEDIA_MIME_TYPES =
  [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
  ] as const;

export const mediaCreateSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(180),

    url: z
      .string()
      .url(),

    publicId: z
      .string()
      .min(1)
      .max(500),

    mimeType: z.enum(
      ALLOWED_MEDIA_MIME_TYPES,
    ),

    width: z
      .number()
      .int()
      .positive(),

    height: z
      .number()
      .int()
      .positive(),

    size: z
      .number()
      .int()
      .positive()
      .max(
        MAX_MEDIA_BYTES,
      ),
  });

export type MediaCreateInput =
  z.infer<
    typeof mediaCreateSchema
  >;

export type MediaRecord =
  MediaCreateInput & {
    uploadedAt:
      Date;
  };

export type MediaItem =
  MediaRecord & {
    id:
      string;
  };