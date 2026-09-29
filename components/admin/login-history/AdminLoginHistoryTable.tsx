type Props = {
  logs: {
    id: string;
    ip: string | null;
    userAgent: string | null;
    createdAt: Date;

    user: {
      username: string | null;
      email: string | null;
    };
  }[];
};

export default function AdminLoginHistoryTable({
  logs,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-border
            "
          >
            <th className="p-4 text-left">
              Utilisateur
            </th>

            <th className="p-4 text-left">
              IP
            </th>

            <th className="p-4 text-left">
              User Agent
            </th>

            <th className="p-4 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className="
                border-b
                border-border
              "
            >
              <td className="p-4">
                {log.user.username ??
                  log.user.email}
              </td>

              <td className="p-4">
                {log.ip ?? "—"}
              </td>

              <td className="p-4">
                {log.userAgent ??
                  "—"}
              </td>

              <td className="p-4 text-sm text-muted-foreground">
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </td>
            </tr>
          ))}

          {logs.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="
                  p-8
                  text-center
                  text-muted-foreground
                "
              >
                Aucun historique.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}