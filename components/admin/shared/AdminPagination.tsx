"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  page: number;
  pages: number;
};

export default function AdminPagination({
  page,
  pages,
}: Props) {
  const params =
    useSearchParams();

  function makeUrl(
    target: number
  ) {
    const query =
      new URLSearchParams(
        params.toString()
      );

    query.set(
      "page",
      String(target)
    );

    return `?${query.toString()}`;
  }

  if (pages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        href={makeUrl(
          Math.max(
            page - 1,
            1
          )
        )}
        className="
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      >
        Précédent
      </Link>

      <span className="text-sm text-muted-foreground">
        Page {page} / {pages}
      </span>

      <Link
        href={makeUrl(
          Math.min(
            page + 1,
            pages
          )
        )}
        className="
          rounded-xl
          border
          border-border
          px-4
          py-2
        "
      >
        Suivant
      </Link>
    </div>
  );
}