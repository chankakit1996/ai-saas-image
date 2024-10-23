// Additional reference between user and image creation
import { Schema, model } from "mongoose";

export interface ITransaction extends Document {
  createdAt: Date;
  stripeId: string;
  amount: number;
  plan?: string; // optional field
  credits?: number; // optional field
  buyer?: string; // optional field, representing ObjectId as string
}

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
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction = model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
