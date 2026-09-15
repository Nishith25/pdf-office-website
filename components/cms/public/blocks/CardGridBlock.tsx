import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function CardGridBlock({
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

  const cards =
    blockLines(
      data,
      "cards",
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-3xl font-bold tracking-[-0.035em]">
            {
              title
            }
          </h2>
        )}

        {description && (
          <p className="mt-4 max-w-3xl leading-8 opacity-70">
            {
              description
            }
          </p>
        )}

        {cards.length >
          0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(
              (
                card,
                index,
              ) => (
                <article
                  key={`${card}-${index}`}
                  className="min-h-36 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <p className="font-semibold leading-7">
                    {
                      card
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