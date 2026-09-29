"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import ActionDialog from "@/components/ui/ActionDialog";
import SettingsCard from "@/components/settings/SettingsCard";

type Props = {
  roleId: string;
};

export default function AdminRoleActions({
  roleId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function deleteRole() {
    setLoading(true);

    const response =
      await fetch(
        `/api/admin/roles/${roleId}/delete`,
        {
          method: "POST",
        }
      );

    setLoading(false);

    if (response.ok) {
      router.push(
        "/admin/roles"
      );
      router.refresh();
    }
  }

  return (
    <>
      <SettingsCard
        title="Administration"
        description="Actions avancées."
      >
        <Button
          variant="destructive"
          onClick={() =>
            setOpen(true)
          }
        >
          Supprimer le rôle
        </Button>
      </SettingsCard>

      <ActionDialog
        open={open}
        title="Supprimer le rôle"
        description="Cette action est irréversible."
        confirmLabel="Supprimer"
        loading={loading}
        onClose={() =>
          setOpen(false)
        }
        onConfirm={() =>
          deleteRole()
        }
      />
    </>
  );
}