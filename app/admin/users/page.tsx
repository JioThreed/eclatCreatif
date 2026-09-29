import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminUsersTable from "@/components/admin/users/AdminUsersTable";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import AdminUsersFilters from "@/components/admin/users/AdminUsersFilters";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    status?: string;
    page?: string
  };
}) {
  await requirePermission("manageUsers");

  const search =
    searchParams.search ?? "";

  const status =
    searchParams.status ?? "all";

  const page =
  Number(
    searchParams.page ??
    "1"
  );

  const take = 25;

  const skip = (page - 1) * take;

  const where: Prisma.UserWhereInput = {
    deletedAt: null,

    AND: [
      search
        ? {
            OR: [
              {
                username: {
                  contains: search,
                  mode: "insensitive",
                },
              },

              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},

      status === "active"
        ? {
            isActive: true,
            suspendedAt: null,
          }
        : {},

      status === "disabled"
        ? {
            isActive: false,
          }
        : {},

      status === "suspended"
        ? {
            suspendedAt: {
              not: null,
            },
          }
        : {},
    ],
  };

  const [users, total] =
    await Promise.all([
      prisma.user.findMany({
        where,
        take,
        skip,

        select: {
          id: true,
          email: true,
          username: true,

          roleRelation: {
            select: {
              id: true,
              label: true,
              priority: true,
            },
          },

          isActive: true,
          suspendedAt: true,
          suspendedById: true,
          suspendedReason: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

  const pages = Math.ceil(total / take);

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <h1
          className="
            text-4xl
            font-semibold
            tracking-tight
          "
        >
          Utilisateurs
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          Gérez les comptes utilisateurs.
        </p>
        <p
          className="
            mt-4
            text-sm
            text-muted-foreground
          "
        >
          {total} utilisateur
          {total > 1
            ? "s"
            : ""}
        </p>
      </div>

      <AdminUsersFilters search={search} status={status}/>

      <AdminUsersTable users={users} />

      <AdminPagination page={page} pages={pages}/>
    </main>
  );
}