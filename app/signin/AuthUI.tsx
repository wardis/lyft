"use client";

import React from "react";
import { useSupabase } from "../supabase-provider";
import { Auth } from "@supabase/auth-ui-react";
import { getURL } from "@/utils/helpers";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthUI() {
  const supabase = useSupabase();
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#07e",
                brandAccent: "#08f",
              },
            },
          },
        }}
      />
    </div>
  );
}
