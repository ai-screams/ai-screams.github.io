/** Shared navigation types and helpers */

export interface NavItem {
  label: string;
  path: string;
}

/** Check if a nav path matches the current pathname (exact for "/", prefix for others) */
export function isActivePath(path: string, pathname: string): boolean {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}
