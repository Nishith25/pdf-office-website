import type {
  CmsPublicBlockData,
} from "./block-data";

import {
  blockText,
} from "./block-data";

export default function HeroBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
  const eyebrow =
    blockText(
      data,
      "eyebrow",
    );

  const title =
    blockText(
      data,
      "title",
    );

  const description =
    blockText(
      data,
      "description",
    );

  const image =
    blockText(
      data,
      "image",
    );

  const buttonLabel =
    blockText(
      data,
      "buttonLabel",
    );

  const buttonUrl =
    blockText(
      data,
      "buttonUrl",
    );

  const alignment =
    blockText(
      data,
      "alignment",
    );

  const centered =
    alignment ===
    "center";

  return (
    <section className="overflow-hidden px-5 py-20 sm:px-6 sm:py-28">
      <div
        className={`mx-auto max-w-6xl ${
          centered
            ? "text-center"
            : ""
        }`}
      >
        <div
          className={
            centered
              ? "mx-auto max-w-4xl"
              : "max-w-4xl"
          }
        >
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--cms-primary)]">
              {
                eyebrow
              }
            </p>
          )}

          {title && (
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-[var(--cms-text)] sm:text-5xl lg:text-6xl">
              {
                title
              }
            </h1>
          )}

          {description && (
            <p
              className={`mt-6 whitespace-pre-line text-base leading-8 opacity-75 sm:text-lg ${
                centered
                  ? "mx-auto max-w-3xl"
                  : "max-w-3xl"
              }`}
            >
              {
                description
              }
            </p>
          )}

          {buttonLabel &&
            buttonUrl && (
              <div className="mt-8">
                <a
                  href={
                    buttonUrl
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--cms-primary)] px-6 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {
                    buttonLabel
                  }
                </a>
              </div>
            )}
        </div>

        {image && (
          <div className="mt-12">
            <img
              src={
                image
              }
              alt=""
              className="mx-auto max-h-[640px] w-full rounded-3xl object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}