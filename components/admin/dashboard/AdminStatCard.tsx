type Props = {
  title: string;
  value: number;
};

export default function AdminStatCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-3xl
          font-semibold
        "
      >
        {value}
      </p>
    </div>
  );
}