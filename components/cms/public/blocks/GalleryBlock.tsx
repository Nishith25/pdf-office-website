import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function GalleryBlock({
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

  const images =
    blockLines(
      data,
      "images",
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

        {images.length >
          0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map(
              (
                image,
                index,
              ) => (
                <img
                  key={`${image}-${index}`}
                  src={
                    image
                  }
                  alt=""
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}