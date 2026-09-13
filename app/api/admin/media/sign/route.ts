import {
  NextResponse,
} from "next/server";

import {
  getCurrentAdmin,
} from "../../../../../lib/auth/current-admin";

import {
  createCloudinaryUploadSignature,
} from "../../../../../lib/media/cloudinary";

import {
  ALLOWED_MEDIA_MIME_TYPES,
  MAX_MEDIA_BYTES,
} from "../../../../../lib/media/validation";

export async function POST() {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    return NextResponse.json({
      ...createCloudinaryUploadSignature(),

      maxBytes:
        MAX_MEDIA_BYTES,

      allowedMimeTypes:
        ALLOWED_MEDIA_MIME_TYPES,
    });
  } catch (
    error
  ) {
    console.error(
      "Unable to create Cloudinary signature:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Media service is not configured.",
      },
      {
        status: 500,
      },
    );
  }
}