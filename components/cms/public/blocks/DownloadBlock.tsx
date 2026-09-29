import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

import {
  getPublicThemeCopy,
} from "../../../../lib/site/public-theme-copy";

type DownloadData =
  CmsStructuredBlockDataByType["download"];

export default function DownloadBlock({
  data,
}: {
  data:
    DownloadData;
}) {
  const presentation =
    data.presentation;

  const copy =
    getPublicThemeCopy();

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-download",
        )
      }
    >
      <div className="pdf-download-inner">
        <div className="pdf-download-copy">
          {data.eyebrow && (
            <p className="pdf-eyebrow">
              {
                data.eyebrow
              }
            </p>
          )}

          {data.title && (
            <h2 className="pdf-download-title mt-4">
              {
                data.title
              }
            </h2>
          )}

          {data.description && (
            <p className="pdf-download-description whitespace-pre-line">
              {
                data.description
              }
            </p>
          )}

          <div className="pdf-store-actions">
            {data.googlePlayUrl && (
              <a
                href={
                  data.googlePlayUrl
                }
                className="pdf-primary-button"
              >
                Get it on Google Play
              </a>
            )}

            {data.appStoreUrl && (
              <a
                href={
                  data.appStoreUrl
                }
                className="pdf-secondary-button"
              >
                Download on the App Store
              </a>
            )}
          </div>

          {data.qrImage && (
            <div className="pdf-download-qr">
              <img
                src={
                  data.qrImage
                }
                alt="Download app QR code"
              />

              <span>
                Scan to download
              </span>
            </div>
          )}
        </div>

        <div className="pdf-download-device">
          {data.image ? (
            <img
              src={
                data.image
              }
              alt=""
            />
          ) : (
            <div className="pdf-device-frame">
              <div className="pdf-device-screen">
                <div className="pdf-device-app">
                  {
                    copy.downloadAppLabel
                  }
                </div>

                <h3>
                  {
                    copy.downloadTitle
                  }
                </h3>

                <p>
                  {
                    copy.downloadDescription
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
