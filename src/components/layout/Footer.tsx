export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} AI Screams. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
