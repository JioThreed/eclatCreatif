type Props = {
  type: "error" | "success";
  children: React.ReactNode;
  className?: string;
};

export default function Alert({
  type,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-xl
        border
        p-3
        text-sm

        ${
          type === "error"
            ? "border-red-500/20 bg-red-500/10 text-red-500"
            : "border-green-500/20 bg-green-500/10 text-green-600"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}