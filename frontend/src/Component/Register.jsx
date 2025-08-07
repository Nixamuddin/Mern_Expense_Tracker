import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {register } from '../Services/Api';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    const response = await register({name,email, password });
    
    if (response.success) {
      alert("Registration successful");
      navigate("/login");

    } else {
      alert("Registration failed");
    }
  };
  return (
      <>
           <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100  w-full shrink-0 shadow-2xl">
            <div className="card-body h-auto py-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
              <p className="mb-4">Please enter your credentials to register.</p>
                          <form onSubmit={handleSubmit} className="fieldset space-y-2">
                          <label className="label text-xl">User Name</label>
                          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input w-full" placeholder="User Name" />
                <label className="label text-xl">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input w-full" placeholder="Email" />
                <label className="label text-xl">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input w-full" placeholder="Password" />
                <Link to="/login">Already have an account? Sign In</Link>
                <button className="btn btn-neutral mt-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default Register
