import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

import {
  cmsPresentationClassName,
} from "./presentation";

type RichTextData =
  CmsStructuredBlockDataByType["richText"];

export default function RichTextBlock({
  data,
}: {
  data:
    RichTextData;
}) {
  const presentation =
    data.presentation;

  return (
    <section
      className={
        cmsPresentationClassName(
          presentation,
          "pdf-section",
          "pdf-rich-text",
        )
      }
    >
      <div className="pdf-container">
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

        {data.body && (
          <div className="pdf-rich-text-body whitespace-pre-line">
            {
              data.body
            }
          </div>
        )}
      </div>
    </section>
  );
}
