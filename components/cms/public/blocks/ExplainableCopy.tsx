import {
  getSiteConfig,
} from "../../../../lib/site/config";

type ExplainableCopyProps = {
  title:
    string;

  description:
    string;

  titleClassName:
    string;

  descriptionClassName:
    string;

  heading?:
    boolean;
};

export default function ExplainableCopy({
  title,
  description,
  titleClassName,
  descriptionClassName,
  heading = true,
}: ExplainableCopyProps) {
  const site =
    getSiteConfig();

  const interactive =
    site.key ===
      "gps-maps" &&
    description.trim()
      .length >
      0;

  if (!interactive) {
    return (
      <>
        {heading ? (
          <h3
            className={
              titleClassName
            }
          >
            {
              title
            }
          </h3>
        ) : (
          <div
            className={
              titleClassName
            }
          >
            {
              title
            }
          </div>
        )}

        {description && (
          <p
            className={
              descriptionClassName
            }
          >
            {
              description
            }
          </p>
        )}
      </>
    );
  }

  return (
    <details className="gps-explainable">
      <summary className="gps-explainable-summary">
        {heading ? (
          <h3
            className={`${titleClassName} gps-explainable-title`}
          >
            <span>
              {
                title
              }
            </span>

            <span
              aria-hidden="true"
              className="gps-explainable-info"
            >
              i
            </span>
          </h3>
        ) : (
          <span
            className={`${titleClassName} gps-explainable-title`}
          >
            <span>
              {
                title
              }
            </span>

            <span
              aria-hidden="true"
              className="gps-explainable-info"
            >
              i
            </span>
          </span>
        )}
      </summary>

      <div className="gps-explainable-panel">
        <p
          className={
            descriptionClassName
          }
        >
          {
            description
          }
        </p>
      </div>
    </details>
  );
}
