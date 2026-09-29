import Link from "next/link";

import Button from "@/components/ui/Button";
import AdminSection from "./AdminSection";
import CreateRoleButton from "@/components/admin/roles/CreateRoleButton";

export default function AdminDashboardQuickActions() {
  return (
    <AdminSection title="Actions rapides">
      <div className="flex flex-wrap gap-3">
        <CreateRoleButton />

        <Link href="/admin/users">
          <Button variant="secondary">
            Utilisateurs
          </Button>
        </Link>

        <Link href="/admin/users/deleted">
          <Button variant="secondary">
            Corbeille
          </Button>
        </Link>

        <Link href="/admin/roles">
          <Button variant="secondary">
            Rôles
          </Button>
        </Link>

        <Link href="/admin/audit">
          <Button variant="secondary">
            Audit
          </Button>
        </Link>

        <Link href="/admin/login-history">
          <Button variant="secondary">
            Connexions
          </Button>
        </Link>
      </div>
    </AdminSection>
  );
}