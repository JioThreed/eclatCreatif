import { Resend } from "resend";
import { config } from "@/lib/config";

export const resend =
  new Resend(
    config.resendApiKey
  );

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verificationUrl =
    `${config.appUrl}/verify-email?token=${token}`;

  await resend.emails.send({
    from:
      "onboarding@resend.dev",

    to: email,

    subject:
      "Vérification de votre adresse email",

    html: `
      <h1>Bienvenue sur ${process.env.NEXT_PUBLIC_APP_NAME ?? "Mon Site"}</h1>

      <p>
        Cliquez sur le lien suivant pour
        valider votre adresse email :
      </p>

      <p>
        <a href="${verificationUrl}">
          Vérifier mon adresse email
        </a>
      </p>
    `,
  });
}

export async function sendResetPasswordEmail(
  email: string,
  token: string
) {
  const url =
    `${config.appUrl}/reset-password?token=${token}`;

  await resend.emails.send({
    from:
      "onboarding@resend.dev",

    to: email,

    subject:
      "Réinitialisation du mot de passe",

    html: `
      <h1>Réinitialisation du mot de passe</h1>

      <p>
        Cliquez sur le lien ci-dessous :
      </p>

      <a href="${url}">
        Réinitialiser mon mot de passe
      </a>
    `,
  });
}