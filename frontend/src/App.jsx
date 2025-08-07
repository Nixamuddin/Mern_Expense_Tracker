import { useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import Header from './Component/Header'
import { Routes, Route } from 'react-router-dom'
import Login from './Component/Login'
import Register from './Component/Register'
import TransactionPage from './Pages/TransactionPage'
import Protected from './Component/Protected'
function App() {
  return (
    <>
      <div className='max-w-screen h-auto'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/transaction' element={<Protected><TransactionPage /></Protected>} />
          <Route path='*' element={<h1 className='text-3xl text-center mt-10'>Page Not Found</h1>} />
        </Routes>
      </div>

    </>
  )
}

export default App
