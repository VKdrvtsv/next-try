"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import * as Toolbar from "@radix-ui/react-toolbar";

export const NavBar = () => {
  return (
    <div className=" max-w-1200 px-6 flex flex-row items-center justify-between py-5 w-full mb-3 ">
      <Link href="/" className="h-10 w-10 mr-6">
        <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
      </Link>

      <div className="flex flex-row font-medium md:gap-x-20 gap-x-5 items-center md:justify-normal justify-center">
        <NavigationMenu.Root>
          <NavigationMenu.List className="flex flex-row font-medium gap-x-10 flex-wrap md:w-full w-60 items-center">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link href="/" className="text-sm font-medium">
                  Components
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="md:w-16">
              <NavigationMenu.Trigger className="flex flex-row gap-2 items-center">
                <p className="text-sm font-medium">Pages</p>
                <Image
                  src="/icons/arrow-down.svg"
                  alt="Logo"
                  width={16}
                  height={16}
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute">
                <Link href="/" className="text-sm">
                  Dropdown
                </Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Link asChild>
              <Link href="/" className="text-sm font-medium">
                Docs
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Toolbar.Root className="flex md:flex-row flex-col gap-2">
          <Toolbar.Button className="px-3.5 font-bold text-sm py-2 rounded-lg border-neutral-200 border">Login</Toolbar.Button>
          <Toolbar.Button className="px-3.5 font-bold text-sm py-2 rounded-lg text-white bg-slate-950">Purchase Now</Toolbar.Button>
        </Toolbar.Root>
      </div>
    </div>
  );
};
