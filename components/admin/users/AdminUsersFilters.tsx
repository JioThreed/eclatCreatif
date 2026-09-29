"use client";

import { useRouter } from "next/navigation";

type Props = {
  search: string;
  status: string;
};

export default function AdminUsersFilters({
  search,
  status,
}: Props) {
  const router = useRouter();

  function update(
    nextSearch: string,
    nextStatus: string
  ) {
    const params =
      new URLSearchParams();

    if (nextSearch) {
      params.set(
        "search",
        nextSearch
      );
    }

    if (
      nextStatus &&
      nextStatus !== "all"
    ) {
      params.set(
        "status",
        nextStatus
      );
    }

    router.push(
      `/admin/users?${params.toString()}`
    );
  }

  return (
    <div className="mb-8 space-y-4">
      <input
        value={search}
        onChange={(e) =>
          update(
            e.target.value,
            status
          )
        }
        placeholder="Rechercher un utilisateur..."
        className="
          w-full
          rounded-2xl
          border
          border-border
          bg-card
          px-4
          py-3
        "
      />

      <div className="flex gap-2 flex-wrap">
        {[
          ["all", "Tous"],
          ["active", "Actifs"],
          [
            "suspended",
            "Suspendus",
          ],
          [
            "disabled",
            "Désactivés",
          ],
        ].map(
          ([value, label]) => (
            <button
              key={value}
              onClick={() =>
                update(
                  search,
                  value
                )
              }
              className={`
                rounded-full
                px-4
                py-2
                text-sm
                ${
                  status === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }
              `}
            >
              {label}
            </button>
          )
        )}
      </div>
    </div>
  );
}