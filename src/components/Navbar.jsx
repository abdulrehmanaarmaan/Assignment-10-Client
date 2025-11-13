import React, { use, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }

        else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])



    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('Successfully logged out')
            }
            )
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm lg:pr-7 pr-2 md:flex-row flex-col md:gap-0 gap-4 lg:justify-between md:justify-normal">
            <div className="navbar-start md:justify-start justify-center lg:gap-4 gap-4">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow items-center gap-4">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='all-movies'>All Movies</NavLink></li>
                        <li><NavLink to={`/my-collection/${user?.email}`}>My Collection</NavLink></li>
                        <li><NavLink to='add-movie'>Add Movie</NavLink></li>
                        <li><NavLink to='My-WatchList'>My WatchList</NavLink></li>
                    </ul>
                </div>
                <Link to='/' className="font-bold text-xl btn btn-ghost">MovieMaster Pro</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center gap-4">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='all-movies'>All Movies</NavLink></li>
                    <li><NavLink to={`/my-collection/${user?.email}`}>My Collection</NavLink></li>
                    <li><NavLink to='add-movie'>Add Movie</NavLink></li>
                    <li><NavLink to='My-WatchList'>My WatchList</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end space-x-4 md:justify-end justify-center">
                {
                    user ?
                        <div className='flex items-center gap-4'>
                            <div className="dropdown dropdown-end dropdown-hover">
                                <img referrerPolicy='no-referrer' tabIndex={0} role="button" className='rounded-full max-w-10 hover:cursor-pointer' src={user?.photoURL} alt="" />
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-4">
                                    <button onClick={handleLogout} className='btn'>Logout</button>
                                </ul>
                            </div>
                        </div> :
                        <div className='flex items-center gap-4'>
                            <NavLink to='user-login'>Login</NavLink>
                            <NavLink to='user-registration'>Register</NavLink>
                        </div>
                }

                <button onClick={() => setDarkMode(!darkMode)} className='btn' id='theme-toggler'>Change Theme</button>
            </div>
        </div>
    );
};

export default Navbar;