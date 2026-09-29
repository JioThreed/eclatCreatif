"use client";

import { useEffect, useState } from "react";
import SettingsCard from "./SettingsCard";

type LoginEntry = {
  id: string;
  createdAt: string;
  ip: string | null;
  userAgent: string | null;
};

export default function SecuritySettings() {
  const [history, setHistory] =
    useState<LoginEntry[]>([]);

  useEffect(() => {
    fetch(
      "/api/settings/login-history"
    )
      .then((res) =>
        res.json()
      )
      .then(setHistory);
  }, []);

  return (
    <SettingsCard
      title="Sécurité"
      description="Historique des connexions à votre compte."
    >
      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border p-4"
          >
            <p>
              {new Date(
                entry.createdAt
              ).toLocaleString("fr-FR")}
            </p>

            <p className="text-sm text-muted-foreground">
              {entry.ip ?? "IP inconnue"}
            </p>

            <p className="text-sm text-muted-foreground">
              {entry.userAgent ??
                "Navigateur inconnu"}
            </p>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}