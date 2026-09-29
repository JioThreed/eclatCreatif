import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">
            Conditions d'utilisation
        </h1>

        <p className="mt-4 text-muted-foreground">
            Dernière mise à jour : Juin 2026
        </p>

        <div className="mt-10 space-y-10">

            <section>
            <h2 className="text-xl font-semibold">
                1. Acceptation
            </h2>

            <p className="mt-3">
                En utilisant ce service,
                vous acceptez les présentes
                conditions d'utilisation.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">
                2. Compte utilisateur
            </h2>

            <p className="mt-3">
                Vous êtes responsable de la
                confidentialité de vos identifiants
                et des activités réalisées depuis
                votre compte.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">
                3. Utilisation du service
            </h2>

            <p className="mt-3">
                Vous vous engagez à utiliser le
                service conformément aux lois
                applicables et à ne pas perturber
                son fonctionnement.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">
                4. Propriété intellectuelle
            </h2>

            <p className="mt-3">
                Les contenus, marques et éléments
                visuels du service demeurent la
                propriété de leurs détenteurs
                respectifs.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">
                5. Résiliation
            </h2>

            <p className="mt-3">
                Nous nous réservons le droit de
                suspendre ou supprimer un compte
                en cas de non-respect des présentes
                conditions.
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