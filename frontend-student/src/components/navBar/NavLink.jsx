import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function NavLink({ to, label, isMobile, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    const mobileStyle = `w-full px-4 py-3 text-left rounded-lg transition ${
      isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'
    }`;

    return (
      <Link to={to} className={mobileStyle} onClick={onClick}>
        {label}
      </Link>
    );
  }

  const isHomeNotScrolled = location.pathname === '/' && !isScrolled;

  let style;
  if (isActive) {
    if (isHomeNotScrolled) {
      style =
        'relative text-white font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white';
    } else {
      style =
        'relative text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600';
    }
  } else if (!isActive && isHomeNotScrolled) {
    style = 'text-white hover:text-blue-100 transition';
  } else {
    style = 'text-gray-700 hover:text-blue-600 transition';
  }

  return (
    <Link to={to} className={style} onClick={onClick}>
      {label}
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func
};
