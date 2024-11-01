import * as React from 'react'
import Link from 'next/link'
import { navLinks } from '@/constants'

import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link
                href='/'
                className='sidebar-logo bg-logoSVG2 bg-no-repeat bg-contain'
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SignedIn>
          <NavMain items={navLinks.navMain} />
          <NavMain items={navLinks.navSecondary} className='mt-auto'>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      avatarBox: 'w-[1rem] h-[1rem] order-1',
                      userButtonOuterIdentifier: 'p-0 order-2',
                      userButtonTrigger:
                        'focus:shadow-none w-full justify-start',
                      rootBox: 'w-full basis-full',
                    },
                  }}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </NavMain>
        </SignedIn>
        <SignedOut>
          <SidebarGroup>
            <SidebarMenu>
              <SignInButton />
            </SidebarMenu>
          </SidebarGroup>
        </SignedOut>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
