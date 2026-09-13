import type {
  InputHTMLAttributes,
} from "react";

type AdminFieldProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hint?: string;
    error?: string;
  };

export default function AdminField({
  label,
  hint,
  error,
  id,
  name,
  className = "",
  ...props
}: AdminFieldProps) {
  const fieldId =
    id ||
    name;

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label
          htmlFor={
            fieldId
          }
          className="text-[11px] font-semibold text-[#343A46]"
        >
          {label}
        </label>

        {hint && (
          <span className="text-[9px] text-[#9BA1AC]">
            {hint}
          </span>
        )}
      </div>

      <input
        {...props}
        id={
          fieldId
        }
        name={
          name
        }
        className={`mt-2 min-h-11 w-full rounded-[10px] border bg-white px-3.5 text-sm text-[#1C2029] outline-none transition placeholder:text-[#A8ADB6] ${
          error
            ? "border-[#E2A6A6] focus:border-[#CA6666] focus:ring-4 focus:ring-[#D95C5C]/[0.07]"
            : "border-[#DDE0E6] focus:border-[#617CE4] focus:ring-4 focus:ring-[#3157E7]/[0.07]"
        } ${className}`}
      />

      {error && (
        <p className="mt-1.5 text-[10px] leading-4 text-[#B84040]">
          {error}
        </p>
      )}
    </div>
  );
}