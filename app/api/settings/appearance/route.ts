import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

import {
  THEMES,
  ACCENT_COLORS,
} from "@/lib/theme";

export async function POST(
  request: Request
) {
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

  const {
    theme,
    accentColor,
  } = body;

  if (
    !THEMES.includes(theme)
  ) {
    return NextResponse.json(
      {
        error:
          "Thème invalide",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !ACCENT_COLORS.includes(
      accentColor
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Couleur invalide",
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
      theme,
      accentColor,
    },
  });

  await audit({
    userId:
      session.user.id,

    action:
      "APPEARANCE_UPDATED",

    metadata: {
      theme,
      accentColor,
    },
  });

  return NextResponse.json({
    success: true,
  });
}