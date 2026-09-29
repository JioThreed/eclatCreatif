import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminRolesTable from "@/components/admin/AdminRolesTable";
import AdminRoleFilters from "@/components/admin/AdminRoleFilters";
import AdminPagination from "@/components/admin/shared/AdminPagination";

export default async function RolesPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    sort?: string;
    page?: string
  };
}) {
  await requirePermission("manageRoles");

  const search =
    searchParams.search ?? "";

  const sort =
    searchParams.sort ??
    "priority";

  const page =
    Number(
      searchParams.page ?? "1"
    );

  const take = 25;

  const skip =
    (page - 1) * take;

  const where: Prisma.UserRoleWhereInput =
    search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },

            {
              label: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
    : {};

  const orderBy =
    sort === "name"
      ? {
          name: "asc" as const,
        }
      : {
          priority:
            "asc" as const,
        };

  const [roles, total] =
    await Promise.all([
      prisma.userRole.findMany({
        where,
        take,
        skip,

        include: {
          _count: {
            select: {
              users: true,
            },
          },
        },

        orderBy,
      }),

      prisma.userRole.count({
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
          Rôles
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          Gestion des rôles et permissions.
        </p>
      </div>

      <AdminRoleFilters search={search} sort={sort}/>

      <AdminRolesTable roles={roles}/>

      <AdminPagination page={page} pages={pages}/>
    </main>
  );
}