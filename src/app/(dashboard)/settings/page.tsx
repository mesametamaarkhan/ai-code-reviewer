import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Settings, Mail, Shield, KeyRound } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
          Preferences
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Shield className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">Account</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-white">{user.email}</p>
                </div>
              </div>
              <span className="badge-emerald text-[11px]">Verified</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <KeyRound className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">User ID</p>
                  <p className="text-sm font-mono text-slate-400">{user.id.slice(0, 12)}...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="surface">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Settings className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">Preferences</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-sm text-white">AI Model</p>
                <p className="text-xs text-slate-500">Qwen2.5-Coder-7B-Instruct</p>
              </div>
              <span className="badge-emerald text-[11px]">Active</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-sm text-white">Theme</p>
                <p className="text-xs text-slate-500">Dark mode</p>
              </div>
              <span className="badge-pill">Default</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
