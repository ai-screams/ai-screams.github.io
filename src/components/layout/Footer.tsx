export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] py-8">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-sm text-[var(--text-tertiary)]">
          &copy; {new Date().getFullYear()} AI Scream. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
