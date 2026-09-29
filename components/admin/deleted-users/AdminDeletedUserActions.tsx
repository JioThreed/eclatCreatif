"use client";

import Button from "@/components/ui/Button";

export default function AdminDeletedUserActions({
  userId,
}: {
  userId: string;
}) {
  async function restore() {
    const response =
      await fetch(
        `/api/admin/users/${userId}/restore`,
        {
          method: "POST",
        }
      );

    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <Button
      variant="success"
      onClick={restore}
    >
      Restaurer
    </Button>
  );
}