import Link from "next/link";

type Props = {
  roles: {
    id: string;
    name: string;
    priority: number;

    permissions: unknown;

    _count: {
      users: number;
    };
  }[];
};

export default function AdminRolesTable({
  roles,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-border
            "
          >
            <th className="p-4 text-left">
              Nom
            </th>

            <th className="p-4 text-left">
              Priorité
            </th>

            <th className="p-4 text-left">
              Utilisateurs
            </th>

            <th className="p-4 text-left">
              Permissions
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
              className="
                border-b
                border-border
              "
            >
              <td className="p-4 font-medium">
                {role.name}
              </td>

              <td className="p-4">
                {role.priority}
              </td>

              <td className="p-4">
                {role._count.users}
              </td>

              <td className="p-4">
                <pre
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  {JSON.stringify(
                    role.permissions,
                    null,
                    2
                  )}
                </pre>
              </td>

              <td className="p-4">
                <Link
                  href={`/admin/roles/${role.id}`}
                  className="
                    text-primary
                    hover:underline
                  "
                >
                  Gérer
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}