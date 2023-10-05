import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

import { createServerSupabaseClient } from "@/app/supabase-server";
import SignOutButton from "./SignOutButton";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          <Avatar isBordered color="primary" />
        ) : (
          <NextLink href="/signin">
            <Button color="primary">Sign In</Button>
          </NextLink>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2 items-end">
          {user && <p className="self-start">Hi {user.email}</p>}
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
