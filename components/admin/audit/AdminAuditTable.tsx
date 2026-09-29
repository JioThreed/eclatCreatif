import AdminActionBadge from "../AdminActionBadge";
import AdminJsonViewer from "../AdminJsonViewer";

type Props = {
  logs: {
    id: string;
    action: string;
    ip: string | null;
    metadata: unknown;
    createdAt: Date;

    user: {
      username: string | null;
      email: string | null;
    } | null;
  }[];
};

export default function AdminAuditTable({
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
              Action
            </th>

            <th className="p-4 text-left">
              Utilisateur
            </th>

            <th className="p-4 text-left">
              IP
            </th>

            <th className="p-4 text-left">
              Détails
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
                <AdminActionBadge
                  action={log.action}
                />
              </td>

              <td className="p-4">
                {log.user?.username ??
                  log.user?.email ??
                  "Système"}
              </td>

              <td className="p-4">
                {log.ip ?? "—"}
              </td>

              <td className="p-4">
                <AdminJsonViewer
                  value={log.metadata}
                />
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
                colSpan={5}
                className="
                  p-8
                  text-center
                  text-muted-foreground
                "
              >
                Aucun audit trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}