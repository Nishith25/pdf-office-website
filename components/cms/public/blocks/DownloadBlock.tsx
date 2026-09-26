import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function DownloadBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
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

  const image =
    blockText(
      data,
      "image",
    );

  return (
    <section className="pdf-download">
      <div className="pdf-download-inner">
        <div className="pdf-download-copy">
          <p className="pdf-eyebrow">
            PDF Office mobile
          </p>

          {title && (
            <h2 className="pdf-download-title mt-4">
              {
                title
              }
            </h2>
          )}

          {description && (
            <p className="pdf-download-description whitespace-pre-line">
              {
                description
              }
            </p>
          )}

          {buttonLabel &&
            buttonUrl && (
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
          )}
        </div>

        <div className="pdf-download-device">
          {image ? (
            <img
              src={
                image
              }
              alt=""
            />
          ) : (
            <div className="pdf-device-frame">
              <div className="pdf-device-screen">
                <div className="pdf-device-app">
                  PDF OFFICE
                </div>

                <h3>
                  Your documents.
                  Ready anywhere.
                </h3>

                <p>
                  Scan, work with PDFs
                  and keep essential
                  document tools close.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
