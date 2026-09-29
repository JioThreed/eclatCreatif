import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      timestamp:
        new Date().toISOString(),
    });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json(
      {
        status: "error",
        database:
          "disconnected",
      },
      {
        status: 500,
      }
    );
  }
}