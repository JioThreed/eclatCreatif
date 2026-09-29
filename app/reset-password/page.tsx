"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function ResetPasswordPage() {
  const searchParams =
    useSearchParams();

  const token =
    searchParams.get("token");

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

  async function resetPassword() {
    setError("");
    setSuccess("");

    if (!token) {
      setError(
        "Lien invalide."
      );
      return;
    }

    if (!password) {
      setError(
        "Veuillez saisir un mot de passe."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Les mots de passe ne correspondent pas."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              token,
              password,
              confirmPassword,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error
        );
        return;
      }

      setSuccess(
        data.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto mt-10 max-w-md">
      <h1 className="mb-6 text-2xl font-bold">
        Réinitialiser mon mot de passe
      </h1>

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
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="mb-4"
      />

      <Input
        type="password"
        placeholder="Confirmation"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        className="mb-4"
      />

      <Button
        onClick={
          resetPassword
        }
        disabled={loading}
      >
        {loading
          ? (<div className="flex items-center gap-2">
                <Loader size="sm" />
                Mise à jour...
              </div>
            )
          : ("Changer le mot de passe")}
      </Button>
    </main>
  );
}
