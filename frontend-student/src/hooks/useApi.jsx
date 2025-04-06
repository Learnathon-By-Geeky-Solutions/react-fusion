import useAuth from '../context/authContext';

export default function useApi() {
  const { user } = useAuth();
  const fetchData = async (apiFunction, params) => {
    console.log(apiFunction, params);
    let newParams = {
      data: params,
      user: user
    };
    const result = await apiFunction(newParams);
    return result;
  };

  return { fetchData };
}
