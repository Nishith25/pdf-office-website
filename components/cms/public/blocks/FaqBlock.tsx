import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function FaqBlock({
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
      <div className="mx-auto max-w-4xl">
        {title && (
          <h2 className="text-3xl font-bold tracking-[-0.035em]">
            {
              title
            }
          </h2>
        )}

        {items.length >
          0 && (
          <div className="mt-8 space-y-3">
            {items.map(
              (
                item,
                index,
              ) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <p className="font-semibold leading-7">
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