import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type FeatureGridData =
  CmsStructuredBlockDataByType["featureGrid"];

export default function FeatureGridBlock({
  data,
}: {
  data:
    FeatureGridData;
}) {
  const presentation =
    data.presentation;

  const cardLayout =
    [
      "icon-grid",
      "bento",
      "alternating",
      "showcase",
    ].includes(
      presentation.variant,
    );

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-feature-grid",
          "pdf-section",
        )
      }
    >
      <div
        className={`pdf-container ${
          cardLayout
            ? ""
            : "pdf-feature-layout"
        }`}
      >
        <div>
          <p className="pdf-eyebrow">
            Built for document work
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
          <div
            className={
              cardLayout
                ? `pdf-feature-card-grid pdf-columns-${data.columns}`
                : "pdf-feature-list"
            }
          >
            {data.items.map(
              (
                item,
                index,
              ) =>
                cardLayout ? (
                  <article
                    key={
                      item.id
                    }
                    className="pdf-feature-card"
                  >
                    {item.image && (
                      <img
                        src={
                          item.image
                        }
                        alt=""
                        className="pdf-feature-card-image"
                      />
                    )}

                    <div className="pdf-feature-card-body">
                      {item.badge && (
                        <span className="pdf-item-badge">
                          {
                            item.badge
                          }
                        </span>
                      )}

                      {item.eyebrow && (
                        <p className="pdf-feature-item-eyebrow">
                          {
                            item.eyebrow
                          }
                        </p>
                      )}

                      {item.icon && (
                        <div className="pdf-item-icon">
                          {
                            item.icon
                          }
                        </div>
                      )}

                      <h3 className="pdf-feature-title">
                        {
                          item.title
                        }
                      </h3>

                      {item.description && (
                        <p className="pdf-feature-description">
                          {
                            item.description
                          }
                        </p>
                      )}

                      {item.linkLabel &&
                        item.linkUrl && (
                        <a
                          href={
                            item.linkUrl
                          }
                          className="pdf-item-link"
                        >
                          {
                            item.linkLabel
                          }
                        </a>
                      )}
                    </div>
                  </article>
                ) : (
                  <article
                    key={
                      item.id
                    }
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
                      {item.badge && (
                        <span className="pdf-item-badge">
                          {
                            item.badge
                          }
                        </span>
                      )}

                      {item.eyebrow && (
                        <p className="pdf-feature-item-eyebrow">
                          {
                            item.eyebrow
                          }
                        </p>
                      )}

                      {item.icon && (
                        <div className="pdf-item-icon">
                          {
                            item.icon
                          }
                        </div>
                      )}

                      <h3 className="pdf-feature-title">
                        {
                          item.title
                        }
                      </h3>

                      {item.description && (
                        <p className="pdf-feature-description">
                          {
                            item.description
                          }
                        </p>
                      )}

                      {item.linkLabel &&
                        item.linkUrl && (
                        <a
                          href={
                            item.linkUrl
                          }
                          className="pdf-item-link"
                        >
                          {
                            item.linkLabel
                          }
                        </a>
                      )}
                    </div>
                  </article>
                ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
