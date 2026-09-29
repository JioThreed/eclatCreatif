import SettingsCard from "./SettingsCard";

export default function CookiePreferencesCard() {
  return (
    <SettingsCard
      title="Cookies"
      description="Informations relatives aux cookies utilisés par le service."
    >
      <div className="space-y-3">

        <p className="text-sm text-muted-foreground">
          Ce service n'utilise actuellement
          aucun cookie publicitaire,
          analytique ou marketing.
        </p>

        <p className="text-sm text-muted-foreground">
          Seuls les cookies strictement
          nécessaires au fonctionnement
          du compte utilisateur peuvent
          être utilisés (authentification,
          sécurité, session).
        </p>

      </div>
    </SettingsCard>
  );
}