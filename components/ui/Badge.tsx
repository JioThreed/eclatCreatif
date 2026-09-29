type Props = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: Props) {
  const variants = {
    default:
      "border-border bg-muted text-foreground",

    success:
      "border-green-500/20 bg-green-500/10 text-green-600",

    warning:
      "border-orange-500/20 bg-orange-500/10 text-orange-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}