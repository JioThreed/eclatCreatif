import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import MonitoringHealthCard from "@/components/admin/monitoring/MonitoringHealthCard";
import MonitoringServiceCard from "@/components/admin/monitoring/MonitoringServiceCard";
import MonitoringSecurityCard from "@/components/admin/monitoring/MonitoringSecurityCard";
import MonitoringCronTable from "@/components/admin/monitoring/MonitoringCronTable";
import MonitoringEventsTable from "@/components/admin/monitoring/MonitoringEventsTable";
import MonitoringSystemStats from "@/components/admin/monitoring/MonitoringSystemStats";

export default async function MonitoringPage() {
  await requirePermission(
    "manageSettings"
  );

  const [
    lockedUsers,
    suspendedUsers,
    deletedUsers,
    activeSessions,
    recentEvents,
    recentCrons,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        lockedUntil: {
          not: null,
        },
      },
    }),

    prisma.user.count({
      where: {
        suspendedAt: {
          not: null,
        },
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

    prisma.systemEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    }),

    prisma.cronExecution.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          Monitoring
        </h1>

        <p className="mt-2 text-muted-foreground">
          Santé et supervision de la plateforme.
        </p>
      </div>

      <MonitoringSystemStats
        sessions={activeSessions}
        deletedUsers={deletedUsers}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MonitoringHealthCard />

        <MonitoringServiceCard />
      </div>

      <div className="mt-8">
        <MonitoringSecurityCard
          lockedUsers={lockedUsers}
          suspendedUsers={suspendedUsers}
          deletedUsers={deletedUsers}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MonitoringCronTable
          jobs={recentCrons}
        />

        <MonitoringEventsTable
          events={recentEvents}
        />
      </div>
    </main>
  );
}