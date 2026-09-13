"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  KeyRound,
} from "lucide-react";

import {
  changeAdminPasswordAction,
} from "../../../app/admin/(protected)/settings/actions";

import {
  formatAdminActionResult,
} from "../../../lib/admin/action-result";

import AdminField from "../forms/AdminField";
import AdminNotice from "../forms/AdminNotice";

export default function PasswordEditor() {
  const formRef =
    useRef<
      HTMLFormElement
    >(null);

  const [
    result,
    formAction,
    pending,
  ] =
    useActionState(
      changeAdminPasswordAction,
      null,
    );

  const notice =
    formatAdminActionResult(
      result,
    );

  useEffect(
    () => {
      if (
        result?.success
      ) {
        formRef.current
          ?.reset();
      }
    },
    [
      result,
    ],
  );

  return (
    <form
      ref={
        formRef
      }
      action={
        formAction
      }
      className="rounded-[16px] border border-[#E2E4E8] bg-white"
    >
      <div className="flex items-start gap-3 border-b border-[#ECEEF1] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FFF5E8]">
          <KeyRound className="h-4 w-4 text-[#A86B21]" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#222631]">
            Administrator password
          </h2>

          <p className="mt-1 text-[10px] leading-5 text-[#8B919D]">
            Change the password used to access this admin panel.
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {notice && (
          <AdminNotice
            tone={
              notice.tone
            }
            message={
              notice.message
            }
          />
        )}

        <AdminField
          label="Current password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />

        <AdminField
          label="New password"
          hint="Minimum 12 characters"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
        />

        <AdminField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />

        <div className="flex justify-end border-t border-[#ECEEF1] pt-5">
          <button
            type="submit"
            disabled={
              pending
            }
            className="inline-flex min-h-10 items-center justify-center rounded-[9px] bg-[#20242C] px-4 text-[10px] font-semibold text-white transition hover:bg-[#303641] disabled:opacity-60"
          >
            {pending
              ? "Changing..."
              : "Change password"}
          </button>
        </div>
      </div>
    </form>
  );
}