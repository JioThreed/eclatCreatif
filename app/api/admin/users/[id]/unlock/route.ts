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

  if (
    user.id === session.user.id
  ) {
    return NextResponse.json(
      {
        error:
          "Impossible de vous débloquer vous même",
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
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  await audit({
    userId: session.user.id,

    action: "USER_ENABLED",

    metadata: {
      targetUserId:
        user.id,

      operation:
        "unlock_account",
    },
  });

  return NextResponse.json({
    success: true,
  });
}