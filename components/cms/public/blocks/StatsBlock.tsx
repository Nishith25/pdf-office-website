import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

function splitStat(
  item:
    string,
) {
  const marker =
    " — ";

  const index =
    item.indexOf(
      marker,
    );

  if (
    index ===
    -1
  ) {
    return {
      value:
        item,

      label:
        "",
    };
  }

  return {
    value:
      item
        .slice(
          0,
          index,
        )
        .trim(),

    label:
      item
        .slice(
          index +
            marker.length,
        )
        .trim(),
  };
}

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
    <section className="pdf-stats">
      <div className="pdf-stats-inner">
        {title && (
          <p className="pdf-stats-title">
            {
              title
            }
          </p>
        )}

        {items.length >
          0 && (
          <div className="pdf-stats-grid">
            {items.map(
              (
                item,
                index,
              ) => {
                const stat =
                  splitStat(
                    item,
                  );

                return (
                  <div
                    key={`${item}-${index}`}
                    className="pdf-stat"
                  >
                    <div className="pdf-stat-value">
                      {
                        stat.value
                      }
                    </div>

                    {stat.label && (
                      <div className="pdf-stat-label">
                        {
                          stat.label
                        }
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}
