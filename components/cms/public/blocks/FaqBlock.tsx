import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type FaqData =
  CmsStructuredBlockDataByType["faq"];

export default function FaqBlock({
  data,
}: {
  data:
    FaqData;
}) {
  const presentation =
    data.presentation;

  const alwaysOpen =
    presentation.variant ===
    "stacked";

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-faq",
          "pdf-section",
        )
      }
    >
      <div className="pdf-container pdf-faq-layout">
        <div>
          <p className="pdf-eyebrow">
            Help & answers
          </p>

          {data.title && (
            <h2 className="pdf-section-title">
              {
                data.title
              }
            </h2>
          )}

          {data.description && (
            <p className="pdf-section-description">
              {
                data.description
              }
            </p>
          )}
        </div>

        {data.items.length >
          0 && (
          <div className="pdf-faq-list">
            {data.items.map(
              (
                item,
              ) =>
                alwaysOpen ? (
                  <article
                    key={
                      item.id
                    }
                    className="pdf-faq-static"
                  >
                    <h3>
                      {
                        item.question
                      }
                    </h3>

                    <p className="pdf-faq-answer">
                      {
                        item.answer
                      }
                    </p>
                  </article>
                ) : (
                  <details
                    key={
                      item.id
                    }
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
                ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
