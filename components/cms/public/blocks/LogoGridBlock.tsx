import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type LogoGridData =
  CmsStructuredBlockDataByType["logoGrid"];

export default function LogoGridBlock({
  data,
}: {
  data:
    LogoGridData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-section",
          "pdf-logo-grid",
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

        {data.logos.length >
          0 && (
          <div className="pdf-logo-list">
            {data.logos.map(
              (
                logo,
              ) => {
                const content = (
                  <div className="pdf-logo-item">
                    {logo.image ? (
                      <img
                        src={
                          logo.image
                        }
                        alt={
                          logo.name
                        }
                      />
                    ) : (
                      <span>
                        {
                          logo.name
                        }
                      </span>
                    )}
                  </div>
                );

                return logo.url ? (
                  <a
                    key={
                      logo.id
                    }
                    href={
                      logo.url
                    }
                    className="pdf-logo-link"
                  >
                    {
                      content
                    }
                  </a>
                ) : (
                  <div
                    key={
                      logo.id
                    }
                  >
                    {
                      content
                    }
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}
