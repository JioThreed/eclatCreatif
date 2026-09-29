import AdminSection from "@/components/admin/dashboard/AdminSection";

type Props = {
  lockedUsers: number;
  suspendedUsers: number;
  deletedUsers: number;
};

export default function MonitoringSecurityCard({
  lockedUsers,
  suspendedUsers,
  deletedUsers,
}: Props) {
  return (
    <AdminSection title="Sécurité">
      <div className="space-y-4">

        <Row
          label="Comptes verrouillés"
          value={lockedUsers}
        />

        <Row
          label="Comptes suspendus"
          value={suspendedUsers}
        />

        <Row
          label="Suppressions programmées"
          value={deletedUsers}
        />

      </div>
    </AdminSection>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}