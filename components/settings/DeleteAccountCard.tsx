"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import SettingsCard from "./SettingsCard";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function DeleteAccountCard() {
  const [confirmText, setConfirmText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function deleteAccount() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "/api/settings/delete-account",
          {
            method: "POST",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      await signOut({
        callbackUrl: "/",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="Suppression du compte"
      description="Supprime définitivement votre compte et toutes les données associées."
    >
      <div className="space-y-5">

        <div
          className="
            rounded-xl
            border
            border-red-500/30
            bg-red-500/5
            p-4
          "
        >
          <p className="text-sm">
            Cette action est irréversible.
            Toutes vos données seront supprimées.
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Tapez
            {" "}
            <strong>SUPPRIMER</strong>
            {" "}
            pour confirmer.
          </p>

          <Input
            value={confirmText}
            onChange={(e) =>
              setConfirmText(
                e.target.value
              )
            }
            placeholder="SUPPRIMER"
          />
        </div>

        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}

        <Button
          onClick={deleteAccount}
          disabled={
            loading ||
            confirmText !==
              "SUPPRIMER"
          }
          className="
            bg-red-600
            hover:bg-red-700
          "
        >
          {loading
            ? (<div className="flex items-center gap-2">
                  <Loader size="sm" />
                  Suppression...
                </div>
              )
            : ("Supprimer définitivement mon compte")}
        </Button>

      </div>
    </SettingsCard>
  );
}