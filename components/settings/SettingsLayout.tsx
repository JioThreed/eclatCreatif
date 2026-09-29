"use client";

import { useState } from "react";

import SettingsSidebar from "./SettingsSidebar";

type Props = {
  general: React.ReactNode;
  appearance: React.ReactNode;
  security: React.ReactNode;
  privacy: React.ReactNode;
  account: React.ReactNode;
};

export default function SettingsLayout({
  general,
  appearance,
  security,
  privacy,
  account,
}: Props) {
  const [activeTab, setActiveTab] =
    useState("general");

  return (
    <div className="flex gap-12">
      <SettingsSidebar
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="min-w-0 flex-1">
        {activeTab === "general" &&
          general}

        {activeTab ===
          "appearance" &&
          appearance}

        {activeTab ===
          "security" &&
          security}

        {activeTab ===
          "privacy" &&
          privacy}

        {activeTab ===
          "account" &&
          account}
      </div>
    </div>
  );
}