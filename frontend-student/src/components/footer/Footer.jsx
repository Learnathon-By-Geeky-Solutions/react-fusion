import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>EduNexus</h3>
            <p className='text-gray-300'>
              Connecting Minds, Empowering Futures.
            </p>
          </div>
          <div>
            <h4 className='font-bold mb-4'>Links</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='hover:text-white'>
                  Home
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Features
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-bold mb-4'>Resources</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a href='#' className='hover:text-white'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Tutorials
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-bold mb-4'>Connect</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-xl hover:text-blue-400'>
                📱
              </a>
              <a href='#' className='text-xl hover:text-blue-400'>
                💻
              </a>
              <a href='#' className='text-xl hover:text-blue-400'>
                📧
              </a>
              <a href='#' className='text-xl hover:text-blue-400'>
                📘
              </a>
            </div>
            <div className='mt-4'>
              <p className='text-gray-300'>Subscribe to our newsletter</p>
              <div className='flex mt-2'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='px-4 py-2 rounded-l-lg text-gray-400 w-full border-2 border-gray-600'
                />
                <button className='bg-blue-600 px-4 rounded-r-lg hover:bg-blue-700 transition'>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
          <p>© {new Date().getFullYear()} EduNexus. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
