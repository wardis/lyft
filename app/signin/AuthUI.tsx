"use client";

import React from "react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { getURL } from "@/utils/helpers";

import { useSupabase } from "../supabase-provider";

export default function AuthUI() {
  const supabase = useSupabase();
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        providers={["facebook"]}
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
