import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

import ExplainableCopy from "./ExplainableCopy";

type CardGridData =
  CmsStructuredBlockDataByType["cardGrid"];

export default function CardGridBlock({
  data,
}: {
  data:
    CardGridData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      id="tools"
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-card-grid",
          "pdf-section",
        )
      }
    >
      <div className="pdf-container">
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

        {data.cards.length >
          0 && (
          <div
            className={`pdf-card-grid-list pdf-columns-${data.columns}`}
          >
            {data.cards.map(
              (
                card,
                index,
              ) => (
                <article
                  key={
                    card.id
                  }
                  className={`pdf-editorial-card ${
                    card.description
                      ? ""
                      : "pdf-editorial-card-compact"
                  }`}
                >
                  {card.image && (
                    <div className="pdf-card-media">
                      <img
                        src={
                          card.image
                        }
                        alt=""
                      />
                    </div>
                  )}

                  <div className="pdf-card-index">
                    {String(
                      index +
                        1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </div>

                  {card.badge && (
                    <span className="pdf-item-badge">
                      {
                        card.badge
                      }
                    </span>
                  )}

                  {card.icon && (
                    <div className="pdf-item-icon">
                      {
                        card.icon
                      }
                    </div>
                  )}

                  <ExplainableCopy
                    title={
                      card.title
                    }
                    description={
                      card.description
                    }
                    titleClassName="pdf-card-title"
                    descriptionClassName="pdf-card-description"
                  />

                  {card.linkLabel &&
                    card.linkUrl && (
                    <a
                      href={
                        card.linkUrl
                      }
                      className="pdf-item-link"
                    >
                      {
                        card.linkLabel
                      }
                    </a>
                  )}
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
