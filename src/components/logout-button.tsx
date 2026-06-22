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
      className="btn-secondary w-full justify-center bg-red-600/95 text-white hover:bg-red-500"
    >
      Logout
    </button>
  );
}
