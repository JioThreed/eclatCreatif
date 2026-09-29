import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-border
        bg-background/80
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          h-16
          px-6
          items-center
          justify-between
        "
      >
        <Link
          href="/"
          className="text-xl font-bold"
        >
          {process.env.NEXT_PUBLIC_APP_NAME ?? "Mon Site"}
        </Link>

        <AuthButton />
      </div>
    </header>
  );
}