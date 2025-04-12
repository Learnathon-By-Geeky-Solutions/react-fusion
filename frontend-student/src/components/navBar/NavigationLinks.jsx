import PropTypes from 'prop-types';
import NavLink from './NavLink';
import useAuth from '@/src/context/authContext';

export default function NavigationLinks({
  isMobile = false,
  closeMobileMenu,
  isScrolled
}) {
  const { user } = useAuth();
  const isAuthenticated = user.authenticated;

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <NavLink
            to='/dashboard'
            label='Dashboard'
            isMobile={isMobile}
            onClick={closeMobileMenu}
            isScrolled={isScrolled}
          />
          <NavLink
            to='/my-courses'
            label='My Courses'
            isMobile={isMobile}
            onClick={closeMobileMenu}
            isScrolled={isScrolled}
          />
          <NavLink
            to='/courses'
            label='Browse Courses'
            isMobile={isMobile}
            onClick={closeMobileMenu}
            isScrolled={isScrolled}
          />
          {isMobile && (
            <>
              <NavLink
                to='/profile'
                label='Profile'
                isMobile={isMobile}
                onClick={closeMobileMenu}
                isScrolled={isScrolled}
              />
              <NavLink
                to='/settings'
                label='Settings'
                isMobile={isMobile}
                onClick={closeMobileMenu}
                isScrolled={isScrolled}
              />
            </>
          )}
        </>
      );
    }

    return (
      <>
        <NavLink
          to='/'
          label='Home'
          isMobile={isMobile}
          onClick={closeMobileMenu}
          isScrolled={isScrolled}
        />
        <NavLink
          to='/courses'
          label='Courses'
          isMobile={isMobile}
          onClick={closeMobileMenu}
          isScrolled={isScrolled}
        />
        <NavLink
          to='/about'
          label='About'
          isMobile={isMobile}
          onClick={closeMobileMenu}
          isScrolled={isScrolled}
        />
        <NavLink
          to='/contact'
          label='Contact Us'
          isMobile={isMobile}
          onClick={closeMobileMenu}
          isScrolled={isScrolled}
        />
      </>
    );
  };

  return isMobile ? (
    <nav className='flex flex-col space-y-1'>{renderLinks()}</nav>
  ) : (
    <nav className='hidden md:flex items-center space-x-8'>{renderLinks()}</nav>
  );
}

NavigationLinks.propTypes = {
  isMobile: PropTypes.bool,
  closeMobileMenu: PropTypes.func,
  isScrolled: PropTypes.bool
};
