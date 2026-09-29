import AdminSection from "./AdminSection";

type Props = {
  logins: {
    id: string;
    ip: string | null;
    createdAt: Date;

    user: {
      username: string | null;
      email: string | null;
    };
  }[];
};

export default function AdminDashboardLatestLogins({
  logins,
}: Props) {
  return (
    <AdminSection title="Dernières connexions">
      <div className="space-y-4">
        {logins.map((login) => (
          <div
            key={login.id}
            className="
              flex
              justify-between
              border-b
              border-border
              pb-4
            "
          >
            <div>
              <p>
                {login.user.username ??
                  login.user.email}
              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {login.ip ??
                  "IP inconnue"}
              </p>
            </div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {login.createdAt.toLocaleString(
                "fr-FR"
              )}
            </p>
          </div>
        ))}
      </div>
    </AdminSection>
  );
}