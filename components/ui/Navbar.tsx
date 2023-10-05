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
      <Link href="/">
        <span className="font-bold">Lyft</span>
      </Link>

      <div className="flex">
        {user ? (
          <div className="flex gap-3">
            <span>Hi {user.email}</span>
            <SignOutButton />
          </div>
        ) : (
          <Link href="signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}
