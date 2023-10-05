"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = useSupabase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}
