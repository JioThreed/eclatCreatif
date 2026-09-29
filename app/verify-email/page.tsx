import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const token =
    params.token;

  if (!token) {
    return (
      <main className="p-6">
        Lien invalide.
      </main>
    );
  }

  const user =
    await prisma.user.findFirst({
      where: {
        verificationToken:
          token,
      },
    });

  if (!user) {
    return (
      <main className="p-6">
        Lien invalide ou expiré.
      </main>
    );
  }

  if (
    !user.verificationTokenExpiresAt ||
    user.verificationTokenExpiresAt <
      new Date()
  ) {
    return (
      <main className="p-6">
        Ce lien de validation a expiré.
      </main>
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified:
        new Date(),

      verificationToken:
        null,

      verificationTokenExpiresAt:
        null,
    },
  });

  await audit({
    userId: user.id,
    action: "EMAIL_VERIFIED",
  });

  return (
    <main className="mx-auto mt-10 max-w-md text-center">
      <h1 className="text-2xl font-bold">
        Adresse email vérifiée 🎉
      </h1>

      <p className="mt-4">
        Votre compte est maintenant
        activé.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Vous pouvez maintenant vous
        connecter à votre compte.
      </p>

      <a
        href="/"
        className="mt-6 inline-block rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Retour à l'accueil
      </a>
    </main>
  );
}