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
    <section>
      <div className="mx-auto max-w-6xl px-7 py-16 text-center text-white sm:px-12 sm:py-20">
        {title && (
          <h2 className="mx-auto max-w-3xl text-4xl font-[850] leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            {
              title
            }
          </h2>
        )}

        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-white/60">
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
            className="pdf-primary-button mt-8"
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
