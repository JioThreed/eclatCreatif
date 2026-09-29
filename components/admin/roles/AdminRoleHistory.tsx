import SettingsCard from "@/components/settings/SettingsCard";

type Props = {
  logs: {
    id: string;
    action: string;
    createdAt: Date;
    user: {
      username: string | null;
      email: string | null;
    } | null;
  }[];
};

export default function AdminRoleHistory({
  logs,
}: Props) {
  return (
    <SettingsCard
      title="Historique"
      description="Dernières actions sur ce rôle."
    >
      <div className="space-y-4">
        {logs.length === 0 && (
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Aucun historique.
          </p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="
              rounded-xl
              border
              border-border
              p-4
            "
          >
            <p className="font-medium">
              {log.action}
            </p>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {log.user?.username ??
                log.user?.email ??
                "Système"}
            </p>

            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}