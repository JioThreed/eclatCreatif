import AdminSection from "@/components/admin/dashboard/AdminSection";

type Props = {
  events: {
    id: string;
    level: string;
    source: string;
    message: string;
    createdAt: Date;
  }[];
};

export default function MonitoringEventsTable({
  events,
}: Props) {
  return (
    <AdminSection title="Événements">
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id}>
            <p>{event.message}</p>

            <p className="text-sm text-muted-foreground">
              {event.source}
            </p>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}