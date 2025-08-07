import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    date: { type: Date, default: Date.now },
  description: { type: String, required: true },
},{timestamps: true});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
