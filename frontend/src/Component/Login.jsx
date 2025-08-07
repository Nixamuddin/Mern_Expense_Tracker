import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logins } from '../Services/Api';
import { useDispatch } from 'react-redux'
import { login } from '../Redux/UserSlice'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const response = await logins({ email, password });

    if (response) {
      localStorage.setItem('user', JSON.stringify(response?.user));
      dispatch(login(response?.user));
      navigate('/transaction');
    }
  };
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100  w-full shrink-0 shadow-2xl">
            <div className="card-body h-auto py-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
              <p className="mb-4">Please enter your credentials to login.</p>
              <form onSubmit={handleSubmit} className="fieldset space-y-2">
                <label className="label text-xl">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input w-full" placeholder="Email" />
                <label className="label text-xl">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input w-full" placeholder="Password" />
                <Link to="/register">Do not have an account? Sign up</Link>
                <button className="btn btn-neutral mt-4">Login</button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
