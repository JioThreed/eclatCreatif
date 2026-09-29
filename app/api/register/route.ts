import { prisma } from "@/lib/prisma";

import {
  getEmailError,
  getUsernameError,
  getPasswordError,
  getConfirmPasswordError,
} from "@/lib/validation";
import * as Sentry from "@sentry/nextjs";

import { generateToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { verifyTurnstileToken } from "@/lib/turnstile";
import { registerLimiter } from "@/lib/rate-limit";

import { logger } from "@/lib/logger";
import { audit } from "@/lib/audit";

export async function POST(
  request: Request
) {
  try {
    const ip =
      request.headers.get(
        "x-forwarded-for"
      ) ?? "unknown";

    const {
      success,
    } =
      await registerLimiter.limit(
        `register:${ip}`
      );

    if (!success) {
      return NextResponse.json(
        {
          error:
            "Trop de tentatives d'inscription. Réessayez plus tard.",
        },
        {
          status: 429,
        }
      );
    }

    const body =
      await request.json();

    const {
      email,
      username,
      password,
      confirmPassword,
      turnstileToken,
    } = body;

    if (!turnstileToken) {
      return NextResponse.json(
        {
          error:
            "Validation anti-bot manquante",
        },
        {
          status: 400,
        }
      );
    }

    const turnstileValid =
      await verifyTurnstileToken(
        turnstileToken
      );

    if (!turnstileValid) {
      return NextResponse.json(
        {
          error:
            "Échec de validation anti-bot",
        },
        {
          status: 403,
        }
      );
    } 

    const emailError =
      getEmailError(email);

    if (emailError) {
      return NextResponse.json(
        {
          error: emailError,
        },
        {
          status: 400,
        }
      );
    }

    const usernameError =
      getUsernameError(username);

    if (usernameError) {
      return NextResponse.json(
        {
          error: usernameError,
        },
        {
          status: 400,
        }
      );
    }

    const passwordError =
      getPasswordError(password);

    if (passwordError) {
      return NextResponse.json(
        {
          error: passwordError,
        },
        {
          status: 400,
        }
      );
    }

    const confirmPasswordError =
      getConfirmPasswordError(
        password,
        confirmPassword
      );

    if (
      confirmPasswordError
    ) {
      return NextResponse.json(
        {
          error:
            confirmPasswordError,
        },
        {
          status: 400,
        }
      );
    }

    const existingEmail =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingEmail) {
      return NextResponse.json(
        {
          error:
            "Cette adresse email est déjà utilisée",
        },
        {
          status: 400,
        }
      );
    }

    const existingUsername =
      await prisma.user.findUnique({
        where: {
          username,
        },
      });

    if (existingUsername) {
      return NextResponse.json(
        {
          error:
            "Ce pseudo est déjà utilisé",
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

    const verificationToken =
      generateToken();

    const verificationTokenExpiresAt =
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000
      ); // 24 heures

    await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        verificationToken,
        verificationTokenExpiresAt,
      },
    });

    logger.info(
      "User registered",
      {
        email,
        username,
      }
    );

    await audit({
      action: "REGISTER",

      ip,

      metadata: {
        email,
        username,
      },
    });

    await sendVerificationEmail(
      email,
      verificationToken
    );

    logger.info(
      "Verification email sent",
      {
        email,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    Sentry.captureException(error);

    logger.error(
      "Register failed",
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