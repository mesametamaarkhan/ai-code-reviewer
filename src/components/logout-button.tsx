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
      className="rounded bg-red-500 text-white px-4 py-2"
    >
      Logout
    </button>
  );
}