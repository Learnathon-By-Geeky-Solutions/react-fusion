import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/src/context/authContext';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.authenticated) {
      navigate('/login', { replace: true }); 
    }
  }, [user, navigate]);

  if (!user.authenticated) {
    return null;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
