"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Login</h1>
            <p className="mt-2 text-slate-400">Sign in to continue reviewing code with AI assistance.</p>
          </div>

          <div className="space-y-4">
            <input
              className="input-field"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-400">
            New here? <a href="/signup" className="text-cyan-300 hover:text-cyan-200">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
