import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

import {
  getPublicThemeCopy,
} from "../../../../lib/site/public-theme-copy";

import {
  getSiteConfig,
} from "../../../../lib/site/config";

type HeroData =
  CmsStructuredBlockDataByType["hero"];

export default function HeroBlock({
  data,
}: {
  data:
    HeroData;
}) {
  const presentation =
    data.presentation;

  const copy =
    getPublicThemeCopy();

  const site =
    getSiteConfig();

  const minimalGps =
    site.key ===
      "gps-maps";

  if (minimalGps) {
    return (
      <section
        className={
          cmsPresentationClassName(
            presentation,
            "pdf-hero",
          )
        }
      >
        <div className="pdf-hero-inner gps-minimal-hero">
          <div className="pdf-hero-copy">
            {data.title && (
              <h1 className="pdf-hero-title">
                {
                  data.title
                }
              </h1>
            )}

            {data.description && (
              <p className="pdf-hero-description">
                {
                  data.description
                }
              </p>
            )}

            <div className="pdf-hero-actions">
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
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-hero",
        )
      }
      data-presentation-background={
        presentation.background
      }
      data-presentation-width={
        presentation.width
      }
      data-presentation-spacing={
        presentation.spacing
      }
      data-presentation-alignment={
        presentation.alignment
      }
      data-presentation-variant={
        presentation.variant
      }
    >
      <div className="pdf-hero-inner">
        <div className="pdf-hero-copy">
          {data.badge && (
            <div className="pdf-hero-badge">
              {
                data.badge
              }
            </div>
          )}

          {data.eyebrow && (
            <p className="pdf-eyebrow">
              {
                data.eyebrow
              }
            </p>
          )}

          {data.title && (
            <h1 className="pdf-hero-title">
              {
                data.title
              }
            </h1>
          )}

          {data.description && (
            <p className="pdf-hero-description whitespace-pre-line">
              {
                data.description
              }
            </p>
          )}

          {(data.primaryCta.label &&
            data.primaryCta.url) ||
          (data.secondaryCta.label &&
            data.secondaryCta.url) ? (
            <div className="pdf-hero-actions">
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
          ) : null}

          <div className="pdf-hero-proof">
            {
              copy.heroProof
            }
          </div>
        </div>

        <div className="pdf-product-stage">
          {data.image ? (
            <img
              src={
                data.image
              }
              alt=""
              className="pdf-product-stage-image"
            />
          ) : (
            <div className="pdf-product-stage-fallback">
              <div className="pdf-product-stage-top">
                <span className="pdf-product-stage-label">
                  {
                    copy.heroStageLabel
                  }
                </span>

                <span className="pdf-product-stage-dot" />
              </div>

              <div className="pdf-document-preview">
                <span className="pdf-document-preview-badge">
                  {
                    copy.heroStageBadge
                  }
                </span>

                <div className="pdf-document-preview-title" />

                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line short" />
                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line short" />
              </div>

              <div className="pdf-product-tools">
                {copy.heroTools.map(
                  (
                    tool,
                  ) => (
                    <div
                      key={
                        tool
                      }
                      className="pdf-product-tool"
                    >
                      {
                        tool
                      }
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
