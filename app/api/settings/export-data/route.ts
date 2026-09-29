import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    return Response.json(
      {
        error: "Non autorisé",
      },
      {
        status: 401,
      }
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        roleRelation: {
            select: {
                id: true,
                label: true,
            },
        },
        theme: true,
        accentColor: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
      },
    });

  const auditLogs =
    await prisma.auditLog.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const loginHistory =
    await prisma.loginHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return Response.json({
    user,
    auditLogs,
    loginHistory,
  });
}