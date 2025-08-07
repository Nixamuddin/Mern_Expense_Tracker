import React, { useState } from 'react';
import RecentTransaction from './RecentTransaction';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Calculation } from '../Services/Api';
import Charts from '../Component/Charts';
import { addTransaction, getCategory } from '../Services/Api';

const TransactionPage = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("expense");
    const [showModal, setShowModal] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['transaction'],
        queryFn: Calculation,
    });

    const {data:categoryData, isLoading: categoryLoading, error: categoryError} = useQuery({
        queryKey: ['category'],
        queryFn: getCategory,
    });
    const mutation = useMutation({
        mutationFn: addTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries(['transaction']);
            setShowModal(false);
            setAmount("");
            setDescription("");
            setCategory("");
            setType("expense");
        },
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const handleOpen = () => {
        setShowModal(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            amount,
            description,
            category,
            type,
        }); 
    };
    return (
        <>
            <div className={`container relative space-y-3 py-8 mx-auto rounded-xl bg-gray-500 m-4 ${showModal ? "opacity-50" : "opacity-100"}`}>
                <div className="grid ps-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div className="card bg-neutral text-neutral-content w-96">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Wallet Balance ${data?.data?.income}</h2>
                            <button
                                onClick={handleOpen}
                                className="py-2 px-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600" >
                                Add Income +
                            </button>
                        </div>
                    </div>

                    <div className="card bg-neutral text-neutral-content w-96">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Expense ${data?.data.expense}</h2>
                            <button
                                onClick={handleOpen}
                                className="py-2 px-8 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                            >
                                Add Expense -
                            </button>
                        </div>
                    </div>

                    <div className="card bg-neutral text-neutral-content w-96">
                        <div className="card-body items-center text-center">
                            <Charts />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container space-y-3 py-8 mx-auto rounded-xl m-4">
                <RecentTransaction />
            </div>

            {showModal && (
                <div className="absolute inset-0 opacity-100">
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add Transaction
                                    </h3>
                                    <button
                                        onClick={() => setShowModal(false)}
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
                                            className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Add Transaction
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionPage;
