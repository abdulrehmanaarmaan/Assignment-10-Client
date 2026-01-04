import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>

            <main className='py-12 min-h-screen bg-gray-50 main text-black'>
                <Outlet></Outlet>
            </main>

            <footer>
                <Footer></Footer>
            </footer>

            <Toaster />
        </div>
    );
};

export default RootLayout;