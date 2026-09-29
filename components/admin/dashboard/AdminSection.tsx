import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function AdminSection({
  title,
  children,
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <h2
        className="
          mb-6
          text-xl
          font-semibold
        "
      >
        {title}
      </h2>

      {children}
    </section>
  );
}