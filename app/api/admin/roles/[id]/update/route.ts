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

  const {
    label,
    description,
  } = await request.json();

  if (!label?.trim()) {
    return NextResponse.json(
        {
        error: "Libellé requis",
        },
        {
        status: 400,
        }
    );
  }

  if (label.length > 100) {
    return NextResponse.json(
        {
        error:
            "Libellé trop long",
        },
        {
        status: 400,
        }
    );
  }

  if (
    description &&
    description.length > 1000
  ) {
    return NextResponse.json(
        {
        error:
            "Description trop longue",
        },
        {
        status: 400,
        }
    );
  }

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
        label,
        description,
    },
  });

  await audit({
    userId: session.user.id,

    action: "ROLE_UPDATED",

    metadata: {
        roleId: params.id,
        label,
        description,
    },
  });

  return NextResponse.json({
    success: true,
  });
}