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

  const body =
    await request.json();

  const reason =
    body.reason;

  if (
    typeof reason !== "string" ||
    !reason.trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Motif obligatoire",
      },
      {
        status: 400,
      }
    );
  }

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
          "Impossible de vous suspendre vous même",
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
      suspendedAt:
        new Date(),

      suspendedById:
        session.user.id,

      suspendedReason:
        reason,
    },
  });

  await audit({
    userId: session.user.id,

    action:
      "USER_SUSPENDED",

    metadata: {
      targetUserId:
        user.id,

      reason,
    },
  });

  return NextResponse.json({
    success: true,
  });
}