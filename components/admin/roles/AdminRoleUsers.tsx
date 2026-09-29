import SettingsCard from "@/components/settings/SettingsCard";

type Props = {
  users: {
    id: string;
    username: string | null;
    email: string | null;
  }[];
};

export default function AdminRoleUsers({
  users,
}: Props) {
  return (
    <SettingsCard
      title="Utilisateurs"
      description="Membres possédant ce rôle."
    >
      <div className="space-y-3">
        {users.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aucun utilisateur.
          </p>
        )}
        {users.map((user) => (
          <div
            key={user.id}
            className="
              flex
              justify-between
            "
          >
            <span>
              {user.username ??
                "Sans pseudo"}
            </span>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >
              {user.email}
            </span>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}