"use client";

import { ReactNode } from "react";

type Props = {
  open: boolean;

  title: string;

  children: ReactNode;

  onClose(): void;
};

export default function Dialog({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-border
          bg-card
          p-6
          shadow-2xl
        "
      >
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-muted-foreground
              hover:text-foreground
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}