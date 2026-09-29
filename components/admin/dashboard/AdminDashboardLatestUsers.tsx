import Link from "next/link";

import AdminSection from "./AdminSection";
import UserStatusBadge from "@/components/admin/users/UserStatusBadge";

type Props = {
  users: {
    id: string;
    username: string | null;
    email: string | null;
    createdAt: Date;
    isActive: boolean;
    suspendedById: string | null;
    suspendedAt: Date | null;
    suspendedReason: string | null;
  }[];
};

export default function AdminDashboardLatestUsers({
  users,
}: Props) {
  return (
    <AdminSection title="Dernières inscriptions">
      <div className="space-y-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/admin/users/${user.id}`}
            className="
              flex
              items-center
              justify-between
              border-b
              border-border
              pb-4
            "
          >
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

            <div className="text-right space-y-2">
              <UserStatusBadge
                isActive={user.isActive}
                suspendedById={
                  user.suspendedById
                }
                suspendedAt={
                  user.suspendedAt
                }
                suspendedReason={
                  user.suspendedReason
                }
              />

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                {user.createdAt.toLocaleDateString(
                  "fr-FR"
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </AdminSection>
  );
}