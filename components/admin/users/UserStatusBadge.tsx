type Props = {
  isActive: boolean;
  suspendedById: string | null;
  suspendedAt: Date | null;
  suspendedReason: string | null;
};

export default function UserStatusBadge({
  isActive,
  suspendedAt,
}: Props) {
    if (!isActive) {
        return (
        <span
            className="
            rounded-full
            bg-red-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-red-500
            "
        >
            Désactivé
        </span>
        );
    }

    if (suspendedAt) {
        return (
        <span
            className="
            rounded-full
            bg-orange-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-orange-500
            "
        >
            Suspendu
        </span>
        );
    }

    return (
        <span
        className="
            rounded-full
            bg-green-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-green-500
        "
        >
        Actif
        </span>
    );
}