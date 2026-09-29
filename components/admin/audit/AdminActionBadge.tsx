type Props = {
  action: string;
};

export default function AdminActionBadge({
  action,
}: Props) {
  const colors: Record<
    string,
    string
  > = {
    LOGIN_SUCCESS:
      "bg-green-100 text-green-700",

    LOGIN_RATE_LIMIT:
      "bg-red-100 text-red-700",

    USER_DISABLED:
      "bg-red-100 text-red-700",

    USER_ENABLED:
      "bg-green-100 text-green-700",

    USER_SUSPENDED:
      "bg-yellow-100 text-yellow-700",

    USER_UNSUSPENDED:
      "bg-green-100 text-green-700",

    USER_SOFT_DELETED:
      "bg-red-100 text-red-700",

    USER_RESTORED:
      "bg-green-100 text-green-700",

    ROLE_CREATED:
      "bg-blue-100 text-blue-700",

    ROLE_UPDATED:
      "bg-blue-100 text-blue-700",

    ROLE_DELETED:
      "bg-red-100 text-red-700",

    SESSION_REVOKED:
      "bg-yellow-100 text-yellow-700",

    PASSWORD_RESET:
      "bg-purple-100 text-purple-700",

    PASSWORD_RESET_REQUEST:
      "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${colors[action] ??
          "bg-muted"}
      `}
    >
      {action}
    </span>
  );
}