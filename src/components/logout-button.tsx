"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <button
      onClick={logout}
      className="btn-secondary w-full justify-center bg-rose-500 text-white hover:bg-rose-400"
    >
      Logout
    </button>
  );
}
