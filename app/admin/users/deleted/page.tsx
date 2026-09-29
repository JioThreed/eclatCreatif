import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminPagination from "@/components/admin/shared/AdminPagination";
import AdminDeletedUsersFilters from "@/components/admin/deleted-users/AdminDeletedUsersFilters";
import AdminDeletedUsersTable from "@/components/admin/deleted-users/AdminDeletedUsersTable";

export default async function DeletedUsersPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string
  };
}) {
  await requirePermission(
    "manageUsers"
  );

  const search =
    searchParams.search ?? "";

  const page =
  Number(
    searchParams.page ??
    "1"
  );

  const take = 25;

  const skip = (page - 1) * take;

  const where: Prisma.UserWhereInput = {
    deletedAt: {
        not: null,
    },

    ...(search
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
        : {}),
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

                deletedAt: true,
                deletedReason: true,

                roleRelation: {
                select: {
                    label: true,
                },
                },

                deletedBy: {
                select: {
                    username: true,
                    email: true,
                },
                },
            },

            orderBy: {
                deletedAt: "desc",
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
          Corbeille
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-muted-foreground
          "
        >
          {total} comptes supprimés. Suppression définitive après 30 jours.
        </p>
      </div>

      <AdminDeletedUsersFilters search={search}/>

      <AdminDeletedUsersTable users={users}/>
      
      <AdminPagination page={page} pages={pages}/>
    </main>
  );
}