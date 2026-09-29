import AdminSection from "@/components/admin/dashboard/AdminSection";

type Props = {
  jobs: {
    id: string;
    job: string;
    status: string;
    durationMs: number | null;
    createdAt: Date;
  }[];
};

export default function MonitoringCronTable({
  jobs,
}: Props) {
  return (
    <AdminSection title="Cron">
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id}>
            <p>{job.job}</p>

            <p className="text-sm text-muted-foreground">
              {job.status}
            </p>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}