import NavItems from './NavItems';
import { Link } from 'react-router-dom';

export default function DesktopNav() {
  return (
    <div className='w-full bg-gray-700 m-0 py-4'>
      <div className='max-w-[1280px] mx-auto flex justify-between flex-row content-center items-center'>
        <Link
          to='/'
          className='text-3xl font-bold text-amber-100 uppercase tracking-wide hover:text-amber-200 transition'
        >
          EduNexus
        </Link>
        <div>
          <NavItems />
        </div>
      </div>
    </div>
  );
}
