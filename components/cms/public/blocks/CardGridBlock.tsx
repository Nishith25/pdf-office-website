import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

function splitCard(
  value:
    string,
) {
  const marker =
    " — ";

  const index =
    value.indexOf(
      marker,
    );

  if (
    index ===
    -1
  ) {
    return {
      title:
        value,

      description:
        "",
    };
  }

  return {
    title:
      value
        .slice(
          0,
          index,
        )
        .trim(),

    description:
      value
        .slice(
          index +
            marker.length,
        )
        .trim(),
  };
}

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
    <section className="pdf-card-grid pdf-section">
      <div className="pdf-container">
        {title && (
          <h2 className="pdf-section-title">
            {
              title
            }
          </h2>
        )}

        {description && (
          <p className="pdf-section-description">
            {
              description
            }
          </p>
        )}

        {cards.length >
          0 && (
          <div className="pdf-card-grid-list">
            {cards.map(
              (
                value,
                index,
              ) => {
                const card =
                  splitCard(
                    value,
                  );

                return (
                  <article
                    key={`${value}-${index}`}
                    className={`pdf-editorial-card ${
                      card.description
                        ? ""
                        : "pdf-editorial-card-compact"
                    }`}
                  >
                    <div className="pdf-card-index">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </div>

                    <h3 className="pdf-card-title">
                      {
                        card.title
                      }
                    </h3>

                    {card.description && (
                      <p className="pdf-card-description">
                        {
                          card.description
                        }
                      </p>
                    )}
                  </article>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}
