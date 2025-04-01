import { createContext, useState, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@/components/ui/spinner";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const LoadingSpinner = () => {
  return (
    <div>
      loading
      <Spinner show={true} />
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    authenticated: false,
    token: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setUser({ authenticated: true, token: storedToken });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const storeToken = (token) => {
    localStorage.setItem("token", token);
    setUser({ authenticated: true, token });
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    setUser({ authenticated: false, token: null });
  };

  const values = useMemo(() => ({
    user,
    setUser,
    storeToken,
    logOutUser,
    isLoading,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={values}>
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default useAuth;