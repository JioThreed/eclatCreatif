import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

import AdminSection from "@/components/admin/dashboard/AdminSection";

export default async function MonitoringHealthCard() {
  let databaseOk = true;

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    databaseOk = false;
  }

  let redisOk = false;

  if (redis) {
    try {
        await redis.ping();
        redisOk = true;
    } catch {}
  }

  const resendOk = !!process.env.RESEND_API_KEY;

  const sentryOk = !!process.env.SENTRY_DSN;

  const failedLogins =
  await prisma.user.count({
    where: {
      failedLoginAttempts: {
        gt: 0,
      },
    },
  });

  const scheduledDeletions =
  await prisma.user.count({
    where: {
      scheduledDeletionAt: {
        not: null,
      },
    },
  });
  
  return (
    <AdminSection title="Santé système">
      <div className="space-y-4">
        <Status
          label="Application"
          ok
        />

        <Status
          label="Base de données"
          ok={databaseOk}
        />

        <Status
          label="Cron"
          ok
        />
      </div>
    </AdminSection>
  );
}

function Status({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>

      <span
        className={
          ok
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {ok
          ? "Opérationnel"
          : "Erreur"}
      </span>
    </div>
  );
}