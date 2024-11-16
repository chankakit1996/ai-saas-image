import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Header from '@/components/header'
import TransformationForm from '@/components/transformations-form'
import { creditFee, transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user'
import { getImageById } from '@/lib/actions/image'
import InsufficientCreditsModal from '@/components/insufficient-credits-modal'

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth()

  const user = await getUserById(userId)
  if (!userId || !user) redirect('/sign-in')
  const image: IImage | undefined = await getImageById(id)
  if (!(userId === image?.author.clerkId) || !image) redirect('/')
  const { _id, creditBalance } = user
  const { config, title, aspectRatio, prompt, color, transformationUrl } = image

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey]

  return (
    <div className='px-4'>
      <Header title={transformation.title} subTitle={transformation.subTitle} />

      <section className='mt-10'>
        {creditBalance < Math.abs(creditFee) ? (
          <InsufficientCreditsModal />
        ) : (
          <TransformationForm
            action='Update'
            userId={_id}
            type={image.transformationType as TransformationTypeKey}
            creditBalance={creditBalance}
            config={config}
            data={{
              title,
              aspectRatio,
              color,
              prompt,
              image: {
                ...image,
                transformationURL: transformationUrl,
              },
            }}
          />
        )}
      </section>
    </div>
  )
}

export default Page
