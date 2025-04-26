import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-12'>
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
                <a href='/' className='hover:text-white'>
                  Home
                </a>
              </li>
              <li>
                <a href='/about' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:text-white'>
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
            </ul>
          </div>
          <div>
            <h4 className='font-bold mb-4'>Connect</h4>
            <div className='flex space-x-4 justify-center'>
              {/* Facebook */}
              <a
                href='#'
                className='text-xl hover:text-blue-600'
                aria-label='Facebook'
              >
                <svg
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.404.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.098 2.795.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .595 23.405 0 22.675 0z' />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href='#'
                className='text-xl hover:text-blue-500'
                aria-label='LinkedIn'
              >
                <svg
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.77 24h20.46c.978 0 1.77-.775 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9.018h3.56v11.434zM5.34 7.433a2.066 2.066 0 110-4.132 2.066 2.066 0 010 4.132zm15.11 13.019h-3.56v-5.569c0-1.328-.027-3.037-1.85-3.037-1.85 0-2.134 1.445-2.134 2.938v5.668H9.346V9.018h3.417v1.561h.049c.476-.9 1.635-1.85 3.363-1.85 3.594 0 4.256 2.364 4.256 5.438v6.285z' />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href='#'
                className='text-xl hover:text-pink-500'
                aria-label='Instagram'
              >
                <svg
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.849c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.726.129 4.387.369 3.261 1.495 2.135 2.621 1.895 3.96 1.836 5.286.778 6.566.766 6.975.766 12c0 5.025.012 5.434.07 6.714.059 1.326.299 2.665 1.425 3.791 1.126 1.126 2.465 1.366 3.791 1.425 1.28.058 1.689.07 6.714.07s5.434-.012 6.714-.07c1.326-.059 2.665-.299 3.791-1.425 1.126-1.126 1.366-2.465 1.425-3.791.058-1.28.07-1.689.07-6.714s-.012-5.434-.07-6.714c-.059-1.326-.299-2.665-1.425-3.791C20.279.369 18.94.129 17.614.07 16.334.012 15.925 0 12 0zM12 5.838A6.162 6.162 0 005.838 12 6.162 6.162 0 0012 18.162 6.162 6.162 0 0018.162 12 6.162 6.162 0 0012 5.838zm0 10.162A3.999 3.999 0 018 12a3.999 3.999 0 014-4 3.999 3.999 0 014 4 3.999 3.999 0 01-4 4zm6.406-11.845a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z' />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href='#'
                className='text-xl hover:text-black'
                aria-label='GitHub'
              >
                <svg
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.168c-3.338.724-4.033-1.416-4.033-1.416-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.084-.729.084-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
                </svg>
              </a>
            </div>

            <div className='mt-4'>
              <div className='flex mt-2'>
                <input
                  type='email'
                  placeholder='Newsletter'
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
