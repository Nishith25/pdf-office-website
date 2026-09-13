"use client";

type AdminToggleProps = {
  label: string;
  description?: string;

  checked: boolean;

  onChange: (
    checked: boolean,
  ) => void;

  disabled?: boolean;
};

export default function AdminToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: AdminToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-[12px] border border-[#E3E5E9] bg-white px-4 py-3.5">
      <div>
        <p className="text-[11px] font-semibold text-[#343A46]">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-[9px] leading-4 text-[#8D939F]">
            {
              description
            }
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={
          checked
        }
        disabled={
          disabled
        }
        onClick={() =>
          onChange(
            !checked,
          )
        }
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-[#3157E7]"
            : "bg-[#CCD0D8]"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}