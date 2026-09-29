import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

import {
  getPublicThemeCopy,
} from "../../../../lib/site/public-theme-copy";

type ImageTextData =
  CmsStructuredBlockDataByType["imageText"];

export default function ImageTextBlock({
  data,
}: {
  data:
    ImageTextData;
}) {
  const presentation =
    data.presentation;

  const themeCopy =
    getPublicThemeCopy();

  const copy = (
    <div>
      {data.eyebrow && (
        <p className="pdf-eyebrow">
          {
            data.eyebrow
          }
        </p>
      )}

      {data.title && (
        <h2 className="pdf-section-title">
          {
            data.title
          }
        </h2>
      )}

      {data.description && (
        <p className="pdf-section-description whitespace-pre-line">
          {
            data.description
          }
        </p>
      )}

      {data.cta.label &&
        data.cta.url && (
        <a
          href={
            data.cta.url
          }
          className="pdf-primary-button mt-7"
        >
          {
            data.cta.label
          }
        </a>
      )}
    </div>
  );

  const media = (
    <div className="pdf-image-text-media">
      {data.image ? (
        <img
          src={
            data.image
          }
          alt=""
        />
      ) : (
        <div className="pdf-image-text-placeholder">
          <span>
            {
              themeCopy.imagePlaceholderEyebrow
            }
          </span>

          <strong>
            {
              themeCopy.imagePlaceholderTitle
            }
          </strong>
        </div>
      )}
    </div>
  );

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-image-text",
          "pdf-section",
        )
      }
    >
      <div className="pdf-container pdf-image-text-inner">
        {data.imagePosition ===
        "left" ? (
          <>
            {
              media
            }

            {
              copy
            }
          </>
        ) : (
          <>
            {
              copy
            }

            {
              media
            }
          </>
        )}
      </div>
    </section>
  );
}
