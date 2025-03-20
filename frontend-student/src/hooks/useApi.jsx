import useAuth from "../context/authContext";
import { BACKEND } from "../constants";

export default function useApi() {
  const { user, storeToken } = useAuth();
  const fetchData = async (apiFunction, params) => {
    console.log(apiFunction, params);
    let newParams = {
      data: params,
      user: user,
    };
    const result = await apiFunction(newParams);
    return result;
  };

  return { fetchData };
}
