import { redirect } from 'next/navigation'

import { Collection } from '@/components/collection'
import Header from '@/components/header'
import { getUserImages } from '@/lib/actions/image'
import { getUserById } from '@/lib/actions/user'
import { auth } from '@clerk/nextjs/server'
import { Coins, Image as LucideImage } from 'lucide-react'

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)
  if (!user) redirect('/sign-in')
  const images = await getUserImages({ page, userId: user._id })

  return (
    <div className='px-4'>
      <Header title='Profile' />

      <section className='profile'>
        <div className='profile-balance'>
          <p className='p-14-medium md:p-16-medium'>CREDITS AVAILABLE</p>
          <div className='mt-4 flex items-center gap-4'>
            <Coins width={50} height={50} className='size-9 md:size-12' />
            <h2 className='h2-bold text-dark-600'>{user.creditBalance} </h2>
          </div>
        </div>

        <div className='profile-image-manipulation'>
          <p className='p-14-medium md:p-16-medium'>IMAGE MANIPULATION DONE</p>
          <div className='mt-4 flex items-center gap-4'>
            <LucideImage width={50} height={50} className='size-9 md:size-12' />
            <h2 className='h2-bold text-dark-600'>{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className='mt-8 md:mt-14'>
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </div>
  )
}

export default Profile
