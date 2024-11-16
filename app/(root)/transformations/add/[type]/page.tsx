import Header from '@/components/header'
import InsufficientCreditsModal from '@/components/insufficient-credits-modal'
import TransformationsForm from '@/components/transformations-form'
import { creditFee, transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth()
  const transformation = transformationTypes[type]

  const user = await getUserById(userId)
  if (!user) {
    redirect('/')
  }
  return (
    <div className='px-4'>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <div className='flex flex-1 flex-col gap-4 py-4'>
        {user.creditBalance < Math.abs(creditFee) ? (
          <InsufficientCreditsModal />
        ) : (
          <TransformationsForm
            action='Add'
            userId={user._id}
            type={transformation.type}
            creditBalance={user.creditBalance}
          />
        )}
      </div>
    </div>
  )
}
