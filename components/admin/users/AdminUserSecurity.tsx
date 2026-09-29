import SettingsCard from "@/components/settings/SettingsCard";
import type { AdminUser, } from "@/types/admin";

export default function AdminUserSecurity({
  user,
}: {
  user: AdminUser;
}) {
  return (
    <SettingsCard
      title="Sécurité"
      description="État du compte."
    >
      <div className="space-y-4">
        <p>
          <strong>
            Tentatives échouées :
          </strong>{" "}
          {user.failedLoginAttempts}
        </p>

        <p>
          <strong>
            Verrouillé jusqu'à :
          </strong>{" "}
          {user.lockedUntil
            ? user.lockedUntil.toLocaleString(
                "fr-FR"
              )
            : "Non"}
        </p>

        <p>
          <strong>
            Compte actif :
          </strong>{" "}
          {user.isActive
            ? "Oui"
            : "Non"}
        </p>

        <p>
          <strong>
            Suspendu :
          </strong>{" "}
          {user.suspendedAt
            ? "Oui"
            : "Non"}
        </p>

        {user.suspendedAt && (
          <p>
            <strong>
              Suspendu le :
            </strong>{" "}
            {user.suspendedAt.toLocaleString(
              "fr-FR"
            )}
          </p>
        )}

        {user.suspendedReason && (
          <p>
            <strong>
              Motif :
            </strong>{" "}
            {user.suspendedReason}
          </p>
        )}
      </div>
    </SettingsCard>
  );
}