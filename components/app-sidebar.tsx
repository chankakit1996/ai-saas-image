import * as React from "react";
import {
  Settings2,
  House,
  Image,
  Sparkles,
  LucideImageOff,
  Camera,
  User as UserIcon,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: House,
    },
    {
      title: "Image Restore",
      url: "#",
      icon: Image,
    },
    {
      title: "Generative Fill",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Object Remove",
      url: "#",
      icon: LucideImageOff,
    },
    {
      title: "Object Recolor",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Background Remove",
      url: "#",
      icon: Camera,
    },
  ],
  navSecondary: [
    {
      title: "Profile",
      url: "#",
      icon: UserIcon,
    },
    {
      title: "Buy Credits",
      url: "#",
      icon: BriefcaseBusiness,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="sidebar-logo bg-logoSVG2 bg-no-repeat bg-contain"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SignedIn>
          <NavMain items={data.navMain} />
          <NavMain items={data.navSecondary} className="mt-auto">
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      avatarBox: "w-[1rem] h-[1rem] order-1",
                      userButtonOuterIdentifier: "p-0 order-2",
                      userButtonTrigger: "focus:shadow-none",
                    },
                  }}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </NavMain>
        </SignedIn>
        <SignedOut>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SignInButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SignedOut>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
