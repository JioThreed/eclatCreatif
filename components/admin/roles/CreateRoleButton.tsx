"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

export default function CreateRoleButton() {
  const [loading, setLoading] =
    useState(false);

  async function createRole() {
    const name =
      prompt("Nom du rôle");

    if (!name) {
      return;
    }

    const priority =
      prompt("Priorité");

    if (!priority) {
      return;
    }

    setLoading(true);

    await fetch(
      "/api/admin/roles/create",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          priority:
            Number(priority),
        }),
      }
    );

    setLoading(false);

    window.location.reload();
  }

  return (
    <Button
      onClick={createRole}
      disabled={loading}
    >
      + Nouveau rôle
    </Button>
  );
}