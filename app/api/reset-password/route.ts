import { prisma } from "@/lib/prisma";

import {
  getPasswordError,
  getConfirmPasswordError,
} from "@/lib/validation";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { audit } from "@/lib/audit";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      token,
      password,
      confirmPassword,
    } = body;

    if (!token) {
      return NextResponse.json(
        {
          error:
            "Lien invalide.",
        },
        {
          status: 400,
        }
      );
    }

    const passwordError =
      getPasswordError(
        password
      );

    if (passwordError) {
      return NextResponse.json(
        {
          error:
            passwordError,
        },
        {
          status: 400,
        }
      );
    }

    const confirmError =
      getConfirmPasswordError(
        password,
        confirmPassword
      );

    if (confirmError) {
      return NextResponse.json(
        {
          error:
            confirmError,
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findFirst({
        where: {
          resetPasswordToken:
            token,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Lien invalide.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !user.resetPasswordTokenExpiresAt ||
      user.resetPasswordTokenExpiresAt <
        new Date()
    ) {
      return NextResponse.json(
        {
          error:
            "Ce lien a expiré.",
        },
        {
          status: 400,
        }
      );
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,

        resetPasswordToken:
          null,

        resetPasswordTokenExpiresAt:
          null,
      },
    });

    await audit({
      userId: user.id,

      action:
        "PASSWORD_RESET",
    });

    return NextResponse.json({
      success: true,

      message:
        "Mot de passe modifié avec succès.",
    });
  } catch (error) {
    logger.error(
      "Reset password failed",
      {
        error,
      }
    );

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue.",
      },
      {
        status: 500,
      }
    );
  }
}