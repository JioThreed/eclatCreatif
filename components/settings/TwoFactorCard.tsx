import SettingsCard from "./SettingsCard";
import Button from "@/components/ui/Button";

export default function TwoFactorCard() {
  return (
    <SettingsCard
      title="Authentification à deux facteurs"
      description="Ajoutez une couche de sécurité supplémentaire."
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            Non activée
          </p>

          <p className="text-sm text-muted-foreground">
            Fonctionnalité bientôt disponible
          </p>
        </div>

        <Button disabled>
          Configurer
        </Button>
      </div>
    </SettingsCard>
  );
}