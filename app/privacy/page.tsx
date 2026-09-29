import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-4xl px-8 py-12">
            <h1 className="text-4xl font-semibold tracking-tight">
                Politique de confidentialité
            </h1>

            <p className="mt-4 text-muted-foreground">
                Dernière mise à jour : Juin 2026
            </p>

            <div className="mt-10 space-y-10">

                <section>
                <h2 className="text-xl font-semibold">
                    1. Données collectées
                </h2>

                <p className="mt-3">
                    Lors de la création d'un compte,
                    nous pouvons collecter certaines
                    informations telles que votre adresse
                    email, votre pseudonyme et les
                    préférences associées à votre compte.
                </p>
                </section>

                <section>
                <h2 className="text-xl font-semibold">
                    2. Utilisation des données
                </h2>

                <p className="mt-3">
                    Les données collectées sont utilisées
                    exclusivement pour fournir et sécuriser
                    le service, gérer votre compte,
                    personnaliser votre expérience et
                    répondre à vos demandes.
                </p>
                </section>

                <section>
                <h2 className="text-xl font-semibold">
                    3. Sécurité
                </h2>

                <p className="mt-3">
                    Nous mettons en œuvre des mesures
                    techniques et organisationnelles visant
                    à protéger les données personnelles
                    contre tout accès non autorisé,
                    perte ou divulgation.
                </p>
                </section>

                <section>
                <h2 className="text-xl font-semibold">
                    4. Conservation
                </h2>

                <p className="mt-3">
                    Les données sont conservées aussi
                    longtemps que nécessaire pour assurer
                    le fonctionnement du service ou jusqu'à
                    la suppression du compte utilisateur.
                </p>
                </section>

                <section>
                <h2 className="text-xl font-semibold">
                    5. Vos droits
                </h2>

                <p className="mt-3">
                    Vous pouvez demander l'accès,
                    la rectification, l'export ou la
                    suppression de vos données personnelles.
                </p>
                </section>

                <section>
                <h2 className="text-xl font-semibold">
                    6. Contact
                </h2>

                <p className="mt-3">
                    Pour toute question relative à la
                    protection des données, veuillez nous
                    contacter via les moyens de contact
                    indiqués sur le site.
                </p>
                </section>

            </div>

            <div className="mt-12">
                <Link
                href="/settings"
                className="text-primary"
                >
                Retour aux paramètres
                </Link>
            </div>
        </main>
    );
}