import { createContext, useState, useContext, useEffect } from "react";

const InstructorAuthContext = createContext();

const useAuth = () => {
  return useContext(InstructorAuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [instructor, setInstructor] = useState({
    authenticated: false,
    token: null,
  });

  const loadToken = async () => {
    try {
      const storedToken = localStorage.getItem("instructor_token");
      if (storedToken) {
        setInstructor({
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
    localStorage.setItem("instructor_token", token);
    setInstructor({
      authenticated: true,
      token: token,
    });
  };

  const logOutInstructor = async () => {
    localStorage.removeItem("instructor_token");
    setInstructor({
      authenticated: false,
      token: null,
    });
  };

  useEffect(() => {
    loadToken();
  }, []);

  // ✅ Tailwind-based Loading Spinner
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  };

  const values = {
    instructor,
    setInstructor,
    loadToken,
    storeToken,
    isLoading,
    LoadingSpinner,
    logOutInstructor,
  };

  return (
    <InstructorAuthContext.Provider value={values}>
      {isLoading ? <LoadingSpinner /> : children}
    </InstructorAuthContext.Provider>
  );
};

export default useAuth;
