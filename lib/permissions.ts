import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getAdminSession() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/");
  }

  return session;
}

export async function getCurrentRole() {
    const session = await getAdminSession();

    const role =
        await prisma.userRole.findUnique({
            where: {
                id: session.user.roleRelation?.id,
            },
        });

    if (!role) {
        redirect("/");
    }

    return role;
}

export async function requirePermission(
  permission: string
) {
  const session =
    await getAdminSession();

  const role = await getCurrentRole();

  if (!role) {
    redirect("/");
  }

  const permissions =
  (role.permissions ??
    {}) as Record<
      string,
      boolean
    >;

  if (
    !permissions.all &&
    !permissions[permission]
  ) {
    redirect("/");
  }

  return session;
}