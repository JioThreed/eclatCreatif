import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { audit } from "@/lib/audit";
import { isSuperAdmin } from "@/lib/rbac";

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

  const body =
    await request.json();

  const role =
    await prisma.userRole.findUnique({
      where: {
        id: body.roleId,
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
          "Impossible de modifier ce rôle",
      },
      {
        status: 403,
      }
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: params.id,
      },

      include: {
        roleRelation: true,
      }
    });

  if (!user) {
    return NextResponse.json(
      {
        error:
          "Utilisateur introuvable",
      },
      {
        status: 404,
      }
    );
  }

  if (
    user.id === session.user.id
  ) {
    return NextResponse.json(
      {
        error:
          "Impossible de modifier votre propre rôle",
      },
      {
        status: 400,
      }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      roleId: role.id,
    },
  });

  await audit({
    userId: session.user.id,

    action:
      "USER_ROLE_UPDATED",

    metadata: {
      targetUserId: user.id,

      oldRoleId:
          user.roleId,

      newRoleId:
          role.id,

      oldRoleName:
          user.roleRelation?.label,

      newRoleName:
          role.label,
    },
  });

  return NextResponse.json({
    success: true,
  });
}