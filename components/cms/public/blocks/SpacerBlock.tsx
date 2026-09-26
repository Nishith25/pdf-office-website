import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

type SpacerData =
  CmsStructuredBlockDataByType["spacer"];

export default function SpacerBlock({
  data,
}: {
  data:
    SpacerData;
}) {
  const className =
    data.size ===
    "small"
      ? "h-8"
      : data.size ===
          "large"
        ? "h-32"
        : "h-16";

  return (
    <div
      aria-hidden="true"
      className={
        className
      }
    />
  );
}
