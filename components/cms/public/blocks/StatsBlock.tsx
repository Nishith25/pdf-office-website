import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function StatsBlock({
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

  const items =
    blockLines(
      data,
      "items",
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-center text-3xl font-bold tracking-[-0.035em]">
            {
              title
            }
          </h2>
        )}

        {items.length >
          0 && (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(
              (
                item,
                index,
              ) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-black/10 p-6 text-center"
                >
                  <p className="text-xl font-bold text-[var(--cms-primary)]">
                    {
                      item
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}