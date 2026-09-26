import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type StatsData =
  CmsStructuredBlockDataByType["stats"];

export default function StatsBlock({
  data,
}: {
  data:
    StatsData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-stats",
        )
      }
    >
      <div className="pdf-stats-inner">
        {data.title && (
          <p className="pdf-stats-title">
            {
              data.title
            }
          </p>
        )}

        {data.items.length >
          0 && (
          <div className="pdf-stats-grid">
            {data.items.map(
              (
                item,
              ) => (
                <div
                  key={
                    item.id
                  }
                  className="pdf-stat"
                >
                  <div className="pdf-stat-value">
                    {
                      item.value
                    }
                  </div>

                  {item.label && (
                    <div className="pdf-stat-label">
                      {
                        item.label
                      }
                    </div>
                  )}

                  {item.description && (
                    <p className="pdf-stat-description">
                      {
                        item.description
                      }
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
