import AdminSection from "@/components/admin/dashboard/AdminSection";

export default function MonitoringServiceCard() {
  return (
    <AdminSection title="Services externes">
      <div className="space-y-4">
        <Service
          label="Sentry"
          enabled={
            !!process.env.SENTRY_DSN
          }
        />

        <Service
          label="Resend"
          enabled={
            !!process.env.RESEND_API_KEY
          }
        />

        <Service
          label="Redis"
          enabled={
            !!process.env.UPSTASH_REDIS_REST_URL
          }
        />
      </div>
    </AdminSection>
  );
}

function Service({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>

      <span
        className={
          enabled
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {enabled
          ? "Configuré"
          : "Non configuré"}
      </span>
    </div>
  );
}