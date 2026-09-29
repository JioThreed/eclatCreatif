export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-4xl font-bold">
        Bienvenue sur {process.env.NEXT_PUBLIC_APP_NAME ?? "Mon Site"}
      </h1>

      <p className="mt-4">
        {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
      </p>
    </main>
  );
}