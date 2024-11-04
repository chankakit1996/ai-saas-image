'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'

export function NavMain({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <SidebarGroup {...props}>
      <SidebarMenu>
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            onClick={() => {
              if (isMobile) toggleSidebar()
            }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
        {props.children}
      </SidebarMenu>
    </SidebarGroup>
  )
}
