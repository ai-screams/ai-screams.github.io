import { Link, useLocation } from "react-router";
import { useScheme } from "../../contexts/SchemeContext";
import { type ColorScheme, schemeConfig } from "../../styles/tokens";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Travel", path: "/travel" },
  { label: "Colors", path: "/colors" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { scheme, setScheme } = useScheme();

  return (
    <header className="glass fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]"
          to="/"
        >
          AI Scream
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-1">
            {navItems.map(({ label, path }) => {
              const isActive =
                path === "/" ? pathname === "/" : pathname.startsWith(path);

              return (
                <li key={path}>
                  <Link
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--interactive-active)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            aria-label="Color scheme"
            className="flex items-center gap-1.5"
            role="radiogroup"
          >
            {(Object.keys(schemeConfig) as ColorScheme[]).map((s) => (
              <button
                aria-checked={scheme === s}
                aria-label={schemeConfig[s].label}
                className={`size-3 rounded-full transition-all ${
                  scheme === s
                    ? "scale-125 ring-2 ring-white/20"
                    : "opacity-40 hover:opacity-70"
                }`}
                key={s}
                onClick={() => setScheme(s)}
                role="radio"
                style={{ backgroundColor: schemeConfig[s].preview }}
                type="button"
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
