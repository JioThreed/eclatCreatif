"use client";

import { useState } from "react";

import SettingsCard from "./SettingsCard";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function ChangePasswordForm() {
  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submit() {
    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const response =
        await fetch(
          "/api/settings/password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              currentPassword,
              password,
              confirmPassword,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");

      setSuccess(
        "Votre mot de passe a été modifié avec succès."
      );
    } catch {
      setError(
        "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="Mot de passe"
      description="Modifiez le mot de passe de votre compte."
    >

      <div className="space-y-4">
        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}

        {success && (
          <Alert type="success">
            {success}
          </Alert>
        )}

        <Input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Confirmation du nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <Button
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? (<div className="flex items-center gap-2">
                  <Loader size="sm" />
                  Modification...
                </div>
              )
            : ("Modifier mon mot de passe")}
        </Button>
      </div>
    </SettingsCard>
  );
}