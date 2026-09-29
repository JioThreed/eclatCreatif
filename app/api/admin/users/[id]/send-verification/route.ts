import { NextResponse } from "next/server";

import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { sendVerificationEmail } from "@/lib/email";
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
    !user.email
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

  const token =
    crypto.randomUUID();

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      verificationToken:
        token,

      verificationTokenExpiresAt:
        new Date(
          Date.now() +
          24 *
          60 *
          60 *
          1000
        ),
    },
  });

  await sendVerificationEmail(
    user.email,
    token
  );

  await audit({
    userId:
      session.user.id,

    action:
      "EMAIL_VERIFICATION_SENT",

    metadata: {
      targetUserId:
        user.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}