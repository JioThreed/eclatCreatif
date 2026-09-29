"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  search: string;
};

export default function AdminLoginHistoryFilters({
  search,
}: Props) {
  const router =
    useRouter();

  const [query, setQuery] =
    useState(search);

  function submit() {
    const params =
      new URLSearchParams();

    if (query) {
      params.set(
        "search",
        query
      );
    }

    router.push(
      `/admin/login-history?${params}`
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