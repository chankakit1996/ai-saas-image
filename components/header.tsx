import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from './ui/breadcrumb'
import * as React from 'react'
import { cn } from '@/lib/utils'

export default function Header({
  title,
  subTitle,
  className,
  ..._props
}: {
  title: string
  subTitle?: string
} & React.ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        className,
        'flex flex-wrap py-[1rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'
      )}
    >
      <div className='flex items-center gap-2 w-full basis-full'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {subTitle && (
        <div className='flex items-center gap-2 w-full basis-full'>
          <p className='text-sm text-muted-foreground'>{subTitle}</p>
        </div>
      )}
    </header>
  )
}
