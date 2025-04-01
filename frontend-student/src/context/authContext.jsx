import { createContext, useState, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const LoadingSpinner = () => {
  return (
    <div>
      Loading...
      <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-500 rounded-full"></div>
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    authenticated: false,
    token: null,
  });

  const loadToken = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setUser({
          authenticated: true,
          token: storedToken,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const storeToken = async (token) => {
    localStorage.setItem("token", token);
    setUser({
      authenticated: true,
      token: token,
    });
  };

  const logOutUser = async () => {
    localStorage.removeItem("token");
    setUser({
      authenticated: false,
      token: null,
    });
  };

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

  const values = useMemo(() => ({
    user,
    setUser,
    storeToken,
    isLoading,
    logOutUser,
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
