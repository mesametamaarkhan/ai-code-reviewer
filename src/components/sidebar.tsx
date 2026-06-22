"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "./logout-button";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Reviews",
    href: "/reviews",
  },
  {
    name: "New Review",
    href: "/reviews/new",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0 border-r border-white/10 bg-slate-950/90 px-6 py-8 backdrop-blur-xl">
      <div className="mb-10 rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-5 shadow-xl shadow-slate-950/20">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
          AI Code Reviewer
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Review Studio
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Track projects, inspect reviews, and improve code quality.
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-3xl px-4 py-3 text-sm font-medium transition ${
              pathname === link.href
                ? "bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-500/20"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="mt-10">
        <LogoutButton />
      </div>
    </aside>
  );
}
