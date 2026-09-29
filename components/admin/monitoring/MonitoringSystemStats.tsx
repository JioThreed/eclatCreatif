import AdminSection from "@/components/admin/dashboard/AdminSection";

type Props = {
  sessions: number;
  deletedUsers: number;
};

export default function MonitoringSystemStats({
  sessions,
  deletedUsers,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AdminSection title="Sessions actives">
        <p className="text-4xl font-bold">
          {sessions}
        </p>
      </AdminSection>

      <AdminSection title="Comptes supprimés">
        <p className="text-4xl font-bold">
          {deletedUsers}
        </p>
      </AdminSection>
    </div>
  );
}