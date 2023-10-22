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
      className="max-w-md mx-auto"
      position="sticky"
      onMenuOpenChange={setisMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        {user.email && <Avatar src={userData?.avatar_url ?? ""} />}

        <NavbarBrand>
          <NextLink href="/">
            <span className="font-bold">Lyft</span>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="" justify="end">
        {user.email ? (
          <>
            <SignOutButton variant="light" />
            <NextLink href="/workout">
              <Button color="primary">Workout</Button>
            </NextLink>
          </>
        ) : (
          <NextLink href="/signin">
            <Button color="primary">Sign In</Button>
          </NextLink>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
}
