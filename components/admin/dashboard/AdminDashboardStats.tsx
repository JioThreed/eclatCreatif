import AdminStatCard from "./AdminStatCard";

type Props = {
  users: number;
  activeUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  suspendedUsers: number;
  deletedUsers: number;
  sessions: number;
  audits: number;
};

export default function AdminDashboardStats({
  users,
  activeUsers,
  verifiedUsers,
  unverifiedUsers,
  suspendedUsers,
  deletedUsers,
  sessions,
  audits,
}: Props) {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <AdminStatCard
        title="Utilisateurs"
        value={users}
      />

      <AdminStatCard
        title="Actifs"
        value={activeUsers}
      />

      <AdminStatCard
        title="Vérifiés"
        value={verifiedUsers}
      />

      <AdminStatCard
        title="Non vérifiés"
        value={unverifiedUsers}
      />

      <AdminStatCard
        title="Suspendus"
        value={suspendedUsers}
      />

      <AdminStatCard
        title="Corbeille"
        value={deletedUsers}
      />

      <AdminStatCard
        title="Sessions"
        value={sessions}
      />

      <AdminStatCard
        title="Audit Logs"
        value={audits}
      />
    </div>
  );
}