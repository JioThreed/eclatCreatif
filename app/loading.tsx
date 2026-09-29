import Loader from "@/components/ui/Loader";

export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <Loader size="lg" />
    </main>
  );
}