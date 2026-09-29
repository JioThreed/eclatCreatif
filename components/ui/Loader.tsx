type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Loader({
  size = "md",
  className = "",
}: Props) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  return (
    <span
      className={`
        inline-block
        animate-spin
        rounded-full
        border-2
        border-current
        border-t-transparent
        ${sizes[size]}
        ${className}
      `}
    />
  );
}