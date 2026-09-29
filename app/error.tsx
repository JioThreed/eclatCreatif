"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold">
        Une erreur est survenue
      </h1>

      <p className="mt-4 text-muted-foreground">
        Quelque chose s'est mal passé.
      </p>

      <button
        onClick={reset}
        className="
          mt-6
          rounded-xl
          bg-primary
          px-4
          py-2
          text-primary-foreground
        "
      >
        Réessayer
      </button>
    </main>
  );
}