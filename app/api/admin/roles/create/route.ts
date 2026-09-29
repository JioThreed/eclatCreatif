import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { audit } from "@/lib/audit";

export async function POST(
  request: Request
) {
  const session = await requirePermission("manageRoles");

  const body =
    await request.json();

  const name =
    String(body.name ?? "")
      .trim()
      .toUpperCase();

  const priority =
    Number(body.priority);

  const label =
    String(body.label ?? "")
      .trim();

const description =
  String(
    body.description ?? ""
  ).trim();

  if (!name) {
    return NextResponse.json(
      {
        error:
          "Nom invalide",
      },
      {
        status: 400,
      }
    );
  }

  const existingRole =
    await prisma.userRole.findUnique({
      where: {
        name,
      },
    });

  if (existingRole) {
    return NextResponse.json(
      {
        error:
          "Ce rôle existe déjà",
      },
      {
        status: 400,
      }
    );
  }

  await prisma.userRole.create({
    data: {
      name,
      label,
      description,
      priority,
      permissions: {},
    },
  });

  await audit({
    userId:
      session.user.id,

    action:
      "ROLE_CREATED",

    metadata: {
      createdRole:
        name,
    },
  });

  return NextResponse.json({
    success: true,
  });
}