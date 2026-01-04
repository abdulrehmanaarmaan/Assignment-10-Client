import { Bookmark, CircleUserRound, Film, Heart, HelpCircle, House, Info, PanelLeftClose, PanelLeftOpen, PieChart, PlusCircle } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const DashboardLayout = () => {

    const [sidebar, openSidebar] = useState(false);

    useEffect(() => {
        const checkbox = document.getElementById('my-drawer-4');
        if (!checkbox) return;
        const handleChange = () => openSidebar(checkbox.checked);
        checkbox.addEventListener('change', handleChange);
        return () => checkbox.removeEventListener('change', handleChange);
    }, []);

    const { user, logout } = use(AuthContext);

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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 gap-3 shadow-sm border border-gray-300 flex justify-between pr-5">
                    <div className='flex items-center'>
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-gray-300 border-0 mr-2" onClick={() => openSidebar(!sidebar)}>
                            {/* Sidebar toggle icon */}
                            {!sidebar ? <PanelLeftOpen></PanelLeftOpen> : <PanelLeftClose></PanelLeftClose>}
                        </label>
                        <NavLink to='/' className="font-extrabold bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent tracking-tight logo-text">
                            MovieMaster Pro
                        </NavLink>
                    </div>

                    <div className="dropdown dropdown-bottom dropdown-end ml-auto">
                        <img referrerPolicy='no-referrer' tabIndex={0} className='rounded-full max-w-10 max-h-10 hover:cursor-pointer' src={user?.photoURL} alt="" />
                        <div tabIndex="-1" className="dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-3 menu gap-1 text-center">
                            <NavLink to='/dashboard/analytics'>Analytics</NavLink>
                            <NavLink to={`/dashboard/my-collection/${user?.email}`}>My Collection</NavLink>
                            <NavLink to='/dashboard/add-movie'>Add Movie</NavLink>
                            <NavLink to='/dashboard/My-WatchList'>My WatchList</NavLink>
                            <NavLink to='/dashboard/profile'>Profile</NavLink>
                            <div className='border my-1 md:my-0'></div>
                            <button onClick={handleLogout} className='btn w-full'>Logout</button>
                        </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className='py-12 bg-gray-50 min-h-screen main'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 sidebar">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow gap-3.5">
                        {/* List item */}
                        <li>
                            <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="Home">
                                {/* Home icon */}
                                <House className='max-w-4'></House>
                                <span className="is-drawer-close:hidden">Home</span>
                            </NavLink>
                        </li>
                        {/* List item */}
                        <li>
                            <NavLink to='/about' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent"
                                data-tip="About">
                                {/* Settings icon */}
                                <Info className='max-w-4'></Info>
                                <span className="is-drawer-close:hidden">About</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/help-support' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent"
                                data-tip="Help/Support">
                                {/* Settings icon */}
                                <HelpCircle className='max-w-4'></HelpCircle>
                                <span className="is-drawer-close:hidden">Help/Support</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/all-movies' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="All Movies">
                                {/* Settings icon */}
                                <Film className='max-w-4'></Film>
                                <span className="is-drawer-close:hidden">All Movies</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/analytics'
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent"
                                data-tip="Analytics">
                                {/* Settings icon */}
                                <PieChart className='max-w-4'></PieChart>
                                <span className="is-drawer-close:hidden">Analytics</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/dashboard/my-collection/${user?.email}`} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="My Collection">
                                {/* Settings icon */}
                                <Heart className='max-w-4'></Heart>
                                <span className="is-drawer-close:hidden">My Collection</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/add-movie' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="Add a Movie">
                                {/* Settings icon */}
                                <PlusCircle className='max-w-4'></PlusCircle>
                                <span className="is-drawer-close:hidden">Add a Movie</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/My-WatchList' className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="My WatchList">
                                {/* Settings icon */}
                                <Bookmark className='max-w-4'></Bookmark>
                                <span className="is-drawer-close:hidden">My WatchList</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/profile'
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center bg-transparent" data-tip="Profile">
                                {/* Settings icon */}
                                <CircleUserRound className='max-w-4'></CircleUserRound>
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default DashboardLayout;