import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminPagination from "@/components/admin/shared/AdminPagination";
import AdminLoginHistoryFilters from "@/components/admin/AdminLoginHistoryFilters";
import AdminLoginHistoryTable from "@/components/admin/AdminLoginHistoryTable";

export default async function LoginHistoryPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
  };
}) {
  await requirePermission(
    "manageUsers"
  );

  const search =
    searchParams.search ?? "";

  const page =
    Number(
      searchParams.page ?? "1"
    );

  const take = 50;

  const skip =
    (page - 1) * take;

  const where: Prisma.LoginHistoryWhereInput =
    search
      ? {
          user: {
            OR: [
              {
                username: {
                  contains:
                    search,
                  mode:
                    "insensitive",
                },
              },

              {
                email: {
                  contains:
                    search,
                  mode:
                    "insensitive",
                },
              },
            ],
          },
        }
      : {};

  const [logs, total] =
    await Promise.all([
      prisma.loginHistory.findMany({
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

      prisma.loginHistory.count({
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
          Historique des connexions
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          {total} connexions enregistrées.
        </p>
      </div>

      <AdminLoginHistoryFilters
        search={search}
      />

      <AdminLoginHistoryTable
        logs={logs}
      />

      <AdminPagination
        page={page}
        pages={pages}
      />
    </main>
  );
}