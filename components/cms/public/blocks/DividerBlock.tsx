import {
  blockText,
  type CmsPublicBlockData,
} from "./block-data";

export default function DividerBlock({
  data,
}: {
  data:
    CmsPublicBlockData;
}) {
  const style =
    blockText(
      data,
      "style",
    );

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6">
      <hr
        className={
          style ===
          "subtle"
            ? "border-black/5"
            : "border-black/10"
        }
      />
    </div>
  );
}