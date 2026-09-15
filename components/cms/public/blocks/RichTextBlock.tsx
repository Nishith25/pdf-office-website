import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function RichTextBlock({
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

  const body =
    blockText(
      data,
      "body",
    );

  return (
    <section className="px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {title && (
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
            {
              title
            }
          </h2>
        )}

        {body && (
          <div className="mt-6 whitespace-pre-line text-base leading-8 opacity-75">
            {
              body
            }
          </div>
        )}
      </div>
    </section>
  );
}