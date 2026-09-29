import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

  const history =
    await prisma.loginHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

  return NextResponse.json(
    history
  );
}