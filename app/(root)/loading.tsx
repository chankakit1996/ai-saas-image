import { LoadingSpinner } from '@/components/ui/loading'

export default function Loading() {
  return (
    <div className='w-full h-full relative'>
      <LoadingSpinner className='absolute top-1/2 left-1/2 ' />
    </div>
  )
}
