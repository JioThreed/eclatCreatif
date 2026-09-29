"use client";

import Modal from "@/components/ui/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AuthModal({
  open,
  onClose,
  children,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
}