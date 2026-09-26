import type {
  CmsStructuredBlockDataByType,
} from "../../../../lib/cms/core/block-data-schemas";

type DividerData =
  CmsStructuredBlockDataByType["divider"];

export default function DividerBlock({
  data,
}: {
  data:
    DividerData;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6">
      <hr
        className={
          data.style ===
          "subtle"
            ? "border-black/5"
            : "border-black/10"
        }
      />
    </div>
  );
}
