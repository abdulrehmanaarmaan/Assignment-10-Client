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

                <div className='flex items-center justify-center'>
                    <NavLink className='link link-hover mr-8' to='/'>Home</NavLink>
                    <NavLink className='link link-hover' to='all-movies'>All Movies</NavLink>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title mb-3">Social Media Icons</h6>

                <div className='flex gap-8 justify-center items-center'>
                    <a className='link'><FaFacebookF /></a>
                    <a className='link'><GrInstagram /></a>
                    <a className='link'><FaXTwitter /></a>
                    <a className='link'><TfiLinkedin /></a>
                </div>
            </nav>

            <nav className='mx-auto'>
                <h6 className="footer-title">Copyright</h6>
                <a className='link link-hover'>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</a>
            </nav>
        </div>
    );
};

export default Footer;