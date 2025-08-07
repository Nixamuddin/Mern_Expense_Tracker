import React from 'react'
import { SiExpensify } from "react-icons/si";
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/login');

    };
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown"> </div>
                    <Link to="/" className="btn btn-ghost text-xl">
                        <SiExpensify size={30} /> EXPENSE TRACKER
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex"> </div>
                <div className="navbar-end"> {
            user ? (
                <>
                    <span className="hidden md:block mr-2"> Welcome, {user.name}! </span>
                    <button onClick={handleLogout} className="btn rounded-xl">
                        LOGOUT <LuLogIn size={25} />
                    </button>
                </>
            ) : (
                <Link to="/login" className="btn rounded-xl">
                    LOGIN <LuLogIn size={25} />
                </Link>
            )
        } </div> </div> </>
    )
}

export default Header
