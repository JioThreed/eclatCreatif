import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import { sendResetPasswordEmail } from "@/lib/email";

import { NextResponse } from "next/server";
import { audit } from "@/lib/audit";
import * as Sentry from "@sentry/nextjs";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const email =
      body.email;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json({
        message:
          "Si cette adresse existe, un email a été envoyé.",
      });
    }

    const token =
      generateToken();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken:
          token,

        resetPasswordTokenExpiresAt:
          new Date(
            Date.now() +
              60 *
                60 *
                1000
          ),
      },
    });

    await sendResetPasswordEmail(
      email,
      token
    );

    await audit({
      userId: user.id,
      action: "PASSWORD_RESET_REQUEST",
    });

    return NextResponse.json({
      message:
        "Si cette adresse existe, un email a été envoyé.",
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