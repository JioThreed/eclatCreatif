import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getUsernameError } from "@/lib/validation";
import * as Sentry from "@sentry/nextjs";
import { audit } from "@/lib/audit";

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
          error: "Non autorisé",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const username =
      body.username?.trim();

    const usernameError =
      getUsernameError(
        username
      );

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

    const existingUser =
      await prisma.user.findUnique({
        where: {
          username,
        },
      });

    if (
      existingUser &&
      existingUser.id !==
        session.user.id
    ) {
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

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username,
      },
    });

    await audit({
      userId:
        session.user.id,

      action:
        "PROFILE_UPDATED",

      metadata: {
        username,
      },
    });

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