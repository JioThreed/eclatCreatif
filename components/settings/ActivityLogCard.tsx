import SettingsCard from "./SettingsCard";

type Props = {
  logs: {
    id: string;
    action: string;
    createdAt: Date;
  }[];
};

const labels: Record<
  string,
  string
> = {
  REGISTER:
    "Création du compte",

  LOGIN_SUCCESS:
    "Connexion réussie",

  PASSWORD_CHANGED:
    "Mot de passe modifié",

  PASSWORD_RESET:
    "Mot de passe réinitialisé",

  PASSWORD_RESET_REQUEST:
    "Demande de réinitialisation",

  EMAIL_VERIFIED:
    "Adresse email vérifiée",

  LOGIN_RATE_LIMIT:
    "Trop de tentatives de connexion",

  PROFILE_UPDATED:
    "Profil mis à jour",

  APPEARANCE_UPDATED:
    "Apparence modifiée",

  ACCOUNT_DELETED:
    "Compte supprimé",

  TWO_FACTOR_ENABLED:
    "2FA activée",

  TWO_FACTOR_DISABLED:
    "2FA désactivée",
};

export default function ActivityLogCard({
  logs,
}: Props) {
  return (
    <SettingsCard
      title="Journal d'activité"
      description="Historique récent de votre compte."
    >
      <div className="space-y-4">

        {logs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aucun événement enregistré.
          </p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="
              flex
              items-center
              justify-between
            "
          >
            <span className="flex items-center gap-2">
                <span>✓</span>

                <span>
                    {labels[log.action] ??
                    log.action}
                </span>
            </span>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >
              {new Date(
                log.createdAt
              ).toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        ))}

      </div>
    </SettingsCard>
  );
}