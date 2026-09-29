import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import type { AdminUser } from "@/types/admin";

import AdminUserOverview from "@/components/admin/AdminUserOverview";
import AdminUserSecurity from "@/components/admin/AdminUserSecurity";
import AdminUserActivity from "@/components/admin/AdminUserActivity";
import AdminUserActionsCard from "@/components/admin/AdminUserActionsCard";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminUserPage({
  params,
}: Props) {
  await requirePermission("manageUsers");

  const [user, roles] =
    await Promise.all([
        prisma.user.findUnique({
            where: {
                id: params.id,
            },

            include: {
                roleRelation: true,
            },
        }),

        prisma.userRole.findMany({
            orderBy: {
                priority: "asc",
            },

            select: {
                id: true,
                label: true,
                priority: true,
            },
        }),
    ]);

  if (!user) {
    notFound();
  }

  const adminUser: AdminUser = user;

  const loginHistory =
    await prisma.loginHistory.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

  const auditLogs =
    await prisma.auditLog.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          {user.username ??
            user.email}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Gestion du compte utilisateur.
        </p>
      </div>

      <div className="grid gap-6">
        <AdminUserOverview
          user={adminUser}
        />

        <AdminUserSecurity
          user={adminUser}
        />

        <AdminUserActivity
          loginHistory={
            loginHistory
          }
          auditLogs={
            auditLogs
          }
        />

        <AdminUserActionsCard
          user={adminUser}
          roles={roles}
        />
      </div>
    </main>
  );
}