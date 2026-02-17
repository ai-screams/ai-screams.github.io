import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Travel", path: "/travel" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          className="text-lg font-semibold tracking-tight text-white"
          to="/"
        >
          AI Screams
        </Link>

        <ul className="flex items-center gap-1">
          {navItems.map(({ label, path }) => {
            const isActive =
              path === "/" ? pathname === "/" : pathname.startsWith(path);

            return (
              <li key={path}>
                <Link
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  to={path}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
