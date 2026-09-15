"use client";

import {
  Trash2,
} from "lucide-react";

import {
  deleteCmsMenuAction,
} from "../../../app/admin/(protected)/menus/actions";

type Props = {
  menuId:
    string;

  menuName:
    string;
};

export default function DeleteMenuButton({
  menuId,
  menuName,
}: Props) {
  return (
    <form
      action={
        deleteCmsMenuAction
      }
      onSubmit={(
        event,
      ) => {
        const confirmed =
          window.confirm(
            `Delete "${menuName}"? This menu and all of its menu items will be removed.`,
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
        name="menuId"
        value={
          menuId
        }
      />

      <button
        type="submit"
        className="inline-flex min-h-9 items-center gap-2 rounded-[9px] border border-[#F0D4D4] bg-white px-3 text-[10px] font-semibold text-[#B14C4C] transition hover:bg-[#FFF7F7]"
      >
        <Trash2 className="h-3.5 w-3.5" />

        Delete Menu
      </button>
    </form>
  );
}