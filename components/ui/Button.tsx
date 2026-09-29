import { ButtonHTMLAttributes } from "react";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "destructive" | "success" | "warning" | "ghost";
    className?: string;
  };

export default function Button({
  className = "",
  variant = "primary",
  children,
  onClick,
  disabled,
  type = "button",
}: Props) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground",

    secondary:
      "border border-border bg-transparent text-foreground",

    destructive:
        "bg-red-600 text-white hover:bg-red-700",

    success:
        "bg-green-600 text-white hover:bg-green-700",

    warning:
        "bg-yellow-500 text-black hover:bg-yellow-600",

    ghost:
        "bg-transparent hover:bg-muted",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        px-4
        py-2
        transition
        hover:opacity-90
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}