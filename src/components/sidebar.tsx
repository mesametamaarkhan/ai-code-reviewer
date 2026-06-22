"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FolderKanban, ClipboardList, CirclePlus as PlusCircle, Settings, LogOut, Code as Code2, Menu, X } from "lucide-react";
import LogoutButton from "./logout-button";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Reviews", href: "/reviews", icon: ClipboardList },
  { name: "New Review", href: "/reviews/new", icon: PlusCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-[#0d121e]/90 text-slate-300 backdrop-blur-xl lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/[0.06] bg-[#0a0f1a]/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
            <Code2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white">CodeReview AI</h1>
            <p className="text-[11px] text-slate-500">Review Studio</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {link.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] px-4 py-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
