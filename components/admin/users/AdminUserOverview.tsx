import SettingsCard from "@/components/settings/SettingsCard";
import type { AdminUser, } from "@/types/admin";

export default function AdminUserOverview({
  user,
}: {
  user: AdminUser;
}) {
  return (
    <SettingsCard
      title="Informations"
      description="Informations générales du compte."
    >
      <div className="space-y-4">
        <p>
          <strong>Email :</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Pseudo :</strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>Rôle :</strong>{" "}
          {user.roleRelation?.label}
        </p>

        <p>
          <strong>Créé le :</strong>{" "}
          {user.createdAt.toLocaleString(
            "fr-FR"
          )}
        </p>

        <p>
          <strong>Vérifié :</strong>{" "}
          {user.emailVerified
            ? user.emailVerified.toLocaleString(
                "fr-FR"
              )
            : "Non vérifié"}
        </p>
      </div>
    </SettingsCard>
  );
}