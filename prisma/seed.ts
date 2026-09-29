import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.userRole.upsert({
    where: {
      name: "SUPER_ADMIN",
    },

    update: {},

    create: {
      name: "SUPER_ADMIN",
      label: "Super Administrateur",
      description: "Accès complet aux permissions",
      priority: 0,
      permissions: {
        all: true,
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "ADMIN",
    },

    update: {},

    create: {
      name: "ADMIN",
      label: "Administrateur",
      description: "Accès complet au panneau d'administration",
      priority: 1,
      permissions: {
        manageUsers: true,
        manageRoles: true,
        manageSettings: true,
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "MODERATOR",
    },

    update: {},

    create: {
      name: "MODERATOR",
      label: "Modérateur",
      description: "Accès à la gestion des utilisateurs de la palteforme",
      priority: 2,
      permissions: {
        moderateUsers: true,
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      name: "USER",
    },

    update: {},

    create: {
      name: "USER",
      label: "Utilisateur",
      description: "Utilisateur de la plateforme",
      priority: 99,
      permissions: {},
    },
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });