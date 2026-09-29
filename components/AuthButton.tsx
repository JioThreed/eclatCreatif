"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import AuthModal from "./AuthModal";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import Button from "@/components/ui/Button";

type AuthMode =
  | "login"
  | "register"
  | "forgot-password";

export default function AuthButton() {
  const { data: session } =
    useSession();

  const [open, setOpen] =
    useState(false);

  const [mode, setMode] =
    useState<AuthMode>("login");

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          Bonjour{" "}
          {session.user.username ??
            session.user.name ??
            "Auteur"}
        </span>

        <a
          href="/settings"
          className="underline"
        >
          Paramètres
        </a>

        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="
            border
            border-border
            text-foreground
            rounded
            bg-red-500
            px-3
            py-1
          "
        >
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setMode("login");
            setOpen(true);
          }}
        >
          Connexion
        </Button>

        <Button
          onClick={() => {
            setMode("register");
            setOpen(true);
          }}
          variant="secondary"
        >
          Créer un compte
        </Button>
      </div>

      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
      >
        {mode === "login" && (
          <LoginForm
            onSuccess={() =>
              setOpen(false)
            }
            onSwitchMode={() =>
              setMode("register")
            }
            onForgotPassword={() =>
              setMode(
                "forgot-password"
              )
            }
          />
        )}

        {mode === "register" && (
          <RegisterForm
            onSuccess={() =>
              setOpen(false)
            }
            onSwitchMode={() =>
              setMode("login")
            }
          />
        )}

        {mode ===
          "forgot-password" && (
          <ForgotPasswordForm
            onSwitchMode={() =>
              setMode("login")
            }
          />
        )}
      </AuthModal>
    </>
  );
}