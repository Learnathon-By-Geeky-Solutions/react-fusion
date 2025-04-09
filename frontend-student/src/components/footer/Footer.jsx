import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-6 px-4'>
      <div className='mx-auto max-w-[1280px] flex flex-row justify-between items-center'>
        <div className='text-xl font-bold text-amber-100 uppercase tracking-wide'>
          EduNexus
        </div>

        <div className='flex flex-wrap gap-4 text-sm'>
          <Link to='/about' className='hover:underline'>
            About
          </Link>
          <Link to='/contact' className='hover:underline'>
            Contact
          </Link>
          <Link to='/privacy-policy' className='hover:underline'>
            Privacy Policy
          </Link>
          <Link to='/terms' className='hover:underline'>
            Terms
          </Link>
        </div>

        <div className='flex gap-4 mt-4 md:mt-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='40'
            height='40'
            viewBox='0 0 48 48'
          >
            <path
              fill='#039be5'
              d='M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z'
            ></path>
            <path
              fill='#fff'
              d='M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='40'
            height='40'
            viewBox='0 0 48 48'
          >
            <path
              fill='#0288D1'
              d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'
            ></path>
            <path
              fill='#FFF'
              d='M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z'
            ></path>
          </svg>
        </div>
      </div>

      <div className='text-center text-xs mt-4'>
        © {new Date().getFullYear()} EduNexus. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
