"use client";

import {
  useActionState,
} from "react";

import {
  useFormStatus,
} from "react-dom";

import {
  Eye,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  loginAction,
} from "./actions";

const initialState = {
  error: null,
};

function SubmitButton() {
  const {
    pending,
  } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex min-h-12 w-full items-center justify-center rounded-[12px] bg-[#3157E7] px-5 text-sm font-semibold text-white transition hover:bg-[#2849C7] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? "Signing in..."
        : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [
    state,
    formAction,
  ] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form
      action={
        formAction
      }
      className="mt-8"
    >
      <div>
        <label
          htmlFor="email"
          className="text-[12px] font-semibold text-[#353A46]"
        >
          Email
        </label>

        <div className="relative mt-2">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A909D]" />

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@example.com"
            className="min-h-12 w-full rounded-[12px] border border-[#DDE0E7] bg-white pl-10 pr-4 text-sm text-[#171A22] outline-none transition placeholder:text-[#ADB1BA] focus:border-[#6480E9] focus:ring-4 focus:ring-[#3157E7]/[0.08]"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-[12px] font-semibold text-[#353A46]"
          >
            Password
          </label>

          <LockKeyhole className="h-3.5 w-3.5 text-[#A1A6B0]" />
        </div>

        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="min-h-12 w-full rounded-[12px] border border-[#DDE0E7] bg-white px-4 pr-11 text-sm text-[#171A22] outline-none transition placeholder:text-[#ADB1BA] focus:border-[#6480E9] focus:ring-4 focus:ring-[#3157E7]/[0.08]"
          />

          <Eye className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A6B0]" />
        </div>
      </div>

      {state.error && (
        <div
          role="alert"
          className="mt-4 rounded-[10px] border border-[#F0D6D6] bg-[#FFF5F5] px-3.5 py-3 text-xs leading-5 text-[#B13C3C]"
        >
          {
            state.error
          }
        </div>
      )}

      <SubmitButton />
    </form>
  );
}