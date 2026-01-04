import React from 'react';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { GrFacebookOption, GrInstagram, GrLinkedinOption } from 'react-icons/gr';
import { TfiLinkedin } from 'react-icons/tfi';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className="sm:footer-horizontal bg-neutral text-neutral-content p-10 text-center space-y-10">
            <nav>
                <h6 className="footer-title">Quick Links</h6>


                <div className='flex items-center justify-center text-sm gap-8'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/help-support'>Help/Support</NavLink>
                    <NavLink to='/all-movies'>All Movies</NavLink>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title mb-3">Social Media Icons</h6>

                <div className='flex gap-8 justify-center items-center text-sm'>
                    <a className='link' href='https://www.facebook.com/'><FaFacebookF /></a>
                    <a className='link' href='https://www.instagram.com/'><GrInstagram /></a>
                    <a className='link' href='https://www.linkedin.com/feed/'><TfiLinkedin /></a>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title">Contact</h6>

                <div className="space-y-2 text-sm">
                    <p>Email: <a href="mailto:support@moviemasterpro.com">support@moviemasterpro.com</a></p>
                    <p>Phone: <a href="tel:+8801337910777">+880 1337 910777</a></p>
                    <p>Location: Chittagong, Bangladesh</p>
                </div>
            </nav>


            <nav className='mx-auto'>
                <h6 className="footer-title">Copyright</h6>
                <p className="text-sm">Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </nav>
        </div>
    );
};

export default Footer;