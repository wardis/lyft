import { createServerSupabaseClient } from "@/app/supabase-server";

import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userData, error } = await supabase
    .from("users")
    .select("full_name, avatar_url")
    .eq("id", user?.id ?? "")
    .single();

  return <NavbarClient user={user} userData={userData} />;
}
