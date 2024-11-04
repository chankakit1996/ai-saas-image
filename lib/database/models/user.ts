import { Schema, model, models, Model } from 'mongoose'

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
})

const User: Model<IUser> = models.User ?? model<IUser>('User', UserSchema)

export default User
