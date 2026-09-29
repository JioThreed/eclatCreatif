import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Meta =
  | Prisma.InputJsonValue
  | undefined;

function format(
  level: string,
  message: string,
  meta?: Meta
) {
  return {
    timestamp:
      new Date().toISOString(),

    level,
    message,

    ...(meta && { meta }),
  };
}

async function saveSystemEvent(
  level: string,
  message: string,
  meta?: Meta
) {
  if (
    process.env.MONITORING_ENABLED !==
    "true"
  ) {
    return;
  }

  try {
    await prisma.systemEvent.create({
      data: {
        level,
        source: "application",
        message,
        metadata: meta,
      },
    });
  } catch {
    // éviter une boucle infinie
  }
}

export const logger = {
  info(
    message: string,
    meta?: Meta
  ) {
    console.log(
      JSON.stringify(
        format(
          "INFO",
          message,
          meta
        )
      )
    );

    void saveSystemEvent(
      "INFO",
      message,
      meta
    );
  },

  warn(
    message: string,
    meta?: Meta
  ) {
    console.warn(
      JSON.stringify(
        format(
          "WARN",
          message,
          meta
        )
      )
    );

    void saveSystemEvent(
      "WARN",
      message,
      meta
    );
  },

  error(
    message: string,
    meta?: Meta
  ) {
    console.error(
      JSON.stringify(
        format(
          "ERROR",
          message,
          meta
        )
      )
    );

    void saveSystemEvent(
      "ERROR",
      message,
      meta
    );
  },
};