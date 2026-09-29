import AdminSection from "./AdminSection";
import AdminActionBadge from "@/components/admin/audit/AdminActionBadge";

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

export default function AdminDashboardLatestAudits({
  logs,
}: Props) {
  return (
    <AdminSection title="Dernières actions">
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="
              flex
              justify-between
              border-b
              border-border
              pb-4
            "
          >
            <div className="space-y-2">
              <AdminActionBadge
                action={log.action}
              />

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
            </div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {log.createdAt.toLocaleString(
                "fr-FR"
              )}
            </p>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}