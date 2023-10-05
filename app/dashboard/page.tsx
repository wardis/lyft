import { Database } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: users } = await supabase.from("users").select();

  return (
    <div>
      <div>Dashboard</div>
      {users?.map((user) => (
        <p key={user.id}>{user.full_name}</p>
      ))}
    </div>
  );
}
