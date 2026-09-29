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
  const session =
    await requirePermission(
      "manageUsers"
    );

  const user =
    await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

  if (
    !user ||
    !user.deletedAt
  ) {
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

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      deletedAt: null,
      deletedById: null,
      deletedReason: null,
      scheduledDeletionAt:
        null,

      isActive: true,
    },
  });

  await audit({
    userId:
      session.user.id,

    action:
      "USER_RESTORED",

    metadata: {
      targetUserId:
        user.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}