import { createServerSupabaseClient } from "@/app/supabase-server";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="m-8 flex justify-between">
      <span className="font-bold">Lyft</span>

      <div className="flex">
        {user ? <SignOutButton /> : <Link href="signin">Sign In</Link>}
      </div>
    </div>
  );
}
