type mongoose = Awaited<typeof import('mongoose')>
type Document = mongoose.Document

declare interface IUser extends Document {
  clerkId: string
  email: string
  username: string
  photo: string
  firstName: string
  lastName: string
  planId: number
  creditBalance: number
}

declare interface ITransaction extends Document {
  createdAt: Date
  stripeId: string
  amount: number
  plan?: string // optional field
  credits?: number // optional field
  buyer?: string // optional field, representing ObjectId as string
}

declare interface IImage extends Document {
  title: string
  transformationType: string
  publicId: string
  secureURL: URL
  width?: number
  height?: number
  config?: object
  transformationUrl?: string
  aspectRatio?: string
  color?: string
  prompt?: string
  author: {
    _id: string
    firstName: string
    lastName: string
  }
}
