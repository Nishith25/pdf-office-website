import {
  describe,
  expect,
  it,
} from "vitest";

import {
  MAX_MEDIA_BYTES,
  mediaCreateSchema,
} from "../lib/media/validation";

describe(
  "media validation",
  () => {
    const validMedia = {
      name:
        "pdf-office-screen.png",

      url:
        "https://res.cloudinary.com/example/image/upload/test.png",

      publicId:
        "pdf-office/test",

      mimeType:
        "image/png",

      width:
        1080,

      height:
        1920,

      size:
        500000,
    };

    it(
      "accepts a valid image record",
      () => {
        expect(
          mediaCreateSchema.safeParse(
            validMedia,
          ).success,
        ).toBe(true);
      },
    );

    it(
      "rejects unsupported media types",
      () => {
        expect(
          mediaCreateSchema.safeParse({
            ...validMedia,

            mimeType:
              "image/svg+xml",
          }).success,
        ).toBe(false);
      },
    );

    it(
      "rejects an image larger than 8 MB",
      () => {
        expect(
          mediaCreateSchema.safeParse({
            ...validMedia,

            size:
              MAX_MEDIA_BYTES +
              1,
          }).success,
        ).toBe(false);
      },
    );
  },
);