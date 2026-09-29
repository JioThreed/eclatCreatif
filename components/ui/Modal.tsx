"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
}: Props) {
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        left-0
        top-0
        h-screen
        w-screen
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        overflow-y-auto
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-border
          bg-card
          p-8
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            text-xl
            text-muted-foreground
            hover:text-foreground
          "
        >
          ×
        </button>

        {title && (
          <h2
            className="
              mb-6
              text-2xl
              font-semibold
              tracking-tight
            "
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}