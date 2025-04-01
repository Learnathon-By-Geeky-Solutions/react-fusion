import useInstructorAuth from "../context/instructorAuthContext";

export default function useInstructorApi() {
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
