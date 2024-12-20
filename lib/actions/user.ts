'use server'

import { revalidatePath } from 'next/cache'

import User from '../database/models/user'
import { dbConnect } from '../database/mongoose'
import { handleError, objectify } from '../utils'

// Make sure it has an image that create a user
export async function createUser(user: CreateUserParams) {
  try {
    await dbConnect()

    const newUser = await User.create(user)

    return objectify(newUser)
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string | null) {
  try {
    await dbConnect()

    const user = await User.findOne({ clerkId: userId })

    if (!user) throw new Error('User not found')

    return objectify(user)
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await dbConnect()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    })

    if (!updatedUser) throw new Error('User update failed')

    return objectify(updatedUser)
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await dbConnect()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? objectify(deletedUser) : null
  } catch (error) {
    handleError(error)
  }
}

export async function updateCredits(userId: string, creditFee: number) {
  try {
    await dbConnect()

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    )

    if (!updatedUserCredits) throw new Error('User credits update failed')

    return objectify(updatedUserCredits)
  } catch (error) {
    handleError(error)
  }
}
