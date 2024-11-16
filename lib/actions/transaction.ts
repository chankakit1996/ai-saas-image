'use server'

import { redirect } from 'next/navigation'
import { handleError, objectify } from '@/lib/utils'
import Transaction from '@/lib/database/models/transaction'
import { updateCredits } from './user'
import { dbConnect } from '@/lib/database/mongoose'
import { stripe } from '@/lib/utils/stripe'

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const amount = Number(transaction.amount) * 100

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  })

  redirect(session.url!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await dbConnect()

    // Create a new transaction with a buyerId
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    })

    await updateCredits(transaction.buyerId, transaction.credits)

    return objectify(newTransaction)
  } catch (error) {
    handleError(error)
  }
}
