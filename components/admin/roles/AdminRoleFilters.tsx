"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  search: string;
  sort: string;
};

export default function AdminRoleFilters({
  search,
  sort,
}: Props) {
  const router =
    useRouter();

  const [value, setValue] =
    useState(search);

  const [sorting, setSorting] =
    useState(sort);

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

    params.set(
      "sort",
      sorting
    );

    router.push(
      `/admin/roles?${params}`
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mb-8 flex gap-4"
    >
      <input
        value={value}
        onChange={(e) =>
          setValue(
            e.target.value
          )
        }
        placeholder="Rechercher un rôle..."
        className="
          flex-1
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      />

      <select
        value={sorting}
        onChange={(e) =>
          setSorting(
            e.target.value
          )
        }
        className="
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      >
        <option value="priority">
          Priorité
        </option>

        <option value="users">
          Utilisateurs
        </option>

        <option value="name">
          Nom
        </option>
      </select>

      <button
        className="
          rounded-xl
          bg-primary
          px-4
          py-2
          text-primary-foreground
        "
      >
        Filtrer
      </button>
    </form>
  );
}