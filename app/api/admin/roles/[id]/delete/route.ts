import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { audit } from "@/lib/audit";
import { isSuperAdmin } from "@/lib/rbac";
import { canDeleteRole } from "@/lib/rbac";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await requirePermission("manageRoles");

  const role =
    await prisma.userRole.findUnique({
      where: {
        id: params.id,
      },
    });

  if (!role) {
    return NextResponse.json(
      {
        error:
          "Rôle introuvable",
      },
      {
        status: 404,
      }
    );
  }

  if (isSuperAdmin(role)) {
    return NextResponse.json(
      {
        error:
          "Impossible de supprimer ce rôle",
      },
      {
        status: 403,
      }
    );
  }

  const roleCount =
    await prisma.userRole.count();

  if (roleCount <= 1) {
    return NextResponse.json(
      {
        error:
          "Impossible de supprimer le dernier rôle",
      },
      {
        status: 400,
      }
    );
  }

  const currentRole =
    await prisma.userRole.findUnique({
        where: {
        id:
            session.user
            .roleRelation?.id,
        },
    });

  if (
    !currentRole ||
    !canDeleteRole(
        currentRole,
        role
    )
    ) {
    return NextResponse.json(
        {
        error:
            "Permissions insuffisantes",
        },
        {
        status: 403,
        }
    );
  }

  // On réaffecte au rôle le moins privilégié.
  const fallbackRole =
  await prisma.userRole.findFirst({
    where: {
      id: {
        not: role.id,
      },
    },

    orderBy: {
      priority: "desc",
    },
  });

  if (!fallbackRole) {
    return NextResponse.json(
      {
        error:
          "Aucun rôle de secours",
      },
      {
        status: 500,
      }
    );
  }

  await prisma.$transaction([
    prisma.user.updateMany({
      where: {
        roleId: role.id,
      },

      data: {
        roleId:
          fallbackRole.id,
      },
    }),

    prisma.userRole.delete({
      where: {
        id: role.id,
      },
    }),
  ]);

  await audit({
    userId: session.user.id,

    action:
      "ROLE_DELETED",

    metadata: {
      roleId: role.id,
      roleName: role.name,
    },
  });

  return NextResponse.json({
    success: true,
  });
}