import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type CtaData =
  CmsStructuredBlockDataByType["cta"];

export default function CtaBlock({
  data,
}: {
  data:
    CtaData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      id="start"
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-cta",
          "pdf-section",
        )
      }
    >
      <div className="pdf-container pdf-cta-inner">
        <div className="pdf-cta-copy">
          {data.eyebrow && (
            <p className="pdf-eyebrow">
              {
                data.eyebrow
              }
            </p>
          )}

          {data.title && (
            <h2 className="pdf-cta-title">
              {
                data.title
              }
            </h2>
          )}

          {data.description && (
            <p className="pdf-cta-description">
              {
                data.description
              }
            </p>
          )}

          <div className="pdf-cta-actions">
            {data.primaryCta.label &&
              data.primaryCta.url && (
              <a
                href={
                  data.primaryCta.url
                }
                className="pdf-primary-button"
              >
                {
                  data.primaryCta.label
                }
              </a>
            )}

            {data.secondaryCta.label &&
              data.secondaryCta.url && (
              <a
                href={
                  data.secondaryCta.url
                }
                className="pdf-secondary-button"
              >
                {
                  data.secondaryCta.label
                }
              </a>
            )}
          </div>
        </div>

        {data.image && (
          <div className="pdf-cta-media">
            <img
              src={
                data.image
              }
              alt=""
            />
          </div>
        )}
      </div>
    </section>
  );
}
