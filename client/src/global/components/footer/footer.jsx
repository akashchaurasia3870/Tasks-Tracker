
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-12 text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0 flex flex-col items-center justify-center">
                    <span>Task Tracker</span>
                    <span>Copyright ©2024 All rights reserved </span>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                    <Link to="/" className="mr-4 hover:text-gray-300">Home</Link>
                    <Link to="/about" className="mr-4 hover:text-gray-300">About</Link>
                    <Link to="/services" className="mr-4 hover:text-gray-300">Services</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
