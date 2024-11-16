import { SignedIn } from '@clerk/nextjs'
// import Image from 'next/image'
import { redirect } from 'next/navigation'

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { plans } from '@/constants'
import { getUserById } from '@/lib/actions/user'
import Checkout from '@/components/checkout'
import { auth } from '@clerk/nextjs/server'
import { Check, Cross } from 'lucide-react'

const Credits = async () => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')
  const user = await getUserById(userId)
  if (!user) redirect('/sign-in')

  return (
    <div className='px-4'>
      <Header
        title='Buy Credits'
        subTitle='Choose a credit package that suits your needs!'
      />

      <section>
        <ul className='credits-list'>
          {plans.map((plan) => (
            <li key={plan.name} className='credits-item'>
              <div className='flex-center flex-col gap-3'>
                <plan.icon width={50} height={50} />
                <p className='p-20-semibold mt-2 text-purple-500'>
                  {plan.name}
                </p>
                <p className='h1-semibold text-dark-600'>${plan.price}</p>
                <p className='p-16-regular'>{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className='flex flex-col gap-5 py-9'>
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className='flex items-center gap-4'
                  >
                    {inclusion.isIncluded ? (
                      <Check width={24} height={24} />
                    ) : (
                      <Cross width={24} height={24} />
                    )}
                    <p className='p-16-regular'>{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === 'Free' ? (
                <Button variant='outline' className='credits-btn'>
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Credits
