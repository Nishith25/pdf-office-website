import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

function splitFeature(
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

export default function FeatureGridBlock({
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

  const items =
    blockLines(
      data,
      "items",
    );

  return (
    <section className="pdf-feature-grid pdf-section">
      <div className="pdf-container pdf-feature-layout">
        <div>
          <p className="pdf-eyebrow">
            Built for document work
          </p>

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
        </div>

        {items.length >
          0 && (
          <div className="pdf-feature-list">
            {items.map(
              (
                value,
                index,
              ) => {
                const feature =
                  splitFeature(
                    value,
                  );

                return (
                  <article
                    key={`${value}-${index}`}
                    className="pdf-feature-row"
                  >
                    <div className="pdf-feature-number">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </div>

                    <div>
                      <h3 className="pdf-feature-title">
                        {
                          feature.title
                        }
                      </h3>

                      {feature.description && (
                        <p className="pdf-feature-description">
                          {
                            feature.description
                          }
                        </p>
                      )}
                    </div>
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
