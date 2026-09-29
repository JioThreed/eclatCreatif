import UserStatusBadge from "../UserStatusBadge";
import AdminUserActions from "./AdminUserActions";

type Props = {
  users: {
    id: string;
    email: string | null;
    username: string | null;
    roleRelation: {
        id: string;
        label: string;
        priority: number;
    } | null;
    isActive: boolean;
    suspendedById: string | null;
    suspendedAt: Date | null;
    suspendedReason: string | null;
    createdAt: Date;
  }[];
};

export default function AdminUsersTable({
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
              Pseudo
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Rôle
            </th>

            <th className="p-4">
              Statut
            </th>

            <th className="p-4">
              Inscription
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
                {user.username ??
                  "Sans pseudo"}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.roleRelation?.label ?? "Aucun rôle"}
              </td>

              <td className="p-4">
                <UserStatusBadge
                  isActive={
                    user.isActive
                  }
                  suspendedAt={
                    user.suspendedAt
                  }
                  suspendedById={
                    user.suspendedById
                  }
                  suspendedReason={
                    user.suspendedReason
                  }
                />
              </td>

              <td className="p-4">
                {user.createdAt.toLocaleDateString(
                  "fr-FR"
                )}
              </td>

              <td className="p-4">
                <AdminUserActions
                  id={user.id}
                  isActive={user.isActive}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}