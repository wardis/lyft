import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { createServerSupabaseClient } from "@/app/supabase-server";
import { siteConfig } from "@/config/site";

import SignOutButton from "./SignOutButton";

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

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/">
            <span className="font-bold">Lyft</span>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="" justify="end">
        {user ? (
          <Avatar isBordered color="primary" src={userData?.avatar_url ?? ""} />
        ) : (
          <NextLink href="/signin">
            <Button color="primary">Sign In</Button>
          </NextLink>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2 items-end">
          {user && (
            <p className="self-start">
              Hi {userData?.full_name ?? user.email}!
            </p>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {user && (
            <NavbarMenuItem>
              <SignOutButton variant="light" color="primary" />
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
