import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import {
  getPasswordError,
  getConfirmPasswordError,
} from "@/lib/validation";
import * as Sentry from "@sentry/nextjs";

import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

import { audit } from "@/lib/audit";
import { logger } from "@/lib/logger";

export async function POST(
  request: Request
) {
  try {
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

    const body =
      await request.json();

    const {
      currentPassword,
      password,
      confirmPassword,
    } = body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

    if (
      !user ||
      !user.passwordHash
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

    const matches =
      await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

    if (!matches) {
      return NextResponse.json(
        {
          error:
            "Mot de passe actuel incorrect",
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

    const samePassword =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (samePassword) {
      return NextResponse.json(
        {
          error:
            "Le nouveau mot de passe doit être différent de l'ancien.",
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
      },
    });

    await audit({
      userId: user.id,
      action:
        "PASSWORD_CHANGED",
    });

    logger.info(
      "Password changed",
      {
        userId: user.id,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    Sentry.captureException(error);
    
    logger.error(
      "Password change failed",
      {
        error,
      }
    );

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