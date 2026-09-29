export const THEMES = [
  "light",
  "dark",
  "system",
] as const;

export type Theme =
  (typeof THEMES)[number];

export const ACCENT_COLORS = [
  "blue",
  "green",
  "purple",
  "red",
  "orange",
] as const;

export type AccentColor =
  (typeof ACCENT_COLORS)[number];