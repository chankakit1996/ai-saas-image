import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Header from '@/components/header'
import TransformationForm from '@/components/transformations-form'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user'
import { getImageById } from '@/lib/actions/image'

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth()

  const user = await getUserById(userId)
  if (!userId || !user) redirect('/sign-in')
  const image: IImage | undefined = await getImageById(id)
  if (userId === image?.author.clerkId || !image) redirect('/')

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey]

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />

      <section className='mt-10'>
        <TransformationForm
          action='Update'
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  )
}

export default Page
