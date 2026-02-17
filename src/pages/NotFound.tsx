import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6">
      <h1 className="text-8xl font-bold tracking-tight text-white/20">404</h1>
      <p className="mt-4 text-lg text-white/60">Page not found.</p>
      <Link
        className="mt-8 rounded-full bg-white/10 px-6 py-2 text-sm transition-colors hover:bg-white/20"
        to="/"
      >
        Go home
      </Link>
    </section>
  );
}
