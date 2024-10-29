export default function MainContent({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className='flex-1'>{children}</main>
}
