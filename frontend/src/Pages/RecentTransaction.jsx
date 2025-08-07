import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTransactions,deleteTransaction, getCategory,updateTransaction } from '../Services/Api';
const RecentTransaction = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
      const [amount, setAmount] = useState("");
        const [description, setDescription] = useState("");
        const [category, setCategory] = useState("");
        const [type, setType] = useState("expense");
        const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient();
    const { data: recentTransactions, isLoading, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions
    });
    useEffect(() => {
      if(recentTransactions) {
            setAmount(recentTransactions.transection[0].amount || "");
            setDescription(recentTransactions.transection[0].description || "");
            setCategory(recentTransactions.transection?.category?._id || "");
            setType(recentTransactions.transection[0].type || "expense");
        }
    },[recentTransactions])
        const deleteTransactions = useMutation({
        mutationFn: (id) => deleteTransaction(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['transaction']);
        },
        })
      const {data:categoryData, isLoading: categoryLoading, error: categoryError} = useQuery({
            queryKey: ['category'],
            queryFn: getCategory,
      });

    const updateMutation = useMutation({
  mutationFn: updateTransaction,
  onSuccess: () => {
    queryClient.invalidateQueries(['transactions']);
    setShowModal(false);
    setAmount("");
    setDescription("");
    setCategory("");
    setType("expense");
    setSelectedTransaction(null);
  },
});
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTransaction) return;
  updateMutation.mutate({
    id: selectedTransaction,
    amount,
    description,
    category,
    type,
  });
    }
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching transactions</div>;

    const expenseTransaction = recentTransactions?.transection.filter(transaction => transaction.type === 'expense');
    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col'>
                        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
                        <div className="md:col-span-2 bg-white text-black p-6 rounded-lg shadow-md">
                            <ul className="list">
                                <div className="list-header flex justify-between items-center mb-4 text-sm font-semibold text-gray-600 border-b border-black pb-2">
                                    <li>Transaction</li>
                                    <li>Category</li>
                                    <li>Amount</li>
                                    <li className='text-red-500'>Action</li>
                                </div>
                                {recentTransactions?.transection.map((transaction) => (
                                    <>
                                        <li key={transaction._id} className="list-row border-b border-gray-200 py-2 flex justify-between items-center">
                                            <div>
                                                <div className='text-sm font-semibold'>{transaction?.description}</div>
                                                <div className="text-xs uppercase font-semibold opacity-60">{new Date(transaction?.date).toLocaleDateString()}</div>
                                            </div>
                                            <button className="">
                                                {transaction?.category?.name}
                                            </button>
                                            <button className="">
                                                $  {transaction?.amount}
                                            </button>
                                            <div className=''>
                                                <button onClick={() => deleteTransactions.mutate(transaction?._id)} className="flex justify-around items-center text-red-500 hover:text-red-700">
                                                    <IoMdRemoveCircleOutline size={20} />
                                                </button>
                                                <button onClick={() => {
                                                    setSelectedTransaction(transaction._id);
                                                    setAmount(transaction.amount);
                                                    setDescription(transaction.description);
                                                    setCategory(transaction?.category?._id || transaction?.category);
                                                    setType(transaction.type);
                                                    setShowModal(true);
                                                }} className="flex justify-around items-center text-blue-500 hover:text-blue-700">
                                                    <CiEdit size={20} />
                                                </button>
                                            </div>
                                        </li>
                                    </>
                                ))}


                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className="text-xl font-semibold mb-4">Top Expense</h2>
                        <div className="md:col-span-1 bg-white text-black p-6 rounded-lg shadow-md">
                            <ul className="list">

                                {expenseTransaction.map((transaction) => (<>
                                    <li key={transaction._id} className="list-row color">
                                        <div className='text-sm font-semibold'>{transaction?.category?.name}</div>
                                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${transaction.amount}` }}>Amount  $  {transaction.amount}  </div>
                                        </div>
                                    </li>
                                </>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

             {showModal && (
                <div className="absolute inset-0 opacity-100">
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        update  Transaction
                                    </h3>
                                    <button
                                        onClick={() =>{

                           setShowModal(false);
                                   }}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        X
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-4 md:p-5">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Amount 
                                            </label>
                                            <input
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                type="number"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Description
                                            </label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Category
                                            </label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                              
                                                  type="text"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            
                                            >
                                                {categoryData?.category.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                ))}
                                
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Type
                                            </label>
                                            <select
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                
                                            >
                                                <option value="expense">Expense</option>
                                                <option value="income">Income</option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cent dark:focus:ring-blue-800"
                                        >
                                            update Transaction
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RecentTransaction