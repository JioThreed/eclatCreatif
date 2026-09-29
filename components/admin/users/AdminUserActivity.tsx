import SettingsCard from "@/components/settings/SettingsCard";
import type { AdminLoginHistory, AdminAuditLog } from "@/types/admin";

type Props = {
  loginHistory: AdminLoginHistory[];
  auditLogs: AdminAuditLog[];
};

export default function AdminUserActivity({
  loginHistory,
  auditLogs,
}: Props) {

  const labels: Record<string, string> = {
    USER_DISABLED:
      "Compte désactivé",

    USER_ENABLED:
      "Compte activé",

    USER_ROLE_UPDATED:
      "Rôle modifié",

    LOGIN_SUCCESS:
      "Connexion",
  };

  return (
    <>
      <SettingsCard
        title="Connexions"
      >
        <div className="space-y-3">
          {loginHistory.map(
            (login) => (
              <div key={login.id}>
                {login.createdAt.toLocaleString(
                  "fr-FR"
                )}
              </div>
            )
          )}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Audit"
      >
        <div className="space-y-3">
          {auditLogs.map(
            (log) => (
              <div key={log.id}>
                {labels[log.action] ?? log.action}
              </div>
            )
          )}
        </div>
      </SettingsCard>
    </>
  );
}