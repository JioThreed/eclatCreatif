import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";

import AdminRoleOverview from "@/components/admin/AdminRoleOverview";
import AdminRolePermissions from "@/components/admin/AdminRolePermissions";
import AdminRoleUsers from "@/components/admin/AdminRoleUsers";
import AdminRoleActions from "@/components/admin/AdminRoleActions";
import AdminRoleHistory from "@/components/admin/AdminRoleHistory";

type Props = {
  params: {
    id: string;
  };
};

export default async function RolePage({
  params,
}: Props) {
  await requirePermission("manageRoles");

  const [role, logs] =
    await Promise.all([
      prisma.userRole.findUnique({
        where: {
          id: params.id,
        },

        include: {
          users: {
            select: {
              id: true,
              username: true,
              email: true,
              roleRelation: {
                select: {
                  id: true,
                  label: true,
                  priority: true,
                },
              },
            },
          },
        },
      }),

      prisma.auditLog.findMany({
        where: {
          OR: [
            {
              action:
                "ROLE_UPDATED",
            },
            {
              action:
                "ROLE_DELETED",
            },
            {
              action:
                "ROLE_CREATED",
            },
          ],

          metadata: {
            path: [
              "roleId",
            ],
            equals:
              params.id,
          },
        },

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

        take: 20,
      }),
    ]);

  if (!role) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-8 py-10">
      <h1 className="text-4xl font-semibold">
        {role.label}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {role.description}
      </p>
      
      <div className="grid gap-6">

        <AdminRoleOverview
          role={role}
        />

        <AdminRolePermissions
          roleId={role.id}
          permissions={
            role.permissions as Record<
              string,
              boolean
            >
          }
        />

        <AdminRoleUsers users={role.users}/>

        <AdminRoleHistory logs={logs}/>

        <AdminRoleActions roleId={role.id}/>

      </div>
    </main>
  );
}