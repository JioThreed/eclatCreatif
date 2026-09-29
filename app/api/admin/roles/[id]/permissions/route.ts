import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { audit } from "@/lib/audit";
import { isSuperAdmin } from "@/lib/rbac";

import type {RolePermissions} from "@/types/permissions";

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

  const body = await request.json();

  const permissions: RolePermissions = {
      manageUsers:
          Boolean(
              body.permissions.manageUsers
          ),

      manageRoles:
          Boolean(
              body.permissions.manageRoles
          ),

      manageSettings:
          Boolean(
              body.permissions.manageSettings
          ),

      moderateUsers:
          Boolean(
              body.permissions.moderateUsers
          ),

      all:
          Boolean(
              body.permissions.all
          ),
  };

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
          "Impossible de modifier ce rôle",
      },
      {
        status: 403,
      }
    );
  }

  await prisma.userRole.update({
    where: {
      id: params.id,
    },

    data: {
      permissions,
    },
  });

  await audit({
    userId: session.user.id,

    action: "ROLE_UPDATED",

    metadata: {
      roleId: params.id,
      permissions,
    },
  });

  return NextResponse.json({
    success: true,
  });
}