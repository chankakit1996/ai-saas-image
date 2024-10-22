"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AuthLayour({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
