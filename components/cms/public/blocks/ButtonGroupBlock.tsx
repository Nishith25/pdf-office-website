import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function ButtonGroupBlock({
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

  const buttons =
    blockLines(
      data,
      "buttons",
    );

  return (
    <section className="px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-2xl font-bold tracking-[-0.025em]">
            {
              title
            }
          </h2>
        )}

        {buttons.length >
          0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {buttons.map(
              (
                button,
                index,
              ) => (
                <span
                  key={`${button}-${index}`}
                  className="inline-flex min-h-11 items-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold"
                >
                  {
                    button
                  }
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}