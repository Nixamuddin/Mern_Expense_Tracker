import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  , (error) => {
    return Promise.reject(error);
  }
)


// Handle api 
export const register = async (data) => {
  try {
    const response = await AxiosInstance.post('/user/create', data);
    return response?.data;
  }

  catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export const logins = async (data) => {
  try {
    const response = await AxiosInstance.post('/user/login', data);
    return response?.data;
  }

  catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// transaction
export const getTransactions = async () => {
  try {
    const response = await AxiosInstance.get('/transaction/get');
    return response?.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export const addTransaction = async (data) => {
  try {
    const response = await AxiosInstance.post('/transaction/create', data);
    return response?.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}

export const deleteTransaction = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/transaction/delete/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

export const updateTransaction = async ({ id, ...data }) => {
  console.log("Updating transaction with ID:", id, "and data:", data);
  try {
    const response = await AxiosInstance.put(`/transaction/update/${id}`, data);
    return response?.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}

export const Calculation = async () => {
  try {
    const response = await AxiosInstance.get('/transaction/cal');
    return response?.data;
  } catch (error) {
    console.error("Error fetching calculation:", error);
    throw error;
  }
}


export const getCategory=async()=>{
  try{
    const response=await AxiosInstance.get("/category/get");
    return response?.data;
  }
  catch(error){
    console.log("error white getting category", error);
  }
}