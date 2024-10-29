'use server'

import Header from '@/components/header'
import TransformationsForm from '@/components/transformations-form'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth()
  const transformation = transformationTypes[type]

  if (!userId) {
    redirect('/')
  }

  const user = await getUserById(userId)
  return (
    <>
      <Header {...transformationTypes[type]}></Header>
      <div className='flex flex-1 flex-col gap-4 p-4'>
        <TransformationsForm
          action='Add'
          userId={user._id}
          type={transformation.type}
          creditBalance={user.creditBalance}
        />
      </div>
    </>
  )
}
