import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function HeroBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
  const eyebrow =
    blockText(
      data,
      "eyebrow",
    );

  const title =
    blockText(
      data,
      "title",
    );

  const description =
    blockText(
      data,
      "description",
    );

  const image =
    blockText(
      data,
      "image",
    );

  const buttonLabel =
    blockText(
      data,
      "buttonLabel",
    );

  const buttonUrl =
    blockText(
      data,
      "buttonUrl",
    );

  return (
    <section className="pdf-hero">
      <div className="pdf-hero-inner">
        <div className="pdf-hero-copy">
          {eyebrow && (
            <p className="pdf-eyebrow">
              {
                eyebrow
              }
            </p>
          )}

          {title && (
            <h1 className="pdf-hero-title">
              {
                title
              }
            </h1>
          )}

          {description && (
            <p className="pdf-hero-description whitespace-pre-line">
              {
                description
              }
            </p>
          )}

          {(buttonLabel &&
            buttonUrl) && (
            <div className="pdf-hero-actions">
              <a
                href={
                  buttonUrl
                }
                className="pdf-primary-button"
              >
                {
                  buttonLabel
                }
              </a>
            </div>
          )}

          <div className="pdf-hero-proof">
            Mobile document workspace
          </div>
        </div>

        <div className="pdf-product-stage">
          {image ? (
            <img
              src={
                image
              }
              alt=""
              className="pdf-product-stage-image"
            />
          ) : (
            <div className="pdf-product-stage-fallback">
              <div className="pdf-product-stage-top">
                <span className="pdf-product-stage-label">
                  PDF OFFICE
                </span>

                <span className="pdf-product-stage-dot" />
              </div>

              <div className="pdf-document-preview">
                <span className="pdf-document-preview-badge">
                  PDF
                </span>

                <div className="pdf-document-preview-title" />

                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line short" />
                <div className="pdf-document-preview-line" />
                <div className="pdf-document-preview-line short" />
              </div>

              <div className="pdf-product-tools">
                <div className="pdf-product-tool">
                  SCAN
                </div>

                <div className="pdf-product-tool">
                  OCR
                </div>

                <div className="pdf-product-tool">
                  EDIT
                </div>

                <div className="pdf-product-tool">
                  SIGN
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
