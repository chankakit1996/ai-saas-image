import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from './ui/breadcrumb'

export default function Header({
  title,
  subTitle,
}: {
  title: string
  subTitle?: string
}) {
  return (
    <header className='flex flex-wrap py-[1rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4 w-full basis-full'>
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
        <div className='flex items-center gap-2 px-4 w-full basis-full'>
          <p className='text-sm text-muted-foreground'>{subTitle}</p>
        </div>
      )}
    </header>
  )
}
