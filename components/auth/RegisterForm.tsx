"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Loader from "@/components/ui/Loader";
//import { signIn } from "next-auth/react";

import {
  getEmailError,
  getUsernameError,
  getPasswordError,
  getConfirmPasswordError,
} from "@/lib/validation";

type Props = {
  onSuccess?: () => void;
  onSwitchMode?: () => void;
};

export default function RegisterForm({
  onSuccess,
  onSwitchMode,
}: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [usernameError, setUsernameError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [
    confirmPasswordError,
    setConfirmPasswordError,
  ] = useState("");

  const [serverError, setServerError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [emailSent, setEmailSent] =
    useState(false);

  const [
    turnstileToken,
    setTurnstileToken,
  ] = useState("");

  function validateEmail(value: string) {
    const error = getEmailError(value);
    setEmailError(error ?? "");
  }

  function validateUsername(value: string) {
    const error = getUsernameError(value);
    setUsernameError(error ?? "");
  }

  function validatePassword(value: string) {
    const error = getPasswordError(value);
    setPasswordError(error ?? "");
  }

  function validateConfirmPassword(
    value: string,
    currentPassword: string
  ) {
    const error =
      getConfirmPasswordError(
        currentPassword,
        value
      );

    setConfirmPasswordError(
      error ?? ""
    );
  }

  async function register() {
    setServerError("");
    setSuccess("");

    const emailValidation =
      getEmailError(email);

    const usernameValidation =
      getUsernameError(username);

    const passwordValidation =
      getPasswordError(password);

    const confirmValidation =
      getConfirmPasswordError(
        password,
        confirmPassword
      );

    setEmailError(
      emailValidation ?? ""
    );

    setUsernameError(
      usernameValidation ?? ""
    );

    setPasswordError(
      passwordValidation ?? ""
    );

    setConfirmPasswordError(
      confirmValidation ?? ""
    );

    if (
      emailValidation ||
      usernameValidation ||
      passwordValidation ||
      confirmValidation
    ) {
      return;
    }

    try {
      setLoading(true);

      if (!turnstileToken) {
        setServerError(
          "Veuillez valider la vérification anti-bot."
        );
        return;
      }

      const response =
        await fetch(
          "/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              password,
              confirmPassword,
              turnstileToken,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setServerError(
          data.error
        );
        return;
      }

/*       setSuccess(
        "Compte créé, connexion en cours..."
      );

      const loginResult =
        await signIn(
          "credentials",
          {
            email,
            password,
            redirect: false,
          }
        );

      if (
        loginResult &&
        !loginResult.error
      ) {
        onSuccess?.();

        window.location.reload();

        return;
      }

      setSuccess(
        "Compte créé.\n\nUn email de vérification vous a été envoyé."
      ); */

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setServerError("");

      setEmailSent(true);

    } catch {
      setServerError(
        "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div>
          <h2
            className="
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Vérifiez votre boîte mail 📧
          </h2>

          <p className="mt-4">
            Nous avons envoyé un lien
            de validation à :
          </p>

          <p className="mt-2 font-semibold">
            {email}
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Vous devez confirmer votre
            adresse email avant de
            pouvoir vous connecter.
          </p>
        </div>

        <button
          type="button"
          onClick={onSuccess}
          className="
            rounded
            bg-primary
            px-4
            py-2
            text-primary-foreground
          "
        >
          Fermer
        </button>

        <p className="text-xs text-muted-foreground">
          Pensez à vérifier votre dossier
          spam si vous ne recevez pas
          l'email dans quelques minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2
        className="
          text-3xl
          font-semibold
          tracking-tight
        "
      >
        Créer un compte
      </h2>

      {serverError && (
        <Alert type="error">
          {serverError}
        </Alert>
      )}

      {success && (
        <Alert type="success">
          {success}
        </Alert>
      )}

      <div>
        <Input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => {
            const value =
              e.target.value;

            setEmail(value);
            validateEmail(value);
          }}
          className={`${
            emailError
              ? "border-red-500"
              : ""
          }`}
        />

        {emailError && (
          <Alert type="error" className="whitespace-pre-line mt-1">
            {emailError}
          </Alert>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Pseudo"
          value={username}
          onChange={(e) => {
            const value =
              e.target.value;

            setUsername(value);
            validateUsername(value);
          }}
          className={`${
            usernameError
              ? "border-red-500"
              : ""
          }`}
        />

        <p className="whitespace-pre-line mt-1 text-xs text-muted-foreground">
          {username.length}/30
        </p>

        {usernameError && (
          <Alert type="error" className="whitespace-pre-line mt-1">
            {usernameError}
          </Alert>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => {
            const value =
              e.target.value;

            setPassword(value);

            validatePassword(value);

            if (
              confirmPassword
            ) {
              validateConfirmPassword(
                confirmPassword,
                value
              );
            }
          }}
          className={`${
            passwordError
              ? "border-red-500"
              : ""
          }`}
        />

        {passwordError && (
          <Alert type="error" className="whitespace-pre-line mt-1">
            {passwordError}
          </Alert>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirmation du mot de passe"
          value={confirmPassword}
          onChange={(e) => {
            const value =
              e.target.value;

            setConfirmPassword(
              value
            );

            validateConfirmPassword(
              value,
              password
            );
          }}
          className={`${
            confirmPasswordError
              ? "border-red-500"
              : ""
          }`}
        />

        {confirmPasswordError && (
          <Alert type="error" className="whitespace-pre-line mt-1">
            {confirmPasswordError}
          </Alert>
        )}
      </div>

      <Turnstile
        sitekey={
          process.env
            .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
        }
        onVerify={(token) =>
          setTurnstileToken(token)
        }
        onExpire={() =>
          setTurnstileToken("")
        }
        onError={() =>
          setTurnstileToken("")
        }
      />

      <Button
        onClick={register}
        disabled={loading}
      >
        {loading
          ? (<div className="flex items-center gap-2">
                <Loader size="sm" />
                Création du compte...
              </div>
            )
          : ("Créer mon compte")}
      </Button>

      <button
        type="button"
        onClick={onSwitchMode}
        className="text-sm underline"
      >
        Déjà un compte ?
      </button>
    </div>
  );
}