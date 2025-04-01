import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
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
    loadToken();
  }, []);

  const LoadingSpinner = () => {
    return (
      <div>
        Loading...
        {/* Add a simple spinner here if needed, like a rotating circle */}
        <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  };

  const values = {
    user,
    setUser,
    loadToken,
    storeToken,
    isLoading,
    LoadingSpinner,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default useAuth;
