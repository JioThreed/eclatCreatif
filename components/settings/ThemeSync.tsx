"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

type Props = {
  theme: string;
};

export default function ThemeSync({
  theme,
}: Props) {
  const { setTheme } =
    useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return null;
}