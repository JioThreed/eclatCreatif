import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { audit } from "@/lib/audit";

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

  const session = await requirePermission("manageUsers");

  const user =
    await prisma.user.findUnique({
      where: {
        id: params.id,
      },
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

  if (user.id === session?.user.id) {
    return NextResponse.json(
        {
        error:
            "Vous ne pouvez pas modifier votre propre compte",
        },
        {
        status: 400,
        }
    );
  }

  const superAdmins =
    await prisma.user.count({
        where: {
            roleRelation: {
                priority: 0,
            },
            isActive: true,
        },
    });

  if (
    user.isActive &&
    superAdmins <= 1
    ) {
    return NextResponse.json(
        {
        error:
            "Impossible de désactiver le dernier super administrateur",
        },
        {
        status: 400,
        }
    );
  }

  const updatedUser =
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        isActive:
          !user.isActive,
      },
    });

  await audit({
    userId: session?.user.id,

    action:
        updatedUser.isActive
        ? "USER_ENABLED"
        : "USER_DISABLED",

    metadata: {
        targetUserId:
        user.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}