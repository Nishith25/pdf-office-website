import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  mediaCreateSchema,
} from "../../../../lib/media/validation";

import {
  writeActivity,
} from "../../../../lib/repositories/activity";

import {
  createMediaItem,
  getMediaItems,
} from "../../../../lib/repositories/media";

export async function GET() {
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

  const media =
    await getMediaItems();

  return NextResponse.json({
    media,
  });
}

export async function POST(
  request:
    NextRequest,
) {
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

  let body:
    unknown;

  try {
    body =
      await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }

  const parsed =
    mediaCreateSchema.safeParse(
      body,
    );

  if (
    !parsed.success
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid media record.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const media =
      await createMediaItem(
        parsed.data,
      );

    await writeActivity(
      "Uploaded media",
      "media",
      media.name,
    );

    return NextResponse.json(
      {
        media,
      },
      {
        status: 201,
      },
    );
  } catch (
    error
  ) {
    console.error(
      "Media record creation failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to save media.",
      },
      {
        status: 500,
      },
    );
  }
}