import Header from '@/components/header'
import { transformationTypes } from '@/constants'

export default function Home() {
  const type = 'remove'
  return (
    <>
      <Header {...transformationTypes[type]}></Header>
      <div className='flex flex-1 flex-col gap-4 p-4'>
        {/* <TransformationsForm /> */}
      </div>
    </>
  )
}
