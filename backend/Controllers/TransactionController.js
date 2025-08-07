import mongoose from "mongoose";
import Transaction from "../Model/Transaction.js";
const validateType = ["income", "expense"];
export const transaction = {
    getAll: async (req, res) => {
        try {
            const { type, search, category, sort = "desc" } = req.query;
            const userId = req.userId;
            const query = { userId }
            if (type) { query.type = type }
            if (category) { query.category = category }
            if (search) { query.description = { $regex: search, $options: "i" } }
            const orders = query.sort === 'asc' ? 1 : -1;
            const transection = await Transaction.find(query).sort({ date: orders }).populate("category", "name");
            const total = await Transaction.countDocuments(query)

            res.status(200).send({ success: true, message: "All Transection", total, transection })
        }
        catch (error) {
            console.log("Internal server error ", error);
            res.status(500).send({ success: false, message: "Internal server error", error })
        }
    },
    create: async (req, res) => {
        try {
            const { amount, description, category, type } = req.body;
            const userId = req.userId;
            if (!validateType.includes(type)) {
                return res.status(401).send({ success: false, message: "Invalid Type, the Type must be Income and Expense " })
            }
            const newTransection = await Transaction.create({ amount, userId, description, category, type });
            res.status(200).send({ success: true, message: "Transaction created ", newTransection })
        }
        catch (error) {
            console.log("Internal server error ", error);
            res.status(500).send({ success: false, message: "Internal server error", error })
        }
    },
    updates: async (req, res) => {
        try {
            const { id } = req.params;
             console.log("Transaction ID to delete:", id);
            const userId = req.userId;
            const transaction = await Transaction.findById(id);
            if (!transaction) {
                return res.status(400).send({ success: false, message: "No Transaction found" })
            }
            if (transaction.userId.toString() === userId.toString()) {
                const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).send({ success: true, message: "Successfully Updated", updated })
            }
            else {
                return res.status(401).send({ success: false, message: "You are not allowed to update" })
            }
            res.status(200).send({ success: true, message: "All Transection", transection })
        }
        catch (error) {
            console.log("Internal server error ", error);
            res.status(500).send({ success: false, message: "Internal server error", error })
        }
    },
    deletes: async (req, res) => {
        try {
            const { id } = req.params;
           
            const userId = req.userId;
            const transaction = await Transaction.findById(id);
            if (transaction.userId.toString() === userId.toString()) {
                await Transaction.findByIdAndDelete(id);
            }
            else {
                return res.status(401).send({ success: false, message: "You are not allowed to delete " })
            }
            res.status(200).send({ success: true, message: "Successfully deleted" })
        }
        catch (error) {
            console.log("Internal server error ", error);
            res.status(500).send({ success: false, message: "Internal server error", error })
        }
    },

    IncomeAndExpense: async (req, res) => {
        try {
            const calculation = await Transaction.aggregate([
                { $group: { _id: "$type", tolatAmount: { $sum: "$amount" }, } },
                { $project: { _id: 1, tolatAmount: 1 } }
            ])
            const totalexpense = await Transaction.aggregate([
                { $match: { userId:new mongoose.Types.ObjectId(req.userId) } },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails",
                    }
                },
                { $unwind: "$categoryDetails" },

                { $group: { _id: "$category", categoryName: { $first: "$categoryDetails.name" }, type: { $first: "$type" }, total: { $sum: "$amount" }, count: { $sum: 1 } } },
                { $project: { _id: 0, type: 1, total: 1, count: 1, category: "$_id", categoryName: 1 } }

            ])
            const income = calculation.find((i) => i._id === "income")?.tolatAmount;
            const expense = calculation.find((i) => i._id === "expense")?.tolatAmount;
            let balance = income - expense;
            res.status(200).send({
                success: true, message: "Total Income and Total Expense", data: {
                    income,
                    expense,
                    balance,
                    totalexpense
                }
            })
        }

        catch (error) {
            console.log("error in Income and expense controller  ", error);
            res.status(500).send({ success: false, message: "Internal server error ", error })
        }
    }
}