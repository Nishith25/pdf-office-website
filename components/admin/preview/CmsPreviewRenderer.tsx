import type {
  CmsBlockRecord,
} from "../../../lib/repositories/cms-blocks";

function text(
  value: unknown,
): string {
  return typeof value ===
    "string"
    ? value
    : "";
}

function lines(
  value: unknown,
): string[] {
  return Array.isArray(
    value,
  )
    ? value.map(String)
    : [];
}

export default function CmsPreviewRenderer({
  blocks,
}: {
  blocks:
    CmsBlockRecord[];
}) {
  return (
    <div className="mx-auto max-w-6xl">
      {blocks
        .filter(
          (block) =>
            block.visible,
        )
        .map(
          (block) => {
            const data =
              block.data;

            if (
              block.type ===
              "divider"
            ) {
              return (
                <hr
                  key={
                    block.id
                  }
                  className="my-10 border-[#E4E7EB]"
                />
              );
            }

            if (
              block.type ===
              "spacer"
            ) {
              const size =
                text(
                  data.size,
                );

              return (
                <div
                  key={
                    block.id
                  }
                  className={
                    size ===
                    "large"
                      ? "h-32"
                      : size ===
                          "small"
                        ? "h-8"
                        : "h-16"
                  }
                />
              );
            }

            const title =
              text(
                data.title,
              );

            const description =
              text(
                data.description,
              ) ||
              text(
                data.body,
              );

            const image =
              text(
                data.image,
              );

            const items =
              lines(
                data.items,
              ).length
                ? lines(
                    data.items,
                  )
                : lines(
                    data.cards,
                  );

            return (
              <section
                key={
                  block.id
                }
                className="border-b border-[#EEF0F2] px-6 py-14"
              >
                {text(
                  data.eyebrow,
                ) && (
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3157E7]">
                    {
                      text(
                        data.eyebrow,
                      )
                    }
                  </p>
                )}

                {title && (
                  <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-[-0.03em]">
                    {
                      title
                    }
                  </h2>
                )}

                {description && (
                  <p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#68707D]">
                    {
                      description
                    }
                  </p>
                )}

                {image && (
                  <img
                    src={
                      image
                    }
                    alt=""
                    className="mt-7 max-h-[520px] w-full rounded-[18px] border border-[#E1E4E9] object-cover"
                  />
                )}

                {items.length >
                  0 && (
                  <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(
                      (
                        item,
                        index,
                      ) => (
                        <div
                          key={`${item}-${index}`}
                          className="rounded-[13px] border border-[#E3E6EA] bg-[#FAFBFC] p-4 text-sm"
                        >
                          {
                            item
                          }
                        </div>
                      ),
                    )}
                  </div>
                )}
              </section>
            );
          },
        )}
    </div>
  );
}