import AdminSection from "./AdminSection";

type Props = {
  roles: number;
  sessions: number;
  deletedUsers: number;
  auditLogs: number;
};

export default function AdminDashboardSystem({
  roles,
  sessions,
  deletedUsers,
  auditLogs,
}: Props) {
  return (
    <AdminSection title="État du système">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Rôles
          </p>

          <p className="text-2xl font-semibold">
            {roles}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Sessions actives
          </p>

          <p className="text-2xl font-semibold">
            {sessions}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Comptes supprimés
          </p>

          <p className="text-2xl font-semibold">
            {deletedUsers}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Audit logs
          </p>

          <p className="text-2xl font-semibold">
            {auditLogs}
          </p>
        </div>
      </div>
    </AdminSection>
  );
}