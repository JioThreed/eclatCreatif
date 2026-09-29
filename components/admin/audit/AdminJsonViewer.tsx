"use client";

import { useState } from "react";

type Props = {
  value: unknown;
};

export default function AdminJsonViewer({
  value,
}: Props) {
  const [open, setOpen] =
    useState(false);

  if (!value) {
    return (
      <span className="text-muted-foreground">
        —
      </span>
    );
  }

  return (
    <div>
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          text-primary
          text-sm
          hover:underline
        "
      >
        {open
          ? "Masquer"
          : "Afficher"}
      </button>

      {open && (
        <pre
          className="
            mt-2
            overflow-x-auto
            rounded-xl
            bg-muted
            p-3
            text-xs
          "
        >
          {JSON.stringify(
            value,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}