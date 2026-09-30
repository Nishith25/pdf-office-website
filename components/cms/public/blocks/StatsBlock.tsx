import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

import ExplainableCopy from "./ExplainableCopy";

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
      id="overview"
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
                    <ExplainableCopy
                      title={
                        item.label
                      }
                      description={
                        item.description
                      }
                      titleClassName="pdf-stat-label"
                      descriptionClassName="pdf-stat-description"
                      heading={
                        false
                      }
                    />
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
