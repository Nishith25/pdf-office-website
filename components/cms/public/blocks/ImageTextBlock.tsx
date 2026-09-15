import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function ImageTextBlock({
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

  const imagePosition =
    blockText(
      data,
      "imagePosition",
    );

  const imageFirst =
    imagePosition ===
    "left";

  const copy = (
    <div>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--cms-primary)]">
          {
            eyebrow
          }
        </p>
      )}

      {title && (
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
          {
            title
          }
        </h2>
      )}

      {description && (
        <p className="mt-5 whitespace-pre-line text-base leading-8 opacity-75">
          {
            description
          }
        </p>
      )}
    </div>
  );

  const media =
    image ? (
      <img
        src={
          image
        }
        alt=""
        className="min-h-[280px] w-full rounded-3xl object-cover"
      />
    ) : (
      <div />
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {imageFirst ? (
          <>
            {
              media
            }
            {
              copy
            }
          </>
        ) : (
          <>
            {
              copy
            }
            {
              media
            }
          </>
        )}
      </div>
    </section>
  );
}