import SettingsCard from "./SettingsCard";

export default function LegalDocumentsCard() {
  return (
    <SettingsCard
      title="Documents légaux"
      description="Consultez les documents relatifs à l'utilisation du service."
    >
      <div className="space-y-4">

        <a
          href="/privacy"
          className="
            block
            rounded-xl
            border
            border-border
            p-4
            hover:bg-muted
          "
        >
          Politique de confidentialité
        </a>

        <a
          href="/terms"
          className="
            block
            rounded-xl
            border
            border-border
            p-4
            hover:bg-muted
          "
        >
          Conditions d'utilisation
        </a>

      </div>
    </SettingsCard>
  );
}