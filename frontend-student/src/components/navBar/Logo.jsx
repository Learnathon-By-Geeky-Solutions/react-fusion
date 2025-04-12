import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Logo({ isScrolled, location }) {
  return (
    <Link to='/' className='flex items-center space-x-2'>
      <div className='w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl font-bold'>
        E
      </div>
      <span
        className={`text-xl font-bold ${isScrolled || location.pathname !== '/' ? 'text-blue-600' : 'text-white'}`}
      >
        EduNexus
      </span>
    </Link>
  );
}

Logo.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};
