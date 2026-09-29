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
      "manageRoles"
    );

  const {
    priority,
  } =
    await request.json();

  await prisma.userRole.update({
    where: {
      id: params.id,
    },

    data: {
      priority:
        Number(priority),
    },
  });

  await audit({
    userId:
      session.user.id,

    action:
      "ROLE_UPDATED",

    metadata: {
      roleId:
        params.id,
      priority,
    },
  });

  return NextResponse.json({
    success: true,
  });
}