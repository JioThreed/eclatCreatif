"use client";

type Tab =
  | "general"
  | "appearance"
  | "security"
  | "privacy"
  | "account";

type Props = {
  activeTab: Tab;
  onChange: (
    tab: Tab
  ) => void;
};

const items = [
  {
    id: "general",
    label: "Général",
  },
  {
    id: "appearance",
    label: "Apparence",
  },
  {
    id: "security",
    label: "Sécurité",
  },
  {
    id: "privacy",
    label: "Confidentialité",
  },
  {
    id: "account",
    label: "Compte",
  },
] as const;

export default function SettingsSidebar({
  activeTab,
  onChange,
}: Props) {
  return (
    <aside className="w-56 shrink-0">
      <div className="sticky top-24">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Paramètres
        </h2>

        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                onChange(item.id)
              }
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    activeTab === item.id
                    ? `bg-card border border-border shadow-sm font-medium`
                    : `text-muted-foreground hover:bg-muted`
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}