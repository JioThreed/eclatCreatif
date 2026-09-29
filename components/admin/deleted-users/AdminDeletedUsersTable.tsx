import AdminDeletedUserActions
  from "./AdminDeletedUserActions";

type Props = {
  users: {
    id: string;
    email: string | null;
    username: string | null;

    deletedAt: Date | null;
    deletedReason: string | null;

    roleRelation: {
      label: string;
    } | null;

    deletedBy: {
      username: string | null;
      email: string | null;
    } | null;
  }[];
};

export default function AdminDeletedUsersTable({
  users,
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
              text-left
            "
          >
            <th className="p-4">
              Utilisateur
            </th>

            <th className="p-4">
              Rôle
            </th>

            <th className="p-4">
              Supprimé le
            </th>

            <th className="p-4">
              Motif
            </th>

            <th className="p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="
                border-b
                border-border
              "
            >
              <td className="p-4">
                <div>
                  <p>
                    {user.username ??
                      "Sans pseudo"}
                  </p>

                  <p
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {user.email}
                  </p>
                </div>
              </td>

              <td className="p-4">
                {user.roleRelation?.label ??
                  "Aucun"}
              </td>

              <td className="p-4">
                {user.deletedAt?.toLocaleString(
                  "fr-FR"
                )}
              </td>

              <td className="p-4">
                {user.deletedReason ??
                  "—"}
              </td>

              <td className="p-4">
                <AdminDeletedUserActions
                  userId={user.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}