import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { sendVerificationEmail } from "@/lib/email";

export async function GET(
  request: Request
) {
  const authHeader =
    request.headers.get(
      "authorization"
    );

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  
  const startedAt = Date.now();

  try {    
    logger.info(
    "Cron started"
    );

    await prisma.user.updateMany({
      where: {
        verificationTokenExpiresAt: {
          lt: new Date(),
        },
      },

      data: {
        verificationToken: null,
        verificationTokenExpiresAt:
          null,
      },
    });

    logger.info(
    "Expired verification tokens cleaned"
    );

    await prisma.user.updateMany({
      where: {
        resetPasswordTokenExpiresAt: {
          lt: new Date(),
        },
      },

      data: {
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt:
          null,
      },
    });

    logger.info(
    "Expired password reset tokens cleaned"
    );

    const sixMonthsAgo =
    new Date();

    sixMonthsAgo.setMonth(
    sixMonthsAgo.getMonth() - 6
    );

    const deletedAuditLogs =
    await prisma.auditLog.deleteMany({
        where: {
        createdAt: {
            lt: sixMonthsAgo,
        },
        },
    });

    logger.info(
    "Audit logs cleaned",
    {
        count:
        deletedAuditLogs.count,
    }
    );

    const users =
    await prisma.user.findMany({
        where: {
        emailVerified: null,

        createdAt: {
            lt: new Date(
            Date.now() -
            24 * 60 * 60 * 1000
            ),
        },

        verificationToken: {
            not: null,
        },

        verificationReminderSentAt: null,
        },
    });

    for (const user of users) {
        await sendVerificationEmail(
            user.email!,
            user.verificationToken!
        );

        await prisma.user.update({
            where: {
            id: user.id,
            },
            data: {
            verificationReminderSentAt:
                new Date(),
            },
        });
    }

    logger.info(
    "Verification reminders sent",
    {
        count: users.length,
    }
    );

    const thirtyDaysAgo =
    new Date();

    thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30
    );

    const deletedUsers = await prisma.user.deleteMany({
    where: {
        emailVerified: null,

        createdAt: {
        lt: thirtyDaysAgo,
        },
    },
    });

    logger.info(
    "Inactive accounts deleted",
    {
        count:
        deletedUsers.count,
    }
    );

    const usersToDelete =
      await prisma.user.findMany({
        where: {
          deletedAt: {
            not: null,
          },

          scheduledDeletionAt: {
            lte: new Date(),
          },
        },

        select: {
          id: true,
          email: true,
        },
      });

    for (const user of usersToDelete) {
      logger.info(
        "Permanently deleting user",
        {
          userId: user.id,
          email: user.email,
        }
      );
    }

    const permanentlyDeletedUsers =
      await prisma.user.deleteMany({
        where: {
          deletedAt: {
            not: null,
          },

          scheduledDeletionAt: {
            lte: new Date(),
          },
        },
      });

    logger.info(
      "Soft deleted accounts purged",
      {
        count:
          permanentlyDeletedUsers.count,
      }
    );

    const oneYearAgo =
    new Date();

    oneYearAgo.setFullYear(
        oneYearAgo.getFullYear() - 1
    );

    const deletedLoginHistory =
    await prisma.loginHistory.deleteMany({
        where: {
        createdAt: {
            lt: oneYearAgo,
        },
        },
    });

    logger.info(
        "Login history cleaned",
        {
            count:
            deletedLoginHistory.count,
        }
    );

    logger.info(
      "Cron completed"
    );

    await prisma.cronExecution.create({
      data: {
        job: "cleanup",
        status: "SUCCESS",
        durationMs:
          Date.now() - startedAt,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    Sentry.captureException(error, {
        tags: {
            job: "cron",
        },
    });

    await prisma.systemEvent.create({
      data: {
        level: "ERROR",
        source: "cron",
        message: "Cron failed",

        metadata: {
          error:
            error instanceof Error
              ? error.message
              : String(error),
        },
      },
    });

    logger.error(
      "Cron failed",
      {
        error,
      }
    );

    await prisma.cronExecution.create({
      data: {
        job: "cleanup",
        status: "FAILED",

        durationMs:
          Date.now() - startedAt,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
    });

    return NextResponse.json(
      {
        error:
          "Cron failed",
      },
      {
        status: 500,
      }
    );
  }
}