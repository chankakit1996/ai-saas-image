"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {props.children}
      </SidebarMenu>
    </SidebarGroup>
  );
}
