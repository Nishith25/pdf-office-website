import {
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

type AdminNoticeProps = {
  tone:
    | "success"
    | "error";

  message: string;
};

export default function AdminNotice({
  tone,
  message,
}: AdminNoticeProps) {
  const success =
    tone ===
    "success";

  const Icon =
    success
      ? CheckCircle2
      : CircleAlert;

  return (
    <div
      role={
        success
          ? "status"
          : "alert"
      }
      className={`flex items-start gap-2.5 rounded-[11px] border px-3.5 py-3 ${
        success
          ? "border-[#CEE6D5] bg-[#F1FAF4] text-[#327149]"
          : "border-[#F0D5D5] bg-[#FFF5F5] text-[#A94444]"
      }`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />

      <p className="text-[11px] leading-5">
        {message}
      </p>
    </div>
  );
}