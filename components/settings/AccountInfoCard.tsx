import SettingsCard from "./SettingsCard";

type Props = {
  email: string;
  username: string | null;
  createdAt: Date;
};

export default function AccountInfoCard({
  email,
  username,
  createdAt,
}: Props) {
  return (
    <SettingsCard
      title="Informations du compte"
      description="Informations générales relatives à votre compte."
    >
      <div className="space-y-6">

        <div>
          <p className="text-sm text-muted-foreground">
            Adresse email
          </p>

          <p className="mt-1 font-medium">
            {email}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Pseudo
          </p>

          <p className="mt-1 font-medium">
            {username}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Membre depuis
          </p>

          <p className="mt-1 font-medium">
            {createdAt.toLocaleDateString(
              "fr-FR"
            )}
          </p>
        </div>

      </div>
    </SettingsCard>
  );
}