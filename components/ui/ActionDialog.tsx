"use client";

import { useState } from "react";

import Dialog from "./Dialog";
import Button from "./Button";

type Props = {
  open: boolean;

  title: string;

  description: string;

  requireReason?: boolean;

  confirmLabel?: string;

  cancelLabel?: string;

  loading?: boolean;

  onClose(): void;

  onConfirm(
    reason?: string
  ): void | Promise<void>;
};

export default function ActionDialog({
  open,
  title,
  description,
  requireReason = false,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] =
    useState("");

  async function handleConfirm() {
    await onConfirm(reason);

    setReason("");

    onClose();
  }

  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
    >
      <div className="space-y-6">

        <p className="text-muted-foreground">
          {description}
        </p>

        {requireReason && (
          <div className="space-y-2">

            <label className="text-sm font-medium">
              Motif
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              rows={4}
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-3
                py-2
              "
            />

          </div>
        )}

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <Button
            variant="secondary"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>

          <Button
            variant="destructive"
            disabled={
              loading ||
              (
                requireReason &&
                !reason.trim()
              )
            }
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>

        </div>

      </div>
    </Dialog>
  );
}