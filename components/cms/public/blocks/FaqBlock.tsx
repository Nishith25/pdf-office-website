import {
  blockLines,
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

function splitFaq(
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
      question:
        value,

      answer:
        "",
    };
  }

  return {
    question:
      value
        .slice(
          0,
          index,
        )
        .trim(),

    answer:
      value
        .slice(
          index +
            marker.length,
        )
        .trim(),
  };
}

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
    <section className="pdf-faq pdf-section">
      <div className="pdf-container pdf-faq-layout">
        <div>
          <p className="pdf-eyebrow">
            Help & answers
          </p>

          {title && (
            <h2 className="pdf-section-title">
              {
                title
              }
            </h2>
          )}
        </div>

        {items.length >
          0 && (
          <div className="pdf-faq-list">
            {items.map(
              (
                value,
                index,
              ) => {
                const item =
                  splitFaq(
                    value,
                  );

                return (
                  <details
                    key={`${value}-${index}`}
                    className="pdf-faq-item"
                  >
                    <summary>
                      {
                        item.question
                      }
                    </summary>

                    {item.answer && (
                      <p className="pdf-faq-answer">
                        {
                          item.answer
                        }
                      </p>
                    )}
                  </details>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}
