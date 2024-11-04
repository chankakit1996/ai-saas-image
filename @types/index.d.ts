/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any */
declare global {
  import { type Mongoose } from 'mongoose'
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  } // This must be a `var` and not a `let / const`

  declare interface IUser {
    clerkId: string
    email: string
    username: string
    photo: string
    firstName: string
    lastName: string
    planId: number
    creditBalance: number
    _id: string
  }

  declare interface ITransaction {
    createdAt: Date
    stripeId: string
    amount: number
    plan?: string // optional field
    credits?: number // optional field
    buyer?: string // optional field, representing ObjectId as string
    _id: string
  }

  declare interface IImage {
    title: string
    transformationType: string
    publicId: string
    secureURL: string
    width: number
    height: number
    config: object
    transformationUrl: string
    aspectRatio: string
    color: string
    prompt: string
    author: IAuthor
    _id: string
  }

  declare interface IAuthor {
    _id: string
    firstName: string
    lastName: string
    clerkId: string
  }

  declare type CreateUserParams = {
    clerkId: string
    email: string
    username: string
    firstName: string
    lastName: string
    photo: string
  }

  declare type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }

  // ====== IMAGE PARAMS
  declare type AddImageParams = {
    image: {
      title: string
      publicId: string
      transformationType: string
      width: number
      height: number
      config: any
      secureURL: string
      transformationURL: string
      aspectRatio: string | undefined
      prompt: string | undefined
      color: string | undefined
    }
    userId: string
    path: string
  }

  declare type UpdateImageParams = {
    image: {
      _id: string
      title: string
      publicId: string
      transformationType: string
      width: number
      height: number
      config: any
      secureURL: string
      transformationURL: string
      aspectRatio: string | undefined
      prompt: string | undefined
      color: string | undefined
    }
    userId: string
    path: string
  }

  declare type Transformations = {
    restore?: boolean
    fillBackground?: boolean
    remove?: {
      prompt: string
      removeShadow?: boolean
      multiple?: boolean
    }
    recolor?: {
      prompt?: string
      to: string
      multiple?: boolean
    }
    removeBackground?: boolean
  }

  // ====== TRANSACTION PARAMS
  declare type CheckoutTransactionParams = {
    plan: string
    credits: number
    amount: number
    buyerId: string
  }

  declare type CreateTransactionParams = {
    stripeId: string
    amount: number
    credits: number
    plan: string
    buyerId: string
    createdAt: Date
  }

  declare type TransformationTypeKey =
    | 'restore'
    | 'fill'
    | 'remove'
    | 'recolor'
    | 'removeBackground'

  // ====== URL QUERY PARAMS
  declare type FormUrlQueryParams = {
    searchParams: string
    key: string
    value: string | number | null
  }

  declare type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }

  declare type RemoveUrlQueryParams = {
    searchParams: string
    keysToRemove: string[]
  }

  declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey }
    searchParams: { [key: string]: string | string[] | undefined }
  }

  declare type TransformationFormProps = {
    action: 'Add' | 'Update'
    userId: string
    type: TransformationTypeKey
    creditBalance: number
    data?: {
      title: string
      aspectRatio: string
      color: string
      prompt: string
      image: {
        publicId?: sting
        transformationType?: sting
        width?: number
        height?: number
        config?: sting
        secureURL?: sting
        transformationURL?: sting
      }
    }
    config?: Transformations | null
  }

  declare type TransformedImageProps = {
    image: any
    type: string
    title: string
    transformationConfig: Transformations | null
    isTransforming: boolean
    hasDownload?: boolean
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export {}
