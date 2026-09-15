"use client";

import {
  Trash2,
} from "lucide-react";

import {
  deleteCmsPageAction,
} from "../../../app/admin/(protected)/pages/actions";

type DeletePageButtonProps = {
  pageId:
    string;

  pageTitle:
    string;
};

export default function DeletePageButton({
  pageId,
  pageTitle,
}: DeletePageButtonProps) {
  return (
    <form
      action={
        deleteCmsPageAction
      }
      onSubmit={(
        event,
      ) => {
        const confirmed =
          window.confirm(
            `Delete "${pageTitle}" and all of its blocks? This cannot be undone.`,
          );

        if (
          !confirmed
        ) {
          event.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name="pageId"
        value={
          pageId
        }
      />

      <button
        type="submit"
        className="inline-flex min-h-9 items-center gap-2 rounded-[9px] border border-[#F0D4D4] bg-white px-3 text-[10px] font-semibold text-[#B14C4C] transition hover:bg-[#FFF8F8]"
      >
        <Trash2 className="h-3.5 w-3.5" />

        Delete
      </button>
    </form>
  );
}