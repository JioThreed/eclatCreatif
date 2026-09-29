"use client";

import { useEffect } from "react";

type Props = {
  accentColor: string;
};

export default function AccentSync({
  accentColor,
}: Props) {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-accent",
      accentColor
    );
  }, [accentColor]);

  return null;
}