const { createContext, useState } = require("react");

const authContext = createContext();

const useAuth = ({ children }) => {
  const [user, setUser] = useState(null);

  const values = { user, setUser };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default useAuth;
