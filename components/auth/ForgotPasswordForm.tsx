"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Loader from "@/components/ui/Loader";

import {
  getEmailError,
} from "@/lib/validation";

type Props = {
  onSwitchMode?: () => void;
};

export default function ForgotPasswordForm({
  onSwitchMode,
}: Props) {
  const [email, setEmail] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [emailSent, setEmailSent] =
    useState(false);

  // const [message, setMessage] =
  //   useState("");

  const [loading, setLoading] =
    useState(false);

  async function submit() {
    setEmailError("");

    const error =
      getEmailError(email);

    if (error) {
      setEmailError(error);
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

      const data =
        await response.json();

      // setMessage(
      //   data.message
      // );
      toast.success(
        data.message
      );

      setEmailSent(true);
    } catch {
      toast.error(
        "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!emailSent) {
      return;
    }

    const timer =
      setTimeout(() => {
        onSwitchMode?.();
      }, 3000);

    return () =>
      clearTimeout(timer);
  }, [
    emailSent,
    onSwitchMode,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <h2
        className="
          text-3xl
          font-semibold
          tracking-tight
        "
      >
        Mot de passe oublié
      </h2>

      {!emailSent ? (
        <>
          <p className="text-sm text-muted-foreground">
            Saisissez votre adresse email.
            Si un compte existe, un lien
            de réinitialisation vous sera
            envoyé.
          </p>

          <div>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => {
                const value =
                  e.target.value;

                setEmail(value);

                setEmailError(
                  getEmailError(
                    value
                  ) ?? ""
                );
              }}
              className={`${
                emailError
                  ? "border-red-500"
                  : ""
              }`}
            />

            {emailError && (
              <Alert type="error">
                {emailError}
              </Alert>
            )}
          </div>

          <Button
            onClick={submit}
            disabled={loading}
          >
            {loading
              ? (<div className="flex items-center gap-2">
                    <Loader size="sm" />
                    Envoi...
                  </div>
                )
              : ("Envoyer le lien")}
          </Button>
        </>
      ) : (
        <>
{/*           <Alert type="success">
            {message}
          </Alert> */}

          <p className="text-sm text-muted-foreground">
            Vérifiez votre boîte mail.
            Retour à la connexion dans
            quelques secondes...
          </p>
        </>
      )}

      <button
        type="button"
        onClick={onSwitchMode}
        className="text-sm underline"
      >
        Retour à la connexion
      </button>
    </div>
  );
}