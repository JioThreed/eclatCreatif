import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        mt-20
        border-t
        border-border
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-4
          px-6
          py-8
          text-sm
          text-muted-foreground
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <p>
          © {new Date().getFullYear()}
          {" "}
          {process.env.NEXT_PUBLIC_APP_NAME}
        </p>

        <div className="flex gap-6">
          <Link href="/privacy">
            Confidentialité
          </Link>

          <Link href="/terms">
            Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}