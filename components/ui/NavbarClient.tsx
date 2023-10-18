"use client";

import React, { useState } from "react";

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

import { siteConfig } from "@/config/site";

import SignOutButton from "./SignOutButton";

type Props = {
  user: { email?: string };
  userData: { full_name?: string | null; avatar_url?: string | null };
};

export default function NavbarClient({ user, userData }: Props) {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setisMenuOpen}
      isMenuOpen={isMenuOpen}
    >
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
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
