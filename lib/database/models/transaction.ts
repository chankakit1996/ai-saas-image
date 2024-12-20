// Additional reference between user and image creation
import { Model, Schema, model, models } from 'mongoose'

const TransactionSchema = new Schema<ITransaction>(
  {
    stripeId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
    },
    credits: {
      type: Number,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Transaction: Model<ITransaction> =
  models.Transaction || model<ITransaction>('Transaction', TransactionSchema)

export default Transaction
