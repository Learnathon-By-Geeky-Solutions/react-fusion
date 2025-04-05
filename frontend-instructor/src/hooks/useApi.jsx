import useInstructorAuth from "@/src/context/authContext";

export default function useApi() {
  const { instructor } = useInstructorAuth();

  const fetchData = async (apiFunction, params) => {
    console.log(apiFunction, params);
    let newParams = {
      data: params,
      instructor: instructor,
    };
    const result = await apiFunction(newParams);
    return result;
  };

  return { fetchData };
}
