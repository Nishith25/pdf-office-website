import {
  v2 as cloudinary,
} from "cloudinary";

import {
  requireServerEnv,
} from "../env";

export const CLOUDINARY_MEDIA_FOLDER =
  "pdf-office";

export function createCloudinaryUploadSignature() {
  const cloudName =
    requireServerEnv(
      "CLOUDINARY_CLOUD_NAME",
    );

  const apiKey =
    requireServerEnv(
      "CLOUDINARY_API_KEY",
    );

  const apiSecret =
    requireServerEnv(
      "CLOUDINARY_API_SECRET",
    );

  const timestamp =
    Math.floor(
      Date.now() /
        1000,
    );

  const folder =
    CLOUDINARY_MEDIA_FOLDER;

  const signature =
    cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },

      apiSecret,
    );

  return {
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature,
  };
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name:
      requireServerEnv(
        "CLOUDINARY_CLOUD_NAME",
      ),

    api_key:
      requireServerEnv(
        "CLOUDINARY_API_KEY",
      ),

    api_secret:
      requireServerEnv(
        "CLOUDINARY_API_SECRET",
      ),

    secure: true,
  });

  return cloudinary;
}

export async function destroyCloudinaryImage(
  publicId:
    string,
): Promise<string> {
  const client =
    configureCloudinary();

  const result =
    await client.uploader.destroy(
      publicId,
      {
        resource_type:
          "image",

        invalidate:
          true,
      },
    );

  return result.result;
}