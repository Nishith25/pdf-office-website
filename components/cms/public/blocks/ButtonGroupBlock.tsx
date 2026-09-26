import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type ButtonGroupData =
  CmsStructuredBlockDataByType["buttonGroup"];

export default function ButtonGroupBlock({
  data,
}: {
  data:
    ButtonGroupData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-section",
          "pdf-button-group",
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

        <div className="pdf-button-list">
          {data.buttons.map(
            (
              button,
            ) => {
              const external =
                button.target ===
                "new-tab";

              return (
                <a
                  key={
                    button.id
                  }
                  href={
                    button.url
                  }
                  target={
                    external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`pdf-action-button pdf-button-${button.style}`}
                >
                  {
                    button.label
                  }
                </a>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
