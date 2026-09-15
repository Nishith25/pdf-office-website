import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function FeatureGridBlock({
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

  const items =
    blockLines(
      data,
      "items",
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
            {
              title
            }
          </h2>
        )}

        {description && (
          <p className="mt-4 max-w-3xl text-base leading-8 opacity-70">
            {
              description
            }
          </p>
        )}

        {items.length >
          0 && (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(
              (
                item,
                index,
              ) => (
                <article
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-black/10 bg-white/60 p-6"
                >
                  <div className="mb-4 h-2 w-10 rounded-full bg-[var(--cms-primary)]" />

                  <p className="font-semibold leading-7">
                    {
                      item
                    }
                  </p>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}