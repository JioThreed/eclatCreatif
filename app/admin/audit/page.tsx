import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminAuditTable from "@/components/admin/audit/AdminAuditTable";
import AdminAuditFilters from "@/components/admin/audit/AdminAuditFilters";
import AdminPagination from "@/components/admin/shared/AdminPagination";

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    action?: string;
    page?: string;
  };
}) {
  await requirePermission(
    "manageUsers"
  );

  const search =
    searchParams.search ?? "";

  const action =
    searchParams.action ?? "all";

  const page =
    Number(
      searchParams.page ?? "1"
    );

  const take = 50;

  const skip =
    (page - 1) * take;

  const where: Prisma.AuditLogWhereInput = {
    AND: [
      search
        ? {
            OR: [
              {
                user: {
                  username: {
                    contains:
                      search,
                    mode:
                      "insensitive",
                  },
                },
              },

              {
                user: {
                  email: {
                    contains:
                      search,
                    mode:
                      "insensitive",
                  },
                },
              },
            ],
          }
        : {},

      action !== "all"
        ? {
            action,
          }
        : {},
    ],
  };

  const [logs, total] =
    await Promise.all([
      prisma.auditLog.findMany({
        where,
        take,
        skip,

        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.auditLog.count({
        where,
      }),
    ]);

  const pages =
    Math.ceil(total / take);

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <h1
          className="
            text-4xl
            font-semibold
          "
        >
          Audit Logs
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          {total} événements enregistrés.
        </p>
      </div>

      <AdminAuditFilters
        search={search}
        action={action}
      />

      <AdminAuditTable
        logs={logs}
      />

      <AdminPagination
        page={page}
        pages={pages}
      />
    </main>
  );
}