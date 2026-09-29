import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import { audit } from "@/lib/audit";

import { NextResponse } from "next/server";

import * as Sentry from "@sentry/nextjs";

export async function POST() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error:
          "Non autorisé",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await audit({
        action: "ACCOUNT_DELETED",
        metadata: {
            email: session.user.email,
        },
    });

    await prisma.$transaction([
        prisma.auditLog.deleteMany({
            where: {
            userId: session.user.id,
            },
        }),

        prisma.user.delete({
            where: {
            id: session.user.id,
            },
        }),
    ]);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue",
      },
      {
        status: 500,
      }
    );
  }
}