"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  search: string;
};

export default function AdminDeletedUsersFilters({
  search,
}: Props) {
  const router =
    useRouter();

  const [value, setValue] =
    useState(search);

  function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const params =
      new URLSearchParams();

    if (value) {
      params.set(
        "search",
        value
      );
    }

    router.push(
      `/admin/users/deleted?${params}`
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mb-6"
    >
      <input
        value={value}
        onChange={(e) =>
          setValue(
            e.target.value
          )
        }
        placeholder="Rechercher..."
        className="
          w-full
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      />
    </form>
  );
}