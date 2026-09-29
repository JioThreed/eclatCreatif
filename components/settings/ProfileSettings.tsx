"use client";

import { useState } from "react";
import { toast } from "sonner";

import SettingsCard from "./SettingsCard";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

type Props = {
  email: string;
  username: string | null;
};

export default function ProfileSettings({
  email,
  username,
}: Props) {
  const [
    currentUsername,
    setCurrentUsername,
  ] = useState(
    username ?? ""
  );

  const [loading, setLoading] =
    useState(false);

  // const [message, setMessage] =
  //   useState("");

  const [error, setError] =
    useState("");

  async function save() {
    setError("");
    // setMessage("");

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/settings/profile",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              username:
                currentUsername,
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

      toast.success(
        "Profil mis à jour."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="Profil"
      description="Gérez les informations publiques de votre compte."
    >
      <div className="space-y-6">

        <div>
          <label className="block text-sm text-muted-foreground">
            Adresse email
          </label>

          <Input
            value={email}
            disabled
            className="
              mt-2
              bg-muted
              p-3
            "
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground">
            Pseudo
          </label>

          <Input
            value={
              currentUsername
            }
            onChange={(e) =>
              setCurrentUsername(
                e.target.value
              )
            }
            className="
              mt-2
              p-3
            "
          />
        </div>

        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}

{/*         {message && (
          <Alert type="success">
            {message}
          </Alert>
        )} */}

        <div>
          <Button
            onClick={save}
            disabled={loading}
          >
            {loading
              ? (<div className="flex items-center gap-2">
                    <Loader size="sm" />
                    Enregistrement...
                  </div>
                )
              : ("Enregistrer")}
          </Button>
        </div>

      </div>
    </SettingsCard>
  );
}