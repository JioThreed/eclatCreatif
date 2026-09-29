import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function getUserOrThrow(
  id: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        roleRelation: true,
      },
    });

  if (!user) {
    throw new Error(
      "USER_NOT_FOUND"
    );
  }

  return user;
}

export function ensureNotSelf(
  currentUserId: string,
  targetUserId: string
) {
  if (
    currentUserId ===
    targetUserId
  ) {
    throw new Error(
      "SELF_OPERATION"
    );
  }
}

export function ensureNotDeleted(
  user: {
    deletedAt: Date | null;
  }
) {
  if (user.deletedAt) {
    throw new Error(
      "USER_ALREADY_DELETED"
    );
  }
}

export function ensureDeleted(
  user: {
    deletedAt: Date | null;
  }
) {
  if (!user.deletedAt) {
    throw new Error(
      "USER_NOT_DELETED"
    );
  }
}

export async function ensureLastAdministrator(
  roleId: string
) {
  const admins =
    await prisma.user.count({
      where: {
        roleId,
        isActive: true,
        deletedAt: null,
      },
    });

  if (admins <= 1) {
    throw new Error(
      "LAST_ADMIN"
    );
  }
}

export function handleValidationError(
  error: unknown
): never {
  if (
    error instanceof Error
  ) {
    throw error;
  }

  redirect("/");
}