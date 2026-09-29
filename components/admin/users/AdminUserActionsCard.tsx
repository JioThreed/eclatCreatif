"use client";

import { useState } from "react";

import SettingsCard from "@/components/settings/SettingsCard";
import ActionDialog from "@/components/ui/ActionDialog";
import Button from "@/components/ui/Button";
import type { AdminUser, } from "@/types/admin";

type Props = {
    user: AdminUser;

    roles: {
        id: string;
        label: string;
        priority: number;
    }[];
};

export default function AdminUserActionsCard({
  user,
  roles,
}: Props) {
  const [selectedRole, setSelectedRole] =
    useState(
        user.roleRelation?.id ?? ""
    );

  const [loadingRole, setLoadingRole] =
    useState(false);

  const [loadingAction, setLoadingAction] =
    useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [dialogTitle, setDialogTitle] =
    useState("");

  const [dialogDescription, setDialogDescription] =
    useState("");

  const [
    dialogRequireReason,
    setDialogRequireReason,
    ] = useState(false);

  const [
    dialogConfirmLabel,
    setDialogConfirmLabel,
    ] = useState("Confirmer");

  const [
    dialogAction,
    setDialogAction,
    ] =
    useState<
        | "delete"
        | "suspend"
        | "unsuspend"
        | "unlock"
        | "toggleActive"
        | "revokeSessions"
        | null
    >(null);

  function openDialog(
    action:
        | "delete"
        | "suspend"
        | "unsuspend"
        | "unlock"
        | "toggleActive"
        | "revokeSessions"
    ) {
    setDialogAction(action);

    switch (action) {
        case "delete":
        setDialogTitle(
            "Supprimer le compte"
        );

        setDialogDescription(
            "Le compte sera placé dans la corbeille pendant 30 jours."
        );

        setDialogRequireReason(
            true
        );

        setDialogConfirmLabel(
            "Supprimer"
        );

        break;

        case "suspend":
        setDialogTitle(
            "Suspendre le compte"
        );

        setDialogDescription(
            "Le compte sera immédiatement suspendu."
        );

        setDialogRequireReason(
            true
        );

        setDialogConfirmLabel(
            "Suspendre"
        );

        break;

        case "unsuspend":
        setDialogTitle(
            "Lever la suspension"
        );

        setDialogDescription(
            "L'utilisateur retrouvera immédiatement l'accès."
        );

        setDialogRequireReason(
            false
        );

        setDialogConfirmLabel(
            "Confirmer"
        );

        break;

        case "unlock":
        setDialogTitle(
            "Déverrouiller le compte"
        );

        setDialogDescription(
            "Le compteur d'échecs de connexion sera remis à zéro."
        );

        setDialogRequireReason(
            false
        );

        setDialogConfirmLabel(
            "Déverrouiller"
        );

        break;

        case "toggleActive":
        setDialogTitle(
            user.isActive
            ? "Désactiver le compte"
            : "Réactiver le compte"
        );

        setDialogDescription(
            user.isActive
            ? "L'utilisateur ne pourra plus se connecter."
            : "L'utilisateur retrouvera l'accès à son compte."
        );

        setDialogRequireReason(
            false
        );

        setDialogConfirmLabel(
            user.isActive
            ? "Désactiver"
            : "Réactiver"
        );

        break;

        case "revokeSessions":
        setDialogTitle(
            "Déconnecter l'utilisateur"
        );

        setDialogDescription(
            "Toutes les sessions de cet utilisateur seront révoquées."
        );

        setDialogRequireReason(
            false
        );

        setDialogConfirmLabel(
            "Déconnecter"
        );

        break;
    }

    setDialogOpen(true);
  }

  async function handleDialogConfirm(
    reason?: string
  ) {
    switch (dialogAction) {
        case "delete":
        await deleteUser(
            reason
        );
        break;

        case "suspend":
        await suspendUser(
            reason
        );
        break;

        case "unsuspend":
        await unsuspendUser();
        break;

        case "unlock":
        await unlockUser();
        break;

        case "toggleActive":
        await toggleActive();
        break;

        case "revokeSessions":
        await revokeSessions();
        break;
    }
  }

  async function saveRole() {
      if (
          selectedRole ===
          user.roleRelation?.id
      ) {
          return;
      }

      setLoadingRole(true);

      const response =
      await fetch(
          `/api/admin/users/${user.id}/role`,
          {
              method: "POST",

              headers: {
                  "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                  roleId: selectedRole,
              }),
          }
      );

      setLoadingRole(false);

      if (response.ok) {
          window.location.reload();
      }
  }

  async function sendVerificationEmail() {
    setLoadingAction(true);

    await fetch(
        `/api/admin/users/${user.id}/send-verification`,
        {
        method: "POST",
        }
    );

    setLoadingAction(false);
  }

  async function sendPasswordReset() {
    setLoadingAction(true);

    await fetch(
        `/api/admin/users/${user.id}/send-reset-password`,
        {
        method: "POST",
        }
    );

    setLoadingAction(false);
  }

  async function toggleActive() {
      setLoadingAction(true);

      const response =
      await fetch(
          `/api/admin/users/${user.id}/status`,
          {
              method: "POST",
          }
      );

      setLoadingAction(false);

      if (response.ok) {
          window.location.reload();
      }
  }
  
  async function unlockUser() {
    setLoadingAction(true);

    await fetch(
      `/api/admin/users/${user.id}/unlock`,
      {
        method: "POST",
      }
    );

    setLoadingAction(false);

    window.location.reload();
  }

  async function suspendUser(
    reason?: string
  ) {
    setLoadingAction(true);

    await fetch(
      `/api/admin/users/${user.id}/suspend`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          reason,
        }),
      }
    );

    setLoadingAction(false);

    window.location.reload();
  }

  async function unsuspendUser() {
    setLoadingAction(true);

    await fetch(
      `/api/admin/users/${user.id}/unsuspend`,
      {
        method: "POST",
      }
    );

    setLoadingAction(false);

    window.location.reload();
  }

  async function deleteUser(
    reason?: string
  ) {
      setLoadingAction(true);

      const response =
          await fetch(
              `/api/admin/users/${user.id}/delete`,
              {
                  method: "POST",

                  headers: {
                      "Content-Type":
                          "application/json",
                  },

                  body: JSON.stringify({
                      reason,
                  }),
              }
          );

      setLoadingAction(false);

      if (response.ok) {
          window.location.reload();
      }
  }

  async function revokeSessions() {
    setLoadingAction(true);

    await fetch(
        `/api/admin/users/${user.id}/revoke-sessions`,
        {
        method: "POST",
        }
    );

    setLoadingAction(false);

    window.location.reload();
  }

  return (
    <SettingsCard
      title="Administration"
      description="Actions avancées."
    >
      <div className="flex flex-wrap gap-3">

        <div className="grid gap-8 lg:grid-cols-2">

          <p className="font-medium">
              Etat du compte
          </p>

          <Button
            variant="secondary"
            onClick={
                sendVerificationEmail
            }
            >
            Renvoyer vérification
          </Button>

          <Button
            variant="secondary"
            onClick={
                sendPasswordReset
            }
            >
            Envoyer reset password
          </Button>
          
          {(
            user.failedLoginAttempts > 0 ||
            user.lockedUntil
          ) && (
            <Button
              onClick={() => openDialog("unlock")}
              disabled={loadingAction}
            >
              Déverrouiller
            </Button>
          )}

          <Button
              onClick={() => openDialog("toggleActive")}
              disabled={loadingAction}
          >
              {user.isActive
                  ? "Désactiver"
                  : "Réactiver"}
          </Button>

          {user.suspendedAt ? (
            <Button
              onClick={() => openDialog("unsuspend")}
              disabled={loadingAction}
            >
              Lever suspension
            </Button>
          ) : (
            <Button
              onClick={() => openDialog("suspend")}
              disabled={loadingAction}
            >
              Suspendre
            </Button>
          )}

          <Button
            variant="warning"
            onClick={() =>
                openDialog(
                "revokeSessions"
                )
            }
            >
            Déconnecter partout
          </Button>

          <Button
              variant="destructive"
              onClick={() => openDialog("delete")}
          >
              Supprimer le compte
          </Button>

        </div>

        <div className="space-y-4">

          <label className="text-sm font-medium">
              Rôle
          </label>

          <select
              value={selectedRole}
              onChange={(e)=>
                  setSelectedRole(
                      e.target.value
                  )
              }
              className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-3
                  py-2
              "
          >

              {roles.map(role => (

                  <option
                      key={role.id}
                      value={role.id}
                  >
                      {role.label}
                  </option>

              ))}

          </select>

          <Button
              onClick={saveRole}
              disabled={
                  loadingRole ||
                  selectedRole ===
                  user.roleRelation?.id
              }
          >
              Enregistrer
          </Button>

        </div>

      </div>

      <ActionDialog
        open={dialogOpen}
        title={dialogTitle}
        description={
            dialogDescription
        }
        requireReason={
            dialogRequireReason
        }
        confirmLabel={
            dialogConfirmLabel
        }
        loading={loadingAction}
        onClose={() =>
            setDialogOpen(false)
        }
        onConfirm={
            handleDialogConfirm
        }
      />
    </SettingsCard>
  );
}