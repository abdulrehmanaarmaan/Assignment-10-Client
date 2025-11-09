import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const handleLogout = () => {
        logout()
            .then(
                toast.success('Successfully logged out')
            )
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Home</a></li>
                        <li><a>All Movies</a></li>
                        <li><a>My Collection</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">MovieMaster Pro</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='all-movies'>All Movies</NavLink></li>
                    <li><NavLink to='my-collection'>My Collection</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end gap-4">
                {
                    user ? <button onClick={handleLogout} className="btn">Logout</button> :
                        <>
                            <NavLink to='user-login' className="btn">Login</NavLink>
                            <NavLink to='user-registration' className="btn">Register</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;