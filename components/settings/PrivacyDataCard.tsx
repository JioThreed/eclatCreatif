"use client";

import SettingsCard from "./SettingsCard";
import Button from "@/components/ui/Button";

async function exportData() {
  const response =
    await fetch(
      "/api/settings/export-data"
    );

  const data =
    await response.json();

  const blob =
    new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type:
          "application/json",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "mes-donnees.json";

  link.click();

  URL.revokeObjectURL(
    url
  );
}

export default function PrivacyDataCard() {
  return (
    <SettingsCard
      title="Données personnelles"
      description="Téléchargez une copie des données associées à votre compte."
    >
        <Button onClick={exportData} >
            Télécharger mes données
        </Button>
    </SettingsCard>
  );
}