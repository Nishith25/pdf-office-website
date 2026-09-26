import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type GalleryData =
  CmsStructuredBlockDataByType["gallery"];

export default function GalleryBlock({
  data,
}: {
  data:
    GalleryData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-section",
          "pdf-gallery",
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

        {data.images.length >
          0 && (
          <div
            className={`pdf-gallery-grid pdf-columns-${data.columns}`}
          >
            {data.images.map(
              (
                item,
              ) => (
                <figure
                  key={
                    item.id
                  }
                  className="pdf-gallery-item"
                >
                  {item.image && (
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.altText
                      }
                    />
                  )}

                  {item.caption && (
                    <figcaption>
                      {
                        item.caption
                      }
                    </figcaption>
                  )}
                </figure>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
