import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function CtaBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
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

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-[var(--cms-secondary)] px-6 py-14 text-center text-white sm:px-10">
        {title && (
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
            {
              title
            }
          </h2>
        )}

        {description && (
          <p className="mx-auto mt-4 max-w-2xl leading-8 opacity-80">
            {
              description
            }
          </p>
        )}

        {buttonLabel &&
          buttonUrl && (
          <a
            href={
              buttonUrl
            }
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--cms-primary)] px-6 text-sm font-bold text-white"
          >
            {
              buttonLabel
            }
          </a>
        )}
      </div>
    </section>
  );
}