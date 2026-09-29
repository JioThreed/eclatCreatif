"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & {digest?: string;};}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html>
      <body>
        <main className="p-8">
          <h1>
            Erreur critique
          </h1>

          <p>
            L'application a rencontré une erreur inattendue.
          </p>

          {error.digest && (
            <p className="mt-2 text-sm text-muted-foreground">
              Référence : {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}