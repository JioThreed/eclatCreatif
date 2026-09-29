import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminDashboardStats from "@/components/admin/dashboard/AdminDashboardStats";
import AdminDashboardQuickActions from "@/components/admin/dashboard/AdminDashboardQuickActions";
import AdminDashboardLatestUsers from "@/components/admin/dashboard/AdminDashboardLatestUsers";
import AdminDashboardLatestLogins from "@/components/admin/dashboard/AdminDashboardLatestLogins";
import AdminDashboardLatestAudits from "@/components/admin/dashboard/AdminDashboardLatestAudits";
import AdminDashboardSystem from "@/components/admin/dashboard/AdminDashboardSystem";

export default async function AdminPage() {
  await requirePermission("manageUsers");

  const [
    usersCount,
    activeUsersCount,
    verifiedUsersCount,
    unverifiedUsersCount,
    suspendedUsersCount,
    deletedUsersCount,
    sessionsCount,
    rolesCount,
    auditCount,
    latestUsers,
    latestLogins,
    latestAuditLogs,
    ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
        where: {
        isActive: true,
        suspendedAt: null,
        deletedAt: null,
        },
    }),

    prisma.user.count({
        where: {
        emailVerified: {
            not: null,
        },
        },
    }),

    prisma.user.count({
        where: {
        emailVerified: null,
        deletedAt: null,
        },
    }),

    prisma.user.count({
        where: {
        suspendedAt: {
            not: null,
        },
        deletedAt: null,
        },
    }),

    prisma.user.count({
        where: {
        deletedAt: {
            not: null,
        },
        },
    }),

    prisma.session.count(),

    prisma.userRole.count(),

    prisma.auditLog.count(),

    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),

    prisma.loginHistory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,

      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    }),

    prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,

      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-12">
            <h1
                className="
                text-4xl
                font-semibold
                tracking-tight
                "
            >
                Administration
            </h1>

            <p
                className="
                mt-2
                text-sm
                text-muted-foreground
                "
            >
                Vue d'ensemble de la plateforme.
            </p>
        </div>

        <AdminDashboardStats
            users={usersCount}
            activeUsers={activeUsersCount}
            verifiedUsers={verifiedUsersCount}
            unverifiedUsers={unverifiedUsersCount}
            suspendedUsers={suspendedUsersCount}
            deletedUsers={deletedUsersCount}
            sessions={sessionsCount}
            audits={auditCount}
        />

        <AdminDashboardQuickActions />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <AdminDashboardLatestUsers users={latestUsers} />

            <AdminDashboardLatestLogins logins={latestLogins} />

            <AdminDashboardLatestAudits logs={latestAuditLogs} />

            <AdminDashboardSystem
                roles={rolesCount}
                sessions={sessionsCount}
                deletedUsers={deletedUsersCount}
                auditLogs={auditCount}
            />
        </div>
    </main>
  );
}