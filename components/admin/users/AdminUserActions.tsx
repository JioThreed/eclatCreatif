"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
  isActive: boolean;
};

export default function AdminUserActions({
  id,
  isActive,
}: Props) {
  const router = useRouter();

  async function toggleStatus() {
    await fetch(
      `/api/admin/users/${id}/status`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          router.push(
            `/admin/users/${id}`
          )
        }
        className="
          rounded-xl
          border
          border-border
          px-3
          py-1
          text-sm
        "
      >
        Voir
      </button>

      <button
        onClick={toggleStatus}
        className="
          rounded-xl
          bg-primary
          px-3
          py-1
          text-sm
          text-primary-foreground
        "
      >
        {isActive
          ? "Désactiver"
          : "Activer"}
      </button>
    </div>
  );
}