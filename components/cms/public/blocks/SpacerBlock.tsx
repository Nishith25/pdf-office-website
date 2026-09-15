import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function SpacerBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
  const size =
    blockText(
      data,
      "size",
    );

  const className =
    size ===
    "small"
      ? "h-8"
      : size ===
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