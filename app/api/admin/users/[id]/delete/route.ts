import { NextResponse } from "next/server";

import { audit } from "@/lib/audit";
import { requirePermission } from "@/lib/permissions";

import {
  getUserOrThrow,
  ensureNotSelf,
  ensureNotDeleted,
} from "@/lib/user-validation";

import {
  softDeleteUser,
} from "@/lib/users";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {

  try {

    const session =
      await requirePermission(
        "manageUsers"
      );

    const body =
      await request.json();

    const user =
      await getUserOrThrow(
        params.id
      );

    ensureNotSelf(
      session.user.id,
      user.id
    );

    ensureNotDeleted(
      user
    );

    await softDeleteUser({
      userId: user.id,

      deletedById:
        session.user.id,

      reason:
        body.reason,
    });

    await audit({
      userId:
        session.user.id,

      action:
        "USER_SOFT_DELETED",

      metadata: {
        targetUserId:
          user.id,

        reason:
          body.reason,
      },
    });

    return NextResponse.json({
      success: true,
    });

  }

  catch (error) {

    if (
      error instanceof Error
    ) {

      switch (error.message) {

        case "USER_NOT_FOUND":

          return NextResponse.json(
            {
              error:
                "Utilisateur introuvable",
            },
            {
              status:404,
            }
          );

        case "SELF_OPERATION":

          return NextResponse.json(
            {
              error:
                "Impossible de supprimer votre propre compte",
            },
            {
              status:400,
            }
          );

        case "USER_ALREADY_DELETED":

          return NextResponse.json(
            {
              error:
                "Utilisateur déjà supprimé",
            },
            {
              status:400,
            }
          );

      }

    }

    return NextResponse.json(
      {
        error:
          "Erreur serveur",
      },
      {
        status:500,
      }
    );

  }

}