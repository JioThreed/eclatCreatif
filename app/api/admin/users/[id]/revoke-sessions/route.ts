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

  const deletedSessions =
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

  await audit({
    userId:
      session.user.id,

    action:
      "SESSION_REVOKED",

    metadata: {
      targetUserId:
        user.id,

      sessionsRevoked:
        deletedSessions.count,
    },
  });

  return NextResponse.json({
    success: true,
  });
}