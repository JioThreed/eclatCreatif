import SettingsCard from "@/components/settings/SettingsCard";

type Props = {
  role: {
    name: string;
    label: string;
    description: string | null;
    priority: number;

    users: {
      id: string;
    }[];
  };
};

export default function AdminRoleOverview({
  role,
}: Props) {
  return (
    <SettingsCard
      title="Informations"
      description="Vue d'ensemble du rôle."
    >
      <div className="space-y-4">
        <p>
          <strong>Nom :</strong>{" "}
          {role.label}
        </p>

        <p>
          <strong>Description :</strong>{" "}
          {role.description ?? "Aucune description"}
        </p>

        <p>
          <strong>Identifiant interne :</strong>{" "}
          {role.name}
        </p>

        <p>
          <strong>Priorité :</strong>{" "}
          {role.priority}
        </p>

        <p>
          <strong>Utilisateurs :</strong>{" "}
          {role.users.length}
        </p>
      </div>
    </SettingsCard>
  );
}