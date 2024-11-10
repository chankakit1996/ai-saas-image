'use server'

import { revalidatePath } from 'next/cache'
import { dbConnect } from '../database/mongoose'
import { handleError, objectify } from '../utils'
import User from '../database/models/user'
import Image from '../database/models/image'
import { redirect } from 'next/navigation'

import { v2 as cloudinary } from 'cloudinary'
import { Query } from 'mongoose'

const populateUser = <T>(query: T): T => {
  if (query instanceof Query) {
    return query.populate({
      path: 'author',
      model: User,
      select: '_id firstName lastName clerkId',
    })
  }

  throw new Error('parameter must be an instance of Query')
}

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await dbConnect()

    const author = await User.findById(userId)

    if (!author) {
      throw new Error('User not found')
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path)

    return objectify(newImage)
  } catch (error) {
    handleError(error)
  }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await dbConnect()

    const imageToUpdate = await Image.findById(image._id)

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error('Unauthorized or image not found')
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path)

    return objectify(updatedImage)
  } catch (error) {
    handleError(error)
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await dbConnect()

    await Image.findByIdAndDelete(imageId)
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await dbConnect()

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error('Image not found')

    return objectify(image)
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES
export async function getAllImages({
  limit = 9,
  page = 1,
  searchQuery = '',
}: {
  limit?: number
  page: number
  searchQuery?: string
}) {
  try {
    await dbConnect()

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    let expression = 'folder=pickure'

    if (searchQuery) {
      expression += ` AND ${searchQuery}`
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute()

    const resourceIds = resources.map((resource: any) => resource.public_id) // eslint-disable-line @typescript-eslint/no-explicit-any

    let query = {}

    if (searchQuery) {
      query = {
        $or: [
          {
            publicId: {
              $in: resourceIds,
            },
          },
          {
            title: { $regex: searchQuery, $options: 'i' },
          },
        ],
      }
    }

    const skipAmount = (Number(page) - 1) * limit

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)

    const totalImages = await Image.find(query).countDocuments()
    const savedImages = await Image.find().countDocuments()

    return {
      data: objectify(images),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    }
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number
  page: number
  userId: string
}) {
  try {
    await dbConnect()

    const skipAmount = (Number(page) - 1) * limit

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)

    const totalImages = await Image.find({ author: userId }).countDocuments()

    return {
      data: objectify(images),
      totalPages: Math.ceil(totalImages / limit),
    }
  } catch (error) {
    handleError(error)
  }
}
