"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import SettingsCard from "./SettingsCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";
// import Alert from "@/components/ui/Alert";

type Props = {
  theme: string;
  accentColor: string;
};

const themes = [
  {
    value: "light",
    label: "☀️ Clair",
  },
  {
    value: "dark",
    label: "🌙 Sombre",
  },
  {
    value: "system",
    label: "💻 Système",
  },
];

const accents = [
  {
    value: "blue",
    className: "bg-blue-500",
    label: "Bleu",
  },
  {
    value: "indigo",
    className: "bg-indigo-500",
    label: "Indigo",
  },
  {
    value: "purple",
    className: "bg-purple-500",
    label: "Violet",
  },
  {
    value: "green",
    className: "bg-green-500",
    label: "Vert",
  },
  {
    value: "orange",
    className: "bg-orange-500",
    label: "Orange",
  },
  {
    value: "red",
    className: "bg-red-500",
    label: "Rouge",
  },
  {
    value: "pink",
    className: "bg-pink-500",
    label: "Rose",
  },
  {
    value: "slate",
    className: "bg-slate-500",
    label: "Ardoise",
  },
];

export default function AppearanceSettings({
  theme,
  accentColor,
}: Props) {
  const [
    currentTheme,
    setCurrentTheme,
  ] = useState(theme);

  const [
    currentAccent,
    setCurrentAccent,
  ] = useState(accentColor);

  // const [message, setMessage] =
  //   useState("");

  const [loading, setLoading] =
    useState(false);

  const hasChanges =
    currentTheme !== theme ||
    currentAccent !== accentColor;

  const { setTheme } = useTheme();

  async function save() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/settings/appearance",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              theme: currentTheme,
              accentColor:
                currentAccent,
            }),
          }
        );

      if (response.ok) {
        toast.success(
          "Préférences enregistrées."
        );

        // setTimeout(() => {
        //   setMessage("");
        // }, 3000);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-accent",
      currentAccent
    );
  }, [currentAccent]);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme, setTheme]);

  return (
    <SettingsCard
      title="Apparence"
      description="Personnalisez les couleurs et le thème du site."
    >
      <div>        
        {hasChanges && (
          <Badge
            className="mt-3"
          >
            Modifications non enregistrées
          </Badge>
        )}
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-medium">
          Thème
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {themes.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setCurrentTheme(
                  item.value
                )
              }
              className={`
                rounded-xl
                border
                p-4
                text-sm
                transition

                ${
                  currentTheme ===
                  item.value
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }
              `}
            >
              {item.label}

              {currentTheme ===
                item.value &&
                " ✓"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-medium">
          Couleur d'accent : {" "}
          {
            accents.find(
              (a) =>
                a.value ===
                currentAccent
            )?.label
          }
        </h3>

        <div className="flex flex-wrap gap-4">
          {accents.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setCurrentAccent(
                  item.value
                )
              }
              className={`
                relative
                h-10
                w-10
                rounded-full
                ${item.className}
              `}
            >
              {currentAccent ===
                item.value && (
                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    ring-2
                    ring-offset-2
                    ring-black
                    dark:ring-white
                  "
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button
          onClick={save}
          disabled={
            loading || !hasChanges
          }
          className="disabled:cursor-not-allowed"
        >
          {loading
            ? (<div className="flex items-center gap-2">
                  <Loader size="sm" />
                  Enregistrement...
                </div>
              )
            : ("Enregistrer")}
        </Button>

{/*         {message && (
          <Alert type="success">
            {message}
          </Alert>
        )} */}
      </div>
    </SettingsCard>
  );
}