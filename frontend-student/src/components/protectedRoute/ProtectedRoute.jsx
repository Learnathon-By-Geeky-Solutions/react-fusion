import useAuth from '@/src/context/authContext';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return <>NO USER</>;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
