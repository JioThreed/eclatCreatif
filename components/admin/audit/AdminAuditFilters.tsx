"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  search: string;
  action: string;
};

export default function AdminAuditFilters({
  search,
  action,
}: Props) {
  const router =
    useRouter();

  const [query, setQuery] =
    useState(search);

  const [selectedAction,
    setSelectedAction] =
    useState(action);

  function submit() {
    const params =
      new URLSearchParams();

    if (query) {
      params.set(
        "search",
        query
      );
    }

    if (
      selectedAction &&
      selectedAction !== "all"
    ) {
      params.set(
        "action",
        selectedAction
      );
    }

    router.push(
      `/admin/audit?${params}`
    );
  }

  return (
    <div
      className="
        mb-6
        flex
        gap-3
      "
    >
      <input
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        placeholder="Recherche"
        className="
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      />

      <select
        value={selectedAction}
        onChange={(e) =>
          setSelectedAction(
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
        <option value="all">
          Toutes
        </option>

        <option value="LOGIN_SUCCESS">
          LOGIN_SUCCESS
        </option>

        <option value="USER_DISABLED">
          USER_DISABLED
        </option>

        <option value="USER_SOFT_DELETED">
          USER_SOFT_DELETED
        </option>

        <option value="ROLE_UPDATED">
          ROLE_UPDATED
        </option>
      </select>

      <button
        onClick={submit}
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
    </div>
  );
}