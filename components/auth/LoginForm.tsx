"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Turnstile from "react-turnstile";

import { publicConfig } from "@/lib/public-config";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Loader from "@/components/ui/Loader";

type Props = {
  onSuccess?: () => void;
  onSwitchMode?: () => void;
  onForgotPassword?: () => void;
};

export default function LoginForm({
  onSuccess,
  onSwitchMode,
  onForgotPassword,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    turnstileToken,
    setTurnstileToken,
  ] = useState("");

  async function login() {
    setError("");

    if (!turnstileToken) {
      setError(
        "Veuillez valider la vérification anti-bot."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Veuillez saisir votre adresse email"
      );
      return;
    }

    if (!password) {
      setError(
        "Veuillez saisir votre mot de passe"
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await signIn(
          "credentials",
          {
            email,
            password,
            turnstileToken,
            redirect: false,
          }
        );

      if (!result) {
        setError(
          "Une erreur est survenue"
        );
        return;
      }

      if (result.error) {
        if (
          result.error ===
          "EMAIL_NOT_VERIFIED"
        ) {
          setError(
            "Veuillez vérifier votre adresse email avant de vous connecter."
          );
        } else if (
          result.error ===
          "RATE_LIMIT"
        ) {
          setError(
            "Trop de tentatives de connexion. Réessayez dans quelques minutes."
          );
        } else {
          setError(
            "Email ou mot de passe incorrect"
          );
        }

        return;
      }

      onSuccess?.();

      window.location.reload();
    } catch {
      setError(
        "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
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
        Connexion
      </h2>

      {error && (
        <Alert type="error">
          {error}
        </Alert>
      )}

      <Button
        onClick={() =>
          signIn("google")
        }
      >
        Continuer avec Google
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        ou
      </div>

      <Input
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <Turnstile
        sitekey={
          publicConfig.turnstileSiteKey
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
        onClick={login}
        disabled={loading}
      >
        {loading
          ? (<div className="flex items-center gap-2">
                <Loader size="sm" />
                Connexion...
              </div>
            )
          : ("Se connecter")}
      </Button>
      
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-sm underline"
      >
        Mot de passe oublié ?
      </button>

      <button
        type="button"
        onClick={onSwitchMode}
        className="text-sm underline"
      >
        Pas encore de compte ?
      </button>
    </div>
  );
}