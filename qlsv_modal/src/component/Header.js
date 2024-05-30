import React from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Header() {
    return (
        <>
            <div>
                <NavLink to="/" className="btn btn-info mr-3">Student</NavLink>
                <NavLink to="/subject" className="btn btn-info mr-3">Subject</NavLink>
                <NavLink to="/register" className="btn btn-info mr-3">Register</NavLink>

            </div>
            <ToastContainer />

        </>
    );
}
