type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-border
        bg-card
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}