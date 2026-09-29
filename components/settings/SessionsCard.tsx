import SettingsCard from "./SettingsCard";
import Button from "@/components/ui/Button";

export default function SessionsCard() {
  return (
    <SettingsCard
      title="Sessions actives"
      description="Gérez les appareils connectés à votre compte."
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            1 session active
          </p>

          <p className="text-sm text-muted-foreground">
            Fonctionnalité bientôt disponible
          </p>
        </div>

        <Button disabled>
          Voir les sessions
        </Button>
      </div>
    </SettingsCard>
  );
}