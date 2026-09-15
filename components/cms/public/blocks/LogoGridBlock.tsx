import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function LogoGridBlock({
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

  const logos =
    blockLines(
      data,
      "logos",
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

        {logos.length >
          0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {logos.map(
              (
                logo,
                index,
              ) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex min-h-28 items-center justify-center rounded-2xl border border-black/10 bg-white p-6"
                >
                  <img
                    src={
                      logo
                    }
                    alt=""
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}