import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function ImageTextBlock({
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

  const imagePosition =
    blockText(
      data,
      "imagePosition",
    );

  const copy = (
    <div>
      {eyebrow && (
        <p className="pdf-eyebrow">
          {
            eyebrow
          }
        </p>
      )}

      {title && (
        <h2 className="pdf-section-title">
          {
            title
          }
        </h2>
      )}

      {description && (
        <p className="pdf-section-description whitespace-pre-line">
          {
            description
          }
        </p>
      )}
    </div>
  );

  const media = (
    <div className="pdf-image-text-media">
      {image ? (
        <img
          src={
            image
          }
          alt=""
        />
      ) : (
        <div className="pdf-image-text-placeholder">
          <span>
            PDF OFFICE
          </span>

          <strong>
            One workspace.
            Every document.
          </strong>
        </div>
      )}
    </div>
  );

  return (
    <section className="pdf-image-text pdf-section">
      <div className="pdf-container pdf-image-text-inner">
        {imagePosition ===
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
