import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import SettingsLayout from "@/components/settings/SettingsLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import PasswordCard from "@/components/settings/PasswordCard";
// import SessionsCard from "@/components/settings/SessionsCard";
// import TwoFactorCard from "@/components/settings/TwoFactorCard";
import AccountInfoCard from "@/components/settings/AccountInfoCard";
import DeleteAccountCard from "@/components/settings/DeleteAccountCard";
import PrivacyDataCard from "@/components/settings/PrivacyDataCard";
import ActivityLogCard from "@/components/settings/ActivityLogCard";
import LegalDocumentsCard from "@/components/settings/LegalDocumentsCard";
import CookiePreferencesCard from "@/components/settings/CookiePreferencesCard";
import ThemeSync from "@/components/settings/ThemeSync";
import AccentSync from "@/components/settings/AccentSync";

export default async function SettingsPage() {
  const session =
    await getServerSession(
        authOptions
    );

  if (!session) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
        where: {
        id: session.user.id,
        },
    });

  const auditLogs =
    await prisma.auditLog.findMany({
        where: {
        userId: session.user.id,
        },
        orderBy: {
        createdAt: "desc",
        },
        take: 10,
    });

  return (
    <>
        <ThemeSync
        theme={user?.theme ?? "system"}
        />

        <AccentSync
            accentColor={
            user?.accentColor ?? "blue"
            }
        />
        
        <main className="mx-auto max-w-6xl px-8 py-10">

            <div className="mb-12">
                <h1 className="text-4xl font-semibold tracking-tight">
                Paramètres
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                Gérez votre compte, votre sécurité et vos préférences.
                </p>
            </div>

            <SettingsLayout
                general={
                    <div className="space-y-6">
                        <ProfileSettings
                            email={user?.email ?? ""}
                            username={
                                user?.username ?? null
                            }
                        />
                    </div>
                }
                appearance={
                    <div className="space-y-6">
                        <AppearanceSettings
                            theme={
                                user?.theme ?? "system"
                            }
                            accentColor={
                                user?.accentColor ?? "blue"
                            }
                        />
                    </div>
                }
                security={
                    <div className="space-y-6">
                        <SecuritySettings />
                        <PasswordCard />
                        {/* <SessionsCard />
                        <TwoFactorCard /> */}
                    </div>
                }
                privacy={
                    <div className="space-y-6">
                        <LegalDocumentsCard />
                        <CookiePreferencesCard />
                        <PrivacyDataCard />
                        <ActivityLogCard
                            logs={auditLogs}
                        />
                    </div>
                }
                account={
                    <div className="space-y-6">

                        <AccountInfoCard
                            email={user?.email ?? ""}
                            username={user?.username ?? null}
                            createdAt={
                                user?.createdAt ?? new Date()
                            }
                        />

                        <DeleteAccountCard />

                    </div>
                }
            />
        </main>
    </>
  );
}