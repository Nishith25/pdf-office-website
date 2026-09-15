import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function DownloadBlock({
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

  const image =
    blockText(
      data,
      "image",
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl border border-black/10 bg-white p-7 lg:grid-cols-2 lg:p-10">
        <div>
          {title && (
            <h2 className="text-3xl font-bold tracking-[-0.035em]">
              {
                title
              }
            </h2>
          )}

          {description && (
            <p className="mt-4 whitespace-pre-line leading-8 opacity-70">
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
              className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[var(--cms-primary)] px-6 text-sm font-bold text-white"
            >
              {
                buttonLabel
              }
            </a>
          )}
        </div>

        {image && (
          <img
            src={
              image
            }
            alt=""
            className="max-h-[500px] w-full rounded-2xl object-contain"
          />
        )}
      </div>
    </section>
  );
}