"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email.");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Get started</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Create Account</h1>
            <p className="mt-2 text-slate-400">Join and start reviewing code with precise AI guidance.</p>
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
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already registered? <a href="/login" className="text-cyan-300 hover:text-cyan-200">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
