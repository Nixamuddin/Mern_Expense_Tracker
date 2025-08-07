import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
const Protected = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    if (user) {
        return children;
    } else {
        Outlet("/login");
    }
}

export default Protected