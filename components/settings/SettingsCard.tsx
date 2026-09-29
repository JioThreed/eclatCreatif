import Card from "@/components/ui/Card";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <Card className="p-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </Card>
  );
}