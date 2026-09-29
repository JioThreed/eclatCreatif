"use client";

import { useState } from "react";

import type {RolePermissions} from "@/types/permissions";

import Button from "@/components/ui/Button";
import SettingsCard from "@/components/settings/SettingsCard";

type Props = {
  roleId: string;
  permissions: RolePermissions;
};

export default function AdminRolePermissions({
  roleId,
  permissions,
}: Props) {

  const AVAILABLE_PERMISSIONS: {
    key: keyof RolePermissions;
    label: string;
  }[] = [
    {
        key: "manageUsers",
        label: "Gérer les utilisateurs",
    },

    {
        key: "manageRoles",
        label: "Gérer les rôles",
    },

    {
        key: "manageSettings",
        label: "Gérer les paramètres",
    },

    {
        key: "moderateUsers",
        label: "Modérer les utilisateurs",
    },
  ];

  const [values, setValues] = useState<RolePermissions>(permissions);

  async function save() {
    await fetch(
        `/api/admin/roles/${roleId}/permissions`,
        {
        method: "POST",

        headers: {
            "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
            permissions: values,
        }),
        }
    );

    window.location.reload();
  }

  return (
    <SettingsCard
      title="Permissions"
      description="Permissions accordées au rôle."
    >
        {AVAILABLE_PERMISSIONS.map(
            ({ key, label }) => (
                <label
                key={key}
                className="
                    flex
                    items-center
                    gap-3
                "
                >
                <input
                    type="checkbox"
                    checked={
                    values[key] ??
                    false
                    }
                    onChange={(e) =>
                    setValues({
                        ...values,
                        [key]:
                        e.target.checked,
                    })
                    }
                />

                {label}
                </label>
            )
        )}

        <Button
        onClick={save}
        >
            Sauvegarder
        </Button>
    </SettingsCard>
  );
}