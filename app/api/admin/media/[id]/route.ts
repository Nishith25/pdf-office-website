import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCurrentAdmin,
} from "../../../../../lib/auth/current-admin";

import {
  destroyCloudinaryImage,
} from "../../../../../lib/media/cloudinary";

import {
  writeActivity,
} from "../../../../../lib/repositories/activity";

import {
  deleteMediaRecord,
  getMediaItemById,
  getMediaUsage,
} from "../../../../../lib/repositories/media";

type RouteContext = {
  params:
    Promise<{
      id:
        string;
    }>;
};

export async function DELETE(
  _request:
    NextRequest,

  context:
    RouteContext,
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

  const {
    id,
  } =
    await context.params;

  const media =
    await getMediaItemById(
      id,
    );

  if (!media) {
    return NextResponse.json(
      {
        error:
          "Media was not found.",
      },
      {
        status: 404,
      },
    );
  }

  const usage =
    await getMediaUsage(
      media,
    );

  if (
    usage.length >
    0
  ) {
    return NextResponse.json(
      {
        error:
          "This media is currently in use.",

        usage,
      },
      {
        status: 409,
      },
    );
  }

  try {
    const result =
      await destroyCloudinaryImage(
        media.publicId,
      );

    if (
      result !== "ok" &&
      result !==
        "not found"
    ) {
      throw new Error(
        `Cloudinary delete returned: ${result}`,
      );
    }

    await deleteMediaRecord(
      media.id,
    );

    await writeActivity(
      "Deleted media",
      "media",
      media.name,
    );

    return NextResponse.json({
      success: true,
    });
  } catch (
    error
  ) {
    console.error(
      "Media deletion failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete media.",
      },
      {
        status: 500,
      },
    );
  }
}