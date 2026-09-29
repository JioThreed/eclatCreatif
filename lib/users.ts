import { prisma } from "@/lib/prisma";

export async function softDeleteUser(options: {
  userId: string;
  deletedById: string;
  reason?: string;
}) {
  return prisma.user.update({
    where: {
      id: options.userId,
    },

    data: {
      isActive: false,

      deletedAt: new Date(),

      deletedById: options.deletedById,

      deletedReason:
        options.reason ?? null,

      scheduledDeletionAt:
        new Date(
          Date.now() +
          30 *
          24 *
          60 *
          60 *
          1000
        ),
    },
  });
}

export async function restoreUser(
  userId: string
) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      isActive: true,

      deletedAt: null,

      deletedById: null,

      deletedReason: null,

      scheduledDeletionAt: null,
    },
  });
}

export async function hardDeleteUser(
  userId: string
) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function scheduleDeletion(
  userId: string,
  date: Date
) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      scheduledDeletionAt:
        date,
    },
  });
}

export async function cancelScheduledDeletion(
  userId: string
) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      scheduledDeletionAt:
        null,
    },
  });
}