"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/app/supabase-provider";

export default function SignOutButton(props: any) {
  const router = useRouter();
  const supabase = useSupabase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button onClick={handleSignOut} {...props}>
      Sign out
    </Button>
  );
}
